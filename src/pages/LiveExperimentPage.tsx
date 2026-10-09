import type { ReactNode } from 'react'
import { categoryMeta } from '../data/site'
import { labHref } from '../utils/routes'
import type { Experiment } from '../types/project'
import { StatusBadge } from '../components/StatusBadge'

interface LiveExperimentPageProps {
  project: Experiment
  children: ReactNode
}

export function LiveExperimentPage({ project, children }: LiveExperimentPageProps) {
  const category = categoryMeta[project.category]
  const number = String(project.id).padStart(2, '0')

  return (
    <div className="live-frame page-enter" style={{ '--experiment-accent': project.accent } as React.CSSProperties}>
      <header className="live-frame-head wrap">
        <a className="back-link mono" href={labHref(project.category)}>← BACK TO {category.short}</a>
        <div className="live-frame-copy">
          <p className="eyebrow"><span />LIVE EXPERIMENT {number} / {category.short}</p>
          <div>
            <h1 id="live-experiment-heading" tabIndex={-1}>{project.name}</h1>
            <p>{project.tagline}</p>
          </div>
          <StatusBadge status="live" />
        </div>
        <p className="live-frame-note mono">ACTIVE FILE / SL-{number}<br />BUILT TO BE EXPLORED</p>
      </header>
      <div className="live-experiment-content">{children}</div>
    </div>
  )
}
