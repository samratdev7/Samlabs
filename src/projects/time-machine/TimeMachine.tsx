import { useRef, useState, type KeyboardEvent } from 'react'
import './time-machine.css'

type Era = {
  year: number
  label: string
  transmission: string
  tagline: string
  overview: string
  connection: string
  technology: Array<{ name: string; note: string }>
  websites: string[]
  computer: string
  phone: string
  culture: string
  breakthrough: string
  design: string
  forecast: string
  speculative?: boolean
}

const ERAS: Era[] = [
  {
    year: 1990,
    label: 'THE DIAL-UP WEB',
    transmission: 'MODEM HANDSHAKE / 56K',
    tagline: 'The web is small, strange, and waiting to be discovered.',
    overview:
      'A new public network is taking shape one hand-coded page at a time. Every link feels like a doorway, and getting online is an event in itself.',
    connection: 'Dial-up / 56K modem',
    technology: [
      { name: 'HTML 1.0', note: 'Pages are written by hand.' },
      { name: 'Netscape', note: 'The browser becomes a destination.' },
      { name: 'IRC + email', note: 'Communities gather in text.' },
    ],
    websites: ['Yahoo!', 'GeoCities', 'AltaVista'],
    computer: 'Beige desktop + CRT monitor',
    phone: 'Motorola MicroTAC',
    culture: 'Web rings, animated GIFs, guestbooks, and “under construction” signs make the frontier feel personal.',
    breakthrough: 'The World Wide Web moves from research labs into homes, schools, and small businesses.',
    design: 'Monospace type, blue underlined links, tiled backgrounds, browser chrome, and very little polish.',
    forecast: 'One day, this network may become the default place to learn, work, and publish.',
  },
  {
    year: 2000,
    label: 'THE DOT-COM WAVE',
    transmission: 'BROADBAND DETECTED / 512K',
    tagline: 'The web gets louder, faster, and wildly more ambitious.',
    overview:
      'Broadband arrives. Search starts organizing the chaos. The internet becomes a product, a business, and a place to make a very bright personal homepage.',
    connection: 'Broadband / early Wi-Fi',
    technology: [
      { name: 'Flash', note: 'Motion enters the browser.' },
      { name: 'Google Search', note: 'Finding things gets simple.' },
      { name: 'MP3 players', note: 'Media becomes portable.' },
    ],
    websites: ['Google', 'Myspace', 'Napster'],
    computer: 'iMac G3 + Windows XP tower',
    phone: 'Nokia 3310',
    culture: 'Ringtones, instant messengers, personal profiles, and the first viral files create a new shared language.',
    breakthrough: 'Search, broadband, and portable media turn the web from a directory into an everyday utility.',
    design: 'Glossy buttons, gradients, bubbles, drop shadows, badges, and optimistic aqua interfaces.',
    forecast: 'The next internet may be built around people instead of pages.',
  },
  {
    year: 2010,
    label: 'THE SOCIAL WEB',
    transmission: 'CLOUD SYNC / ALWAYS ON',
    tagline: 'The internet fits in a pocket—and follows you everywhere.',
    overview:
      'Feeds replace portals. Apps reshape habits. The web moves from a destination you visit to a layer that travels with you through the day.',
    connection: '4G + cloud sync',
    technology: [
      { name: 'Smartphone apps', note: 'The screen moves to the hand.' },
      { name: 'Responsive web', note: 'Layouts learn to adapt.' },
      { name: 'Cloud services', note: 'Files live everywhere.' },
    ],
    websites: ['Facebook', 'YouTube', 'Twitter'],
    computer: 'MacBook Air',
    phone: 'iPhone 4 / Android',
    culture: 'Likes, livestreams, hashtags, creators, and constant sharing turn attention into a social currency.',
    breakthrough: 'Always-connected mobile computing makes every moment searchable, shareable, and measurable.',
    design: 'Flat surfaces, bold colors, generous whitespace, card grids, and familiar app icons.',
    forecast: 'The best interfaces may disappear behind services that understand context.',
  },
  {
    year: 2020,
    label: 'THE CONNECTED PRESENT',
    transmission: 'DISTRIBUTED NETWORK / LIVE',
    tagline: 'The web becomes the room where much of life happens.',
    overview:
      'Work, culture, commerce, and communities converge in a dense constellation of platforms. AI starts moving from a research subject to a daily collaborator.',
    connection: '5G + remote cloud',
    technology: [
      { name: 'Video collaboration', note: 'Distance becomes a layout problem.' },
      { name: 'Generative AI', note: 'Ideas get a new interface.' },
      { name: 'Edge computing', note: 'Speed moves closer to people.' },
    ],
    websites: ['TikTok', 'Discord', 'Figma'],
    computer: 'M-series laptop',
    phone: '5G camera phone',
    culture: 'Short-form video, digital communities, remote rituals, and creator-led media reshape how trends travel.',
    breakthrough: 'AI tools and collaborative software become part of ordinary creative and professional workflows.',
    design: 'Dark modes, soft depth, glass panels, large type, motion systems, and accessible responsive layouts.',
    forecast: 'The next interface could be conversational, personal, and shaped in real time.',
  },
  {
    year: 2030,
    label: 'THE AMBIENT WEB',
    transmission: 'SPECULATIVE SIGNAL / 2030',
    tagline: 'Computing leaves the rectangle and enters the environment.',
    overview:
      'This is a projection, not a promise: personal agents coordinate tasks while spatial interfaces make digital information feel anchored to the physical world.',
    connection: 'Ambient mesh / adaptive edge',
    technology: [
      { name: 'Personal agents', note: 'Software acts with permission.' },
      { name: 'Spatial layers', note: 'Information gains depth.' },
      { name: 'Local AI', note: 'More intelligence stays nearby.' },
    ],
    websites: ['Context Spaces', 'Agent Commons', 'Living Archives'],
    computer: 'Spatial workstation',
    phone: 'Wearable display',
    culture: 'People curate agent identities, negotiate data boundaries, and use shared mixed-reality spaces as casually as group chats.',
    breakthrough: 'Interfaces begin responding to place, intent, and consent instead of only taps and typed commands.',
    design: 'Layered depth, quiet motion, adaptive color, persistent context, and controls that appear only when useful.',
    forecast: 'The web may feel less like a collection of sites and more like a shared, intelligent environment.',
    speculative: true,
  },
  {
    year: 2050,
    label: 'THE SYNTHETIC HORIZON',
    transmission: 'SPECULATIVE SIGNAL / 2050',
    tagline: 'A future interface may be designed around trust, not screens.',
    overview:
      'This future scenario imagines computing as an almost invisible fabric—distributed, multilingual, adaptive, and designed to preserve human agency.',
    connection: 'Planetary mesh / zero-latency illusion',
    technology: [
      { name: 'Material computing', note: 'Surfaces become interfaces.' },
      { name: 'Trusted agents', note: 'Identity is portable by design.' },
      { name: 'Living data', note: 'Systems explain themselves.' },
    ],
    websites: ['Memory Gardens', 'Civic Mesh', 'Open Synthesis'],
    computer: 'Adaptive environment',
    phone: 'No single device',
    culture: 'Digital spaces are treated as public infrastructure: interoperable, explainable, and shaped by communities.',
    breakthrough: 'The imagined leap is not more screens—it is interfaces that know when to step back.',
    design: 'Luminous restraint, responsive materials, high-contrast clarity, and an intentional absence of visual noise.',
    forecast: 'The most advanced technology may be the kind that gives people more attention back.',
    speculative: true,
  },
]

const DEFAULT_ERA_INDEX = ERAS.findIndex((era) => era.year === 2020)

export function TimeMachine() {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ERA_INDEX)
  const timelineButtons = useRef<Array<HTMLButtonElement | null>>([])
  const activeEra = ERAS[activeIndex]
  const nextEra = ERAS[(activeIndex + 1) % ERAS.length]

  function selectEra(index: number, focusButton = false) {
    setActiveIndex(index)
    if (focusButton) timelineButtons.current[index]?.focus()
  }

  function handleTimelineKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % ERAS.length
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + ERAS.length) % ERAS.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = ERAS.length - 1

    if (nextIndex === null) return
    event.preventDefault()
    selectEra(nextIndex, true)
  }

  return (
    <section className={`time-machine tm-era-${activeEra.year}`} aria-labelledby="time-machine-title">
      <div className="tm-atmosphere" aria-hidden="true">
        <i /><i /><i />
      </div>

      <div className="tm-shell">
        <header className="tm-topbar">
          <a className="tm-back-link" href="#/lab?category=interactive">← LAB INDEX</a>
          <p className="tm-topbar-label">EXPERIMENT 01 / TEMPORAL INTERFACE</p>
          <p className="tm-topbar-status" role="status">COORDINATE LOCKED: {activeEra.year}</p>
        </header>

        <div className="tm-intro">
          <div className="tm-intro-copy">
            <p className="tm-overline">SAMLAB TIME MACHINE</p>
            <h1 id="time-machine-title" tabIndex={-1}>WHERE DO YOU<br />WANT <em>TO GO?</em></h1>
            <p className="tm-intro-description">Select a coordinate to watch the technology, culture, and visual language of the web reconfigure around you.</p>
          </div>
          <div className="tm-coordinate-card" aria-label={`Current selection: ${activeEra.year}, ${activeEra.label}`}>
            <span className="tm-coordinate-label">CURRENT COORDINATE</span>
            <strong>{activeEra.year}</strong>
            <span>{activeEra.transmission}</span>
          </div>
        </div>

        <div className="tm-timeline-frame">
          <div className="tm-timeline-line" aria-hidden="true" />
          <div className="tm-timeline" role="tablist" aria-label="Technology eras">
            {ERAS.map((era, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={era.year}
                  ref={(node) => { timelineButtons.current[index] = node }}
                  id={`time-machine-era-${era.year}-tab`}
                  className={`tm-era-selector${isActive ? ' is-active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`time-machine-era-${era.year}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectEra(index)}
                  onKeyDown={(event) => handleTimelineKeyDown(event, index)}
                >
                  <span className="tm-era-point" aria-hidden="true" />
                  <span className="tm-era-year">{era.year}</span>
                  <span className="tm-era-name">{era.label.replace('THE ', '')}</span>
                </button>
              )
            })}
          </div>
          <p className="tm-keyboard-note">USE ← → KEYS TO NAVIGATE THE TIMELINE</p>
        </div>

        <div
          id={`time-machine-era-${activeEra.year}-panel`}
          className="tm-era-panel"
          role="tabpanel"
          aria-labelledby={`time-machine-era-${activeEra.year}-tab`}
        >
          <section className="tm-era-hero" aria-labelledby="tm-era-heading">
            <div className="tm-era-copy">
              <p className="tm-overline">{activeEra.speculative ? 'FUTURE SIMULATION / ' : 'ARCHIVED SIGNAL / '}{activeEra.year}</p>
              <h2 id="tm-era-heading"><span>{activeEra.year}</span> {activeEra.label}</h2>
              <p className="tm-era-tagline">{activeEra.tagline}</p>
              <p className="tm-era-overview">{activeEra.overview}</p>
              <div className="tm-era-actions">
                <button className="tm-action tm-action-primary" type="button" onClick={() => selectEra((activeIndex + 1) % ERAS.length)}>
                  EXPLORE {nextEra.year} <span aria-hidden="true">→</span>
                </button>
                <button className="tm-action tm-action-quiet" type="button" onClick={() => selectEra(DEFAULT_ERA_INDEX)} disabled={activeIndex === DEFAULT_ERA_INDEX}>
                  RESET TO 2020
                </button>
              </div>
            </div>

            <aside className="tm-chronoscope" aria-label={`Visual signal for the year ${activeEra.year}`}>
              <div className="tm-chronoscope-header"><span>TIME VIEWER</span><i>LIVE</i></div>
              <div className="tm-chronoscope-display" aria-hidden="true">
                <span className="tm-display-year">{activeEra.year}</span>
                <span className="tm-display-orbit tm-display-orbit-one" />
                <span className="tm-display-orbit tm-display-orbit-two" />
                <span className="tm-display-core" />
                <span className="tm-display-star tm-display-star-one" />
                <span className="tm-display-star tm-display-star-two" />
              </div>
              <div className="tm-chronoscope-footer"><span>{activeEra.connection}</span><span>STABLE</span></div>
            </aside>
          </section>

          <section className="tm-data-section" aria-labelledby="tm-archive-heading">
            <div className="tm-section-heading">
              <p className="tm-overline">ERA ARCHIVE / {activeEra.year}</p>
              <h2 id="tm-archive-heading">WHAT THE WEB<br /><em>FELT LIKE.</em></h2>
              <p>Three fragments from the technology stack and three places people went when they got online.</p>
            </div>

            <div className="tm-archive-grid">
              <article className="tm-card tm-technology-card">
                <p className="tm-card-label">01 / TECHNOLOGY</p>
                <ul className="tm-technology-list">
                  {activeEra.technology.map((item, index) => (
                    <li key={item.name}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div><strong>{item.name}</strong><p>{item.note}</p></div>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="tm-card tm-web-card">
                <p className="tm-card-label">02 / WEB HABITAT</p>
                <h3>POPULAR<br /><em>DESTINATIONS.</em></h3>
                <ul className="tm-web-list">
                  {activeEra.websites.map((website) => <li key={website}><span aria-hidden="true">↗</span>{website}</li>)}
                </ul>
              </article>

              <article className="tm-card tm-hardware-card">
                <p className="tm-card-label">03 / OBJECTS IN HAND</p>
                <dl>
                  <div><dt>COMPUTER</dt><dd>{activeEra.computer}</dd></div>
                  <div><dt>PHONE</dt><dd>{activeEra.phone}</dd></div>
                  <div><dt>CONNECTION</dt><dd>{activeEra.connection}</dd></div>
                </dl>
                <div className="tm-hardware-symbol" aria-hidden="true"><i /><i /><i /></div>
              </article>
            </div>
          </section>

          <section className="tm-notes-grid" aria-label={`${activeEra.year} context notes`}>
            <article className="tm-note tm-note-culture"><p>INTERNET CULTURE</p><h3>{activeEra.culture}</h3></article>
            <article className="tm-note"><p>MAJOR DEVELOPMENT</p><h3>{activeEra.breakthrough}</h3></article>
            <article className="tm-note"><p>VISUAL LANGUAGE</p><h3>{activeEra.design}</h3></article>
            <article className="tm-note tm-note-forecast"><p>{activeEra.speculative ? 'DESIGN PRINCIPLE' : 'FUTURE PREDICTION'}</p><h3>{activeEra.forecast}</h3></article>
          </section>
        </div>

        <footer className="tm-footer">
          <p>TIME MACHINE / {activeEra.year} / SAMLAB ARCHIVE</p>
          <a href="#/lab?category=interactive">RETURN TO INTERACTIVE LAB <span aria-hidden="true">↗</span></a>
        </footer>
      </div>
    </section>
  )
}

export default TimeMachine
