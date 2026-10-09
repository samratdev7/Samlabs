import { useEffect } from 'react'
import { categoryMeta, statusMeta } from '../data/site'
import { projects as experiments } from '../data/projects'
import { labHref } from '../utils/routes'
import { Arrow } from '../components/Arrow'
import { StatusBadge } from '../components/StatusBadge'

interface ExperimentBriefPageProps {
  slug: string
  onDiscover: (id: number) => void
}

export function ExperimentBriefPage({ slug, onDiscover }: ExperimentBriefPageProps) {
  const project = experiments.find((item) => item.slug === slug)

  useEffect(() => {
    if (project) onDiscover(project.id)
  }, [project?.id])

  if (!project) {
    return (
      <section className="not-found wrap page-enter" aria-labelledby="not-found-heading">
        <p className="eyebrow"><span />ERROR / FILE NOT FOUND</p>
        <h1 id="not-found-heading" tabIndex={-1}>THIS FILE<br /><em>DOESN'T EXIST.</em></h1>
        <p>The requested experiment is not currently in the SAMLAB index.</p>
        <a className="button button-primary" href="#/lab">RETURN TO LAB <Arrow /></a>
      </section>
    )
  }

  const category = categoryMeta[project.category]
  const status = statusMeta[project.status]
  const number = String(project.id).padStart(2, '0')
  return (
    <div className="brief-page page-enter">
      <section className="brief-hero wrap" aria-labelledby="brief-heading">
        <a className="back-link mono" href={labHref(project.category)}>← BACK TO {category.short}</a>
        <div className="brief-hero-grid">
          <div className="brief-copy">
            <p className="eyebrow"><span />EXPERIMENT {number} / {category.short}</p>
            <h1 id="brief-heading" tabIndex={-1}>{project.name}</h1>
            <p className="brief-tagline">{project.tagline}</p>
            <p className="brief-description">{project.detail}</p>
          </div>
          <aside className="brief-file-card" style={{ '--card-accent': project.accent } as React.CSSProperties}>
            <div className="brief-file-top"><span className="mono">FILE STATUS</span><StatusBadge status={project.status} /></div>
            <div className="brief-status-display"><span className={`brief-status-orb ${status.tone}`} /><p>{status.label}</p></div>
            <dl>
              <div><dt>CATALOG</dt><dd>SL / {number}</dd></div>
              <div><dt>TYPE</dt><dd>{category.short}</dd></div>
              <div><dt>PHASE</dt><dd>{project.status === 'development' ? 'PROTOTYPING' : project.status === 'live' ? 'AVAILABLE' : 'QUEUED'}</dd></div>
            </dl>
          </aside>
        </div>
      </section>
      <section className="brief-content wrap">
        <div className="brief-details">
          <p className="eyebrow"><span />RESEARCH FOCUS</p>
          <h2>WHAT THIS<br /><em>FILE EXPLORES.</em></h2>
          <ul>
            {project.focus.map((item, index) => <li key={item}><span className="mono">0{index + 1}</span>{item}</li>)}
          </ul>
        </div>
        <div className="brief-note">
          <span className="mono">LAB NOTE</span>
          <p>{project.status === 'live' ? 'This experiment is active and ready to be explored.' : 'This experiment has a defined research brief and is being built as an independent module. It will become directly accessible from this file when its prototype is ready.'}</p>
          <a href={labHref(project.category)} className="text-link">CONTINUE EXPLORING <Arrow /></a>
        </div>
      </section>
      <section className="next-file wrap">
        <p className="mono">DISCOVERY REGISTERED / {number} OF 15</p>
        <h2>KEEP<br /><em>EXPLORING.</em></h2>
        <a className="button button-primary" href="#/lab">OPEN LAB INDEX <Arrow /></a>
      </section>
    </div>
  )
}
