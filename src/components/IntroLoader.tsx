import { useEffect, useState } from 'react'

interface IntroLoaderProps {
  onComplete: () => void
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  const finish = () => {
    setProgress(100)
    setLeaving(true)
    window.setTimeout(onComplete, 380)
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      finish()
      return
    }
    const started = performance.now()
    const duration = 1050
    let frame = 0
    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - started) / duration) * 100))
      setProgress(next)
      if (next < 100) frame = requestAnimationFrame(tick)
      else window.setTimeout(() => finish(), 110)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className={`intro-loader ${leaving ? 'is-leaving' : ''}`} aria-label="Initializing SAMLAB" role="status">
      <div className="loader-orb" aria-hidden="true"><i /><i /><i /></div>
      <div className="loader-content">
        <p className="eyebrow"><span />SAMLAB / BOOT SEQUENCE</p>
        <h1>INITIALIZING<br /><em>SAMLAB.</em></h1>
        <div className="progress-row">
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <span className="mono">{String(progress).padStart(3, '0')}%</span>
        </div>
        <p className="loader-note mono">{progress < 68 ? 'CALIBRATING INTERFACES' : progress < 100 ? 'OPENING LABORATORY' : 'WELCOME.'}</p>
      </div>
      <button type="button" className="loader-skip mono" onClick={finish}>SKIP INTRO</button>
    </div>
  )
}
