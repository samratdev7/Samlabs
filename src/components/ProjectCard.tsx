import { categoryMeta } from '../data/site'
import { experimentHref } from '../utils/routes'
import type { Experiment } from '../types/project'
import { Arrow } from './Arrow'
import { StatusBadge } from './StatusBadge'

interface ProjectCardProps {
  project: Experiment
  variant?: 'catalog' | 'featured' | 'compact'
}

export function ProjectCard({ project, variant = 'catalog' }: ProjectCardProps) {
  const number = String(project.id).padStart(2, '0')
  const category = categoryMeta[project.category]

  return (
    <article className={`project-card project-card-${variant}`} style={{ '--card-accent': project.accent } as React.CSSProperties}>
      <a className="project-card-link" href={experimentHref(project.slug)} aria-label={`Open ${project.name} experiment brief`}>
        <div className="project-card-topline">
          <span className="mono">EXPERIMENT {number}</span>
          <StatusBadge status={project.status} />
        </div>
        <div className="project-card-body">
          <p className="project-category">{category.short}</p>
          <h3>{project.name}</h3>
          <p className="project-description">{project.description}</p>
        </div>
        <footer className="project-card-footer">
          <span className="project-action">VIEW FILE <Arrow /></span>
          <span className="project-serial mono">SL/{number}</span>
        </footer>
      </a>
    </article>
  )
}
