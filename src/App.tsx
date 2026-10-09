import { useCallback, useEffect, useState } from 'react'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { IntroLoader } from './components/IntroLoader'
import { Navigation } from './components/Navigation'
import { AboutPage } from './pages/AboutPage'
import { ExperimentBriefPage } from './pages/ExperimentBriefPage'
import { HomePage } from './pages/HomePage'
import { LabPage } from './pages/LabPage'
import { readRoute } from './utils/routes'
import { readDiscoveries, recordDiscovery } from './utils/storage'

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem('samlab-intro-seen') === 'yes'
  } catch {
    return false
  }
}

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const [discoveries, setDiscoveries] = useState(readDiscoveries)
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro())

  const completeIntro = useCallback(() => {
    try { window.sessionStorage.setItem('samlab-intro-seen', 'yes') } catch { /* continue without persistence */ }
    setShowIntro(false)
  }, [])

  const discover = useCallback((id: number) => {
    setDiscoveries(recordDiscovery(id))
  }, [])

  useEffect(() => {
    const update = () => setRoute(readRoute())
    window.addEventListener('hashchange', update)
    if (!window.location.hash) window.history.replaceState(null, '', '#/')
    return () => window.removeEventListener('hashchange', update)
  }, [])

  useEffect(() => {
    const titles = {
      home: 'SAMLAB — A Laboratory of Digital Ideas',
      lab: 'The Lab — SAMLAB',
      about: 'About — SAMLAB',
      experiment: 'Experiment File — SAMLAB',
    }
    document.title = titles[route.page]
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    const focusTimer = window.setTimeout(() => document.querySelector<HTMLElement>('#home-heading, #lab-heading, #about-heading, #brief-heading, #not-found-heading')?.focus(), 100)
    return () => window.clearTimeout(focusTimer)
  }, [route])

  const currentHash = window.location.hash.replace('#', '') || '/'
  let page: React.ReactNode
  if (route.page === 'lab') page = <LabPage category={route.category} />
  else if (route.page === 'about') page = <AboutPage />
  else if (route.page === 'experiment') page = <ExperimentBriefPage slug={route.slug} onDiscover={discover} />
  else page = <HomePage />

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {showIntro && <IntroLoader onComplete={completeIntro} />}
      <Cursor />
      <Navigation currentHash={currentHash} discoveries={discoveries.length} />
      <main id="main-content" className={showIntro ? 'content-under-intro' : ''}>{page}</main>
      <Footer />
    </>
  )
}
