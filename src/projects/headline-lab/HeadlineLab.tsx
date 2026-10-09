import { FormEvent, useEffect, useId, useMemo, useRef, useState } from 'react'
import './headline-lab.css'

type HeadlineStyle =
  | 'newspaper'
  | 'breaking'
  | 'short'
  | 'seo'
  | 'social'
  | 'dramatic'
  | 'neutral'

interface HeadlineResult {
  id: HeadlineStyle
  label: string
  note: string
  value: string
}

const styleMeta: ReadonlyArray<Pick<HeadlineResult, 'id' | 'label' | 'note'>> = [
  { id: 'newspaper', label: 'NEWSPAPER', note: 'Clear, informative' },
  { id: 'breaking', label: 'BREAKING NEWS', note: 'Immediate, urgent' },
  { id: 'short', label: 'SHORT', note: 'Fast, compact' },
  { id: 'seo', label: 'SEO', note: 'Search-friendly' },
  { id: 'social', label: 'SOCIAL MEDIA', note: 'Conversational, shareable' },
  { id: 'dramatic', label: 'DRAMATIC', note: 'High-impact, cinematic' },
  { id: 'neutral', label: 'NEUTRAL', note: 'Straightforward, balanced' },
]

const stopWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'in', 'into',
  'is', 'it', 'its', 'of', 'on', 'or', 'that', 'the', 'their', 'this', 'to',
  'was', 'were', 'will', 'with', 'after', 'before', 'over', 'under', 'about',
  'has', 'have', 'had', 'new', 'today', 'says', 'said', 'announced',
])

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function wordCount(value: string) {
  const trimmed = normalizeText(value)
  return trimmed ? trimmed.split(' ').length : 0
}

function clipWords(value: string, limit: number) {
  const words = normalizeText(value).split(' ').filter(Boolean)
  if (words.length <= limit) return words.join(' ')
  return `${words.slice(0, limit).join(' ')}…`
}

function sentenceCase(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}`
}

function cleanStoryLead(story: string) {
  const firstSentence = normalizeText(story)
    .split(/(?<=[.!?])\s+/)[0]
    .replace(/[.!?]+$/, '')
    .replace(/^['“”‘’\s]+|['“”‘’\s]+$/g, '')

  return sentenceCase(clipWords(firstSentence || story, 17))
}

function compactLead(story: string, fallback: string) {
  const meaningfulWords = normalizeText(story)
    .replace(/[^\p{L}\p{N}\s'-]/gu, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !stopWords.has(word.toLowerCase()))

  return sentenceCase(meaningfulWords.slice(0, 7).join(' ') || clipWords(fallback, 7))
}

/** A tiny stable hash makes regenerate variants repeatable for a given story. */
function hashText(value: string) {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0
  }
  return Math.abs(hash)
}

function pickVariant(templates: readonly string[], story: string, revision: number) {
  return templates[(hashText(story) + revision) % templates.length]
}

function shortenHeadline(value: string, limit = 9) {
  const hasPrefix = /^(BREAKING|JUST IN|DEVELOPING)(?:\s*[-:—])?/i.test(value)
  const prefix = hasPrefix ? value.match(/^(BREAKING|JUST IN|DEVELOPING)(?:\s*[-:—])?\s*/i)?.[0] ?? '' : ''
  const body = hasPrefix ? value.slice(prefix.length) : value
  const shortened = clipWords(body.replace(/[.!?]+$/, ''), limit)
  return `${prefix}${shortened}`.trim()
}

function generateHeadlines(story: string, revision: number, shortened: boolean): HeadlineResult[] {
  const lead = cleanStoryLead(story)
  const compact = compactLead(story, lead)
  const template = (templates: readonly string[]) => pickVariant(templates, story, revision)
  const interpolate = (value: string) => value
    .split('{lead}').join(lead)
    .split('{compact}').join(compact)

  const rawResults: Record<HeadlineStyle, string> = {
    newspaper: interpolate(template([
      '{lead}: What happened and why it matters',
      'Inside {lead}',
      '{lead} signals a new chapter',
    ])),
    breaking: interpolate(template([
      'BREAKING: {lead}',
      'JUST IN: {lead}',
      'DEVELOPING — {lead}',
    ])),
    short: interpolate(template([
      '{compact}',
      '{compact} now',
      '{compact}: the essential update',
    ])),
    seo: interpolate(template([
      '{lead}: key facts, context and what comes next',
      '{lead} explained: what you need to know',
      '{lead}: latest updates and essential context',
    ])),
    social: interpolate(template([
      '{lead} — here is the story in a minute.',
      'The quick take: {lead}.',
      '{lead}. Here is what to know.',
    ])),
    dramatic: interpolate(template([
      'A turning point: {lead}',
      'The moment everything shifted: {lead}',
      'A new chapter begins: {lead}',
    ])),
    neutral: interpolate(template([
      lead,
      `{lead}: an update`,
      `${lead} — latest developments`,
    ])),
  }

  return styleMeta.map((style) => ({
    ...style,
    value: shortened && style.id !== 'short' ? shortenHeadline(rawResults[style.id]) : rawResults[style.id],
  }))
}

async function copyText(value: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch {
    // The legacy fallback below keeps copying available in restricted contexts.
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    textarea.style.pointerEvents = 'none'
    document.body.appendChild(textarea)
    textarea.select()
    const didCopy = document.execCommand('copy')
    document.body.removeChild(textarea)
    return didCopy
  } catch {
    return false
  }
}

export function HeadlineLab() {
  const [story, setStory] = useState('')
  const [revision, setRevision] = useState(0)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [isShortened, setIsShortened] = useState(false)
  const [notice, setNotice] = useState('Ready for a story.')
  const [copiedId, setCopiedId] = useState<HeadlineStyle | 'all' | null>(null)
  const storyId = useId()
  const countId = useId()
  const resetCopyTimer = useRef<number | undefined>(undefined)

  const words = wordCount(story)
  const characters = story.length
  const results = useMemo(
    () => generateHeadlines(story, revision, isShortened),
    [story, revision, isShortened],
  )

  useEffect(() => () => {
    if (resetCopyTimer.current) window.clearTimeout(resetCopyTimer.current)
  }, [])

  const generate = () => {
    if (!normalizeText(story)) {
      setNotice('Add a story before generating headlines.')
      return
    }
    setHasGenerated(true)
    setIsShortened(false)
    setNotice('Seven local headline angles are ready.')
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    generate()
  }

  const regenerate = () => {
    if (!hasGenerated) return
    setRevision((current) => current + 1)
    setNotice('A new deterministic set of angles is ready.')
  }

  const toggleShorten = () => {
    if (!hasGenerated) return
    setIsShortened((current) => !current)
    setNotice(isShortened ? 'Full-length headlines restored.' : 'Headlines shortened for quicker scanning.')
  }

  const handleStoryChange = (value: string) => {
    setStory(value)
    setRevision(0)
    setIsShortened(false)
    if (hasGenerated) setNotice('Story updated. Generate a fresh set when you are ready.')
    setHasGenerated(false)
    setCopiedId(null)
  }

  const handleCopy = async (id: HeadlineStyle | 'all', value: string) => {
    const didCopy = await copyText(value)
    if (didCopy) {
      setCopiedId(id)
      setNotice(id === 'all' ? 'All seven headlines copied to the clipboard.' : 'Headline copied to the clipboard.')
      if (resetCopyTimer.current) window.clearTimeout(resetCopyTimer.current)
      resetCopyTimer.current = window.setTimeout(() => setCopiedId(null), 1800)
    } else {
      setNotice('Copy is unavailable here. Select the headline and copy it manually.')
    }
  }

  return (
    <div className="headline-lab page-enter">
      <section className="hll-hero" aria-labelledby="headline-lab-heading">
        <div className="hll-shell">
          <div className="hll-hero-copy">
            <p className="hll-eyebrow"><span aria-hidden="true" />EXPERIMENT 06 / TOOL</p>
            <h1 id="headline-lab-heading" tabIndex={-1}>HEADLINE<br /><em>LAB.</em></h1>
            <p>One story. Seven sharper angles. Generate useful headline directions without leaving the lab.</p>
          </div>
          <aside className="hll-engine-card" aria-label="Headline Lab engine status">
            <div className="hll-engine-top"><span>ENGINE</span><b><i aria-hidden="true" />LOCAL</b></div>
            <strong>07</strong>
            <p>headline formats<br />ready to calibrate</p>
            <span className="hll-engine-foot">NO EXTERNAL API</span>
          </aside>
        </div>
      </section>

      <section className="hll-workspace hll-shell" aria-labelledby="workspace-heading">
        <header className="hll-workspace-heading">
          <div>
            <p className="hll-eyebrow"><span aria-hidden="true" />WORKSPACE / 01</p>
            <h2 id="workspace-heading">CALIBRATE<br /><em>THE STORY.</em></h2>
          </div>
          <p>The engine uses only the text you enter. It creates a dependable starting point, then lets you choose the angle that earns the click.</p>
        </header>

        <div className="hll-workbench">
          <form className="hll-panel hll-source-panel" onSubmit={onSubmit}>
            <div className="hll-panel-topline">
              <div>
                <span className="hll-panel-index">01</span>
                <h3>SOURCE STORY</h3>
              </div>
              <span className="hll-panel-status">INPUT</span>
            </div>

            <label className="hll-label" htmlFor={storyId}>Paste your story</label>
            <textarea
              id={storyId}
              value={story}
              onChange={(event) => handleStoryChange(event.target.value)}
              placeholder="Paste a story, announcement, or update here…"
              aria-describedby={countId}
              spellCheck="true"
            />

            <div id={countId} className="hll-story-meta" aria-live="polite">
              <span>{words} {words === 1 ? 'WORD' : 'WORDS'}</span>
              <span>{characters} {characters === 1 ? 'CHARACTER' : 'CHARACTERS'}</span>
            </div>

            <button className="hll-action hll-action-primary" type="submit" disabled={!normalizeText(story)}>
              GENERATE HEADLINES <span aria-hidden="true">→</span>
            </button>
          </form>

          <section className="hll-panel hll-results-panel" aria-labelledby="result-heading">
            <div className="hll-panel-topline hll-results-topline">
              <div>
                <span className="hll-panel-index">02</span>
                <h3 id="result-heading">GENERATED HEADLINES</h3>
              </div>
              <span className={hasGenerated ? 'hll-panel-status is-ready' : 'hll-panel-status'}>{hasGenerated ? 'READY' : 'WAITING'}</span>
            </div>

            <div className="hll-result-controls" aria-label="Headline controls">
              <button className="hll-control" type="button" onClick={regenerate} disabled={!hasGenerated}>
                REGENERATE <span aria-hidden="true">↻</span>
              </button>
              <button className="hll-control" type="button" onClick={toggleShorten} disabled={!hasGenerated}>
                {isShortened ? 'EXPAND HEADLINES' : 'SHORTEN HEADLINES'} <span aria-hidden="true">↙</span>
              </button>
              <button
                className="hll-control hll-copy-all"
                type="button"
                onClick={() => handleCopy('all', results.map((result) => `${result.label}: ${result.value}`).join('\n'))}
                disabled={!hasGenerated}
              >
                {copiedId === 'all' ? 'COPIED ALL' : 'COPY ALL'} <span aria-hidden="true">□</span>
              </button>
            </div>

            {hasGenerated ? (
              <div className="hll-results-grid" aria-live="polite" aria-busy="false">
                {results.map((result) => (
                  <article className="hll-result" key={result.id}>
                    <div className="hll-result-meta">
                      <span>{result.label}</span>
                      <small>{result.note}</small>
                    </div>
                    <p>{result.value}</p>
                    <footer>
                      <span>{wordCount(result.value)} WORDS / {result.value.length} CHARS</span>
                      <button
                        className="hll-copy"
                        type="button"
                        onClick={() => handleCopy(result.id, result.value)}
                        aria-label={`Copy ${result.label.toLowerCase()} headline`}
                      >
                        {copiedId === result.id ? 'COPIED' : 'COPY'} <span aria-hidden="true">□</span>
                      </button>
                    </footer>
                  </article>
                ))}
              </div>
            ) : (
              <div className="hll-empty-state">
                <span aria-hidden="true">✦</span>
                <p>Your seven headline directions will appear here.</p>
                <small>Enter a story, then generate the first set.</small>
              </div>
            )}
          </section>
        </div>

        <p className="hll-live-note" role="status" aria-live="polite" aria-atomic="true">{notice}</p>
      </section>

      <section className="hll-method hll-shell" aria-label="How Headline Lab works">
        <span>LAB NOTE / 06</span>
        <p><strong>Local by design.</strong> Headline Lab extracts the lead and key terms from your text, then applies seven editorial formats. Use the result as an angle—not a substitute for editorial judgment.</p>
      </section>
    </div>
  )
}

export default HeadlineLab
