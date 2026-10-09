import { useEffect, useState } from 'react'

export function Cursor() {
  const [position, setPosition] = useState({ x: -80, y: -80 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const move = (event: PointerEvent) => setPosition({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return <div className="custom-cursor" aria-hidden="true" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} />
}
