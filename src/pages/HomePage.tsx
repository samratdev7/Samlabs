import { categoryMeta } from '../data/site'
import { projects as experiments } from '../data/projects'
import { labHref } from '../utils/routes'
import { Arrow } from '../components/Arrow'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeading } from '../components/SectionHeading'
import { StatusBadge } from '../components/StatusBadge'
import { useEffect, useRef } from 'react'

const categoryOrder = ['interactive', 'tools', 'worlds'] as const

export function HomePage() {
  const featured = experiments.filter((project) => project.featured).slice(0, 3)
  const activeBuilds = experiments.filter((project) => project.status === 'development').slice(0, 3)
  const orbitalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const updateOrbits = () => {
      frame = 0
      if (!orbitalRef.current) return

      const radius = orbitalRef.current.clientWidth
      orbitalRef.current.querySelectorAll<HTMLElement>('[data-orbit-dot]').forEach((dot) => {
        const angle = Number(dot.dataset.orbitStart ?? 0) + window.scrollY * 0.25
        const distance = radius * Number(dot.dataset.orbitRadius ?? 0)
        dot.style.transform = `rotate(${angle}deg) translateX(${distance}px)`
      })
    }

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateOrbits)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateOrbits)
    updateOrbits()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateOrbits)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="home-page page-enter">
      <section className="hero" aria-labelledby="home-heading">
        <div className="hero-ambient" aria-hidden="true">
          <div className="orbital-system scroll-rotate" ref={orbitalRef}>
            <i className="orbit orbit-a" /><i className="orbit orbit-b" /><i className="orbit orbit-c" />
            <i className="orb-core" />
            <i className="orb-satellite satellite-a" data-orbit-dot data-orbit-radius="0.31" data-orbit-start="-35" />
            <i className="orb-satellite satellite-b" data-orbit-dot data-orbit-radius="0.43" data-orbit-start="145" />
            <i className="orb-satellite satellite-c" data-orbit-dot data-orbit-radius="0.22" data-orbit-start="225" />
          </div>
          <div className="hero-vertical-label mono">COORD // 22.5726° N / 88.3639° E</div>
        </div>
        <div className="hero-content wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span />SYSTEM ONLINE <b>//</b> 03 DISCIPLINES <b>//</b> 15 EXPERIMENTS</p>
            <h1 id="home-heading" tabIndex={-1}>WELCOME<br />TO <em>SAMLAB</em></h1>
            <p className="hero-description">A laboratory of digital ideas, experiments and experiences.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#/lab">ENTER SAMLAB <Arrow /></a>
              <a className="button button-quiet" href="#/about">ABOUT THE LAB <span>↗</span></a>
            </div>
          </div>
          <aside className="telemetry-card" aria-label="SAMLAB system telemetry">
            <div className="telemetry-topline"><span className="mono">LAB TELEMETRY</span><span className="live-indicator"><i />ONLINE</span></div>
            <div className="telemetry-figure"><strong>15</strong><span>ACTIVE<br />FILES</span></div>
            <dl>
              <div><dt>PHASE</dt><dd>01 / FOUNDATION</dd></div>
              <div><dt>SIGNAL</dt><dd>STABLE</dd></div>
              <div><dt>LOCATION</dt><dd>THE OPEN WEB</dd></div>
            </dl>
            <div className="telemetry-scan" aria-hidden="true"><span /><span /><span /><span /><span /></div>
          </aside>
        </div>
        <div className="hero-bottom wrap mono" aria-hidden="true">
          <span>SCROLL TO EXPLORE</span><i /><span>EST. 2026</span>
        </div>
      </section>

      <section className="statement-band">
        <div className="wrap statement-inner">
          <p className="mono">THE PREMISE</p>
          <p>Not a portfolio. A place for <em>curiosity</em> to become something you can touch.</p>
          <span className="statement-index mono">01—04</span>
        </div>
      </section>

      <section className="section featured-section wrap" aria-labelledby="featured-heading">
        <SectionHeading
          eyebrow="SELECTED SPECIMENS"
          title={<>FEATURED<br /><em>EXPERIMENTS.</em></>}
          copy="Begin anywhere. Every file is made to be opened, tested and explored."
          action={<a className="text-link" href="#/lab">VIEW LAB INDEX <Arrow /></a>}
        />
        <div className="featured-grid">
          {featured.map((project, index) => <ProjectCard key={project.id} project={project} variant={index === 0 ? 'featured' : 'compact'} />)}
        </div>
      </section>

      <section className="section category-section wrap" aria-labelledby="explore-heading">
        <SectionHeading
          eyebrow="CHOOSE A DISCIPLINE"
          title={<>EXPLORE<br /><em>THE LAB.</em></>}
          copy="Three distinct routes through a growing collection of digital work."
        />
        <div className="category-grid">
          {categoryOrder.map((category) => {
            const meta = categoryMeta[category]
            const count = experiments.filter((project) => project.category === category).length
            return (
              <a className={`category-panel category-${category}`} href={labHref(category)} key={category}>
                <div className="category-graphic" aria-hidden="true">
                  {category === 'interactive' && <><i /><i /><i /><i /><b /></>}
                  {category === 'tools' && <><i /><i /><i /><i /><i /><i /></>}
                  {category === 'worlds' && <><i /><i /><i /><b /></>}
                </div>
                <div className="category-panel-top"><span className="mono">CATEGORY {meta.index}</span><span className="mono">{String(count).padStart(2, '0')} FILES</span></div>
                <div className="category-panel-main">
                  <p className="mono">{meta.short}</p>
                  <h3>{meta.description}</h3>
                </div>
                <div className="category-panel-footer"><span>OPEN DISCIPLINE</span><Arrow /></div>
              </a>
            )
          })}
        </div>
      </section>

      <section className="section build-log-section wrap" aria-labelledby="build-log-heading">
        <div className="build-log-heading">
          <div>
            <p className="eyebrow"><span />LIVE RESEARCH NOTES</p>
            <h2 id="build-log-heading">CURRENTLY<br /><em>EXPERIMENTING.</em></h2>
          </div>
          <p>In a laboratory, the work is never static. These are the files currently receiving attention.</p>
        </div>
        <div className="build-log">
          {activeBuilds.map((project) => (
            <a href={`#/lab/${project.slug}`} className="build-log-item" key={project.id}>
              <span className="mono">BUILD LOG {String(project.id).padStart(2, '0')}</span>
              <div><h3>{project.name}</h3><p>{project.tagline}</p></div>
              <StatusBadge status={project.status} />
              <Arrow direction="up-right" />
            </a>
          ))}
        </div>
      </section>

      <section className="closing-cta wrap" aria-label="Browse all experiments">
        <p className="mono">END OF INITIAL SCAN</p>
        <h2>THE LAB IS<br /><em>OPEN.</em></h2>
        <a href="#/lab" className="round-cta" aria-label="Enter SAMLAB lab index"><span>ENTER<br />THE LAB</span><Arrow /></a>
        <span className="closing-coordinate mono">01 / 15 — START HERE</span>
      </section>
    </div>
  )
}
