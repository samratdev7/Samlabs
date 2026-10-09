interface ArrowProps {
  direction?: 'right' | 'up-right'
}

export function Arrow({ direction = 'right' }: ArrowProps) {
  return (
    <svg className={`arrow arrow-${direction}`} viewBox="0 0 18 18" aria-hidden="true">
      <path d="M2 9h13M10 3l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
