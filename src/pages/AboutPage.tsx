import { Arrow } from '../components/Arrow'
import { useEffect, useRef } from 'react'

const buildItems = ['Interactive experiences', 'Websites', 'Digital tools', 'Data visualizations', 'Experiments']
const explorationItems = ['AI', 'Web development', 'UI / UX', 'Data visualization', 'Creative technology']

export function AboutPage() {
  const sealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const updateOrbits = () => {
      frame = 0
      if (!sealRef.current) return

      const radius = sealRef.current.clientWidth
      sealRef.current.querySelectorAll<HTMLElement>('[data-orbit-dot]').forEach((dot) => {
        const angle = Number(dot.dataset.orbitStart ?? 0) - window.scrollY * 0.25
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
    <div className="about-page page-enter">
      <section className="about-hero wrap" aria-labelledby="about-heading">
        <div className="about-seal" ref={sealRef} aria-hidden="true">
          <span>S</span>
          <i className="seal-dot seal-dot-a" data-orbit-dot data-orbit-radius="0.39" data-orbit-start="-25" />
          <i className="seal-dot seal-dot-b" data-orbit-dot data-orbit-radius="0.46" data-orbit-start="55" />
          <i className="seal-dot seal-dot-c" data-orbit-dot data-orbit-radius="0.42" data-orbit-start="155" />
          <i className="seal-dot seal-dot-d" data-orbit-dot data-orbit-radius="0.35" data-orbit-start="225" />
        </div>
        <p className="eyebrow"><span />ABOUT / LABORATORY NOTES</p>
        <h1 id="about-heading" tabIndex={-1}>I'M<br /><em>SAMRAT.</em></h1>
        <p className="about-lead">SAMLAB is where I experiment with ideas, interfaces, technology and the web.</p>
        <p className="about-copy">It is a living collection of things I am curious enough to make — from useful little tools to expansive digital worlds. Every project begins as a question: <em>what could this feel like?</em></p>
      </section>
      <section className="about-areas wrap" aria-label="What SAMLAB builds and explores">
        <div className="about-list-block">
          <p className="eyebrow"><span />I BUILD</p>
          <ol>{buildItems.map((item, index) => <li key={item}><span className="mono">0{index + 1}</span>{item}<b>↗</b></li>)}</ol>
        </div>
        <div className="about-list-block accent-block">
          <p className="eyebrow"><span />CURRENTLY EXPLORING</p>
          <ol>{explorationItems.map((item, index) => <li key={item}><span className="mono">0{index + 1}</span>{item}<b>↗</b></li>)}</ol>
        </div>
      </section>
      <section className="about-statement wrap">
        <p className="mono">THE WORKING PRINCIPLE</p>
        <h2>MAKE THE WEB<br />A LITTLE MORE <em>CURIOUS.</em></h2>
        <a href="#/lab" className="button button-primary">EXPLORE THE LAB <Arrow /></a>
      </section>
    </div>
  )
}
