interface LogoProps {
  compact?: boolean
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <a className="logo" href="#/" aria-label="SAMLAB home">
      <span className="logo-mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      {!compact && <span>SAMLAB</span>}
    </a>
  )
}
