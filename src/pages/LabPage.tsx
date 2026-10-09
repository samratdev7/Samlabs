import { useMemo, useState } from 'react'
import { categoryMeta } from '../data/site'
import { projects as experiments } from '../data/projects'
import { labHref, navigate } from '../utils/routes'
import type { ExperimentCategory } from '../types/project'
import { ProjectCard } from '../components/ProjectCard'

type Filter = 'all' | ExperimentCategory

interface LabPageProps {
  category?: ExperimentCategory
}

const filters: { label: string; value: Filter }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'INTERACTIVE', value: 'interactive' },
  { label: 'TOOLS', value: 'tools' },
  { label: 'DIGITAL WORLDS', value: 'worlds' },
]

export function LabPage({ category }: LabPageProps) {
  const [search, setSearch] = useState('')
  const filter: Filter = category || 'all'
  const results = useMemo(() => {
    const query = search.trim().toLowerCase()
    return experiments.filter((project) => {
      const inCategory = filter === 'all' || project.category === filter
      return inCategory && (!query || `${project.name} ${project.description} ${project.category}`.toLowerCase().includes(query))
    })
  }, [filter, search])

  return (
    <div className="lab-page page-enter">
      <section className="lab-hero wrap" aria-labelledby="lab-heading">
        <div className="lab-hero-grid" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <p className="eyebrow"><span />SAMLAB / MASTER INDEX</p>
        <div className="lab-heading-line">
          <h1 id="lab-heading" tabIndex={-1}>THE<br /><em>LAB.</em></h1>
          <p>Fifteen experiment files.<br />Three disciplines.<br />An invitation to explore.</p>
        </div>
        <div className="lab-stats mono">
          <span><b>15</b> EXPERIMENTS</span><span><b>03</b> DISCIPLINES</span><span><b>∞</b> POSSIBILITIES</span>
        </div>
      </section>

      <section className="catalog-section wrap" aria-labelledby="catalog-heading">
        <div className="catalog-toolbar">
          <div className="filter-list" role="group" aria-label="Filter experiments by category">
            {filters.map((item) => (
              <button type="button" key={item.value} className={filter === item.value ? 'active' : ''} aria-pressed={filter === item.value} onClick={() => navigate(labHref(item.value === 'all' ? undefined : item.value))}>
                {item.label}<span>{item.value === 'all' ? experiments.length : experiments.filter((project) => project.category === item.value).length}</span>
              </button>
            ))}
          </div>
          <label className="catalog-search"><span className="sr-only">Search experiments</span><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="4.75" /><path d="m12 12 4.5 4.5" /></svg><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="SEARCH FILES" /></label>
        </div>
        <div className="catalog-context">
          <h2 id="catalog-heading">{filter === 'all' ? 'ALL EXPERIMENTS' : categoryMeta[filter].short}</h2>
          <p className="mono" aria-live="polite">{String(results.length).padStart(2, '0')} FILES LOCATED</p>
        </div>
        {results.length > 0 ? (
          <div className="project-grid">
            {results.map((project) => <ProjectCard project={project} key={project.id} />)}
          </div>
        ) : (
          <div className="empty-state"><span className="mono">NO FILES MATCH THAT SEARCH</span><button type="button" onClick={() => setSearch('')}>CLEAR SEARCH</button></div>
        )}
      </section>
    </div>
  )
}
