interface SectionHeadingProps {
  eyebrow: string
  title: React.ReactNode
  copy?: string
  action?: React.ReactNode
}

export function SectionHeading({ eyebrow, title, copy, action }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <div>
        <p className="eyebrow"><span />{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-heading-aside">
        {copy && <p>{copy}</p>}
        {action}
      </div>
    </header>
  )
}
