import { useEffect, useState } from 'react'
import { navigation } from '../data/site'
import { Logo } from './Logo'

interface NavigationProps {
  currentHash: string
  discoveries: number
}

export function Navigation({ currentHash, discoveries }: NavigationProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [currentHash])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <div className="nav-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => {
            const target = item.href.replace('#', '')
            const active = currentHash === target
            return (
              <a key={item.label} className={active ? 'active' : ''} href={item.href}>
                {item.label}
              </a>
            )
          })}
        </nav>
        <div className="nav-meta">
          <span className="discovery-count mono" title="Experiments you have opened this visit">
            {String(discoveries).padStart(2, '0')}/15 <em>FOUND</em>
          </span>
          <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className="mobile-nav" aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <a key={item.label} href={item.href} tabIndex={open ? 0 : -1}>
              <span className="mono">0{index + 1}</span>{item.label}
            </a>
          ))}
        </nav>
        <p>EXPLORE. EXPERIMENT. BUILD.</p>
      </div>
    </header>
  )
}
