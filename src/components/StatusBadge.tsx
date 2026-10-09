import { statusMeta } from '../data/site'
import type { ExperimentStatus } from '../types/project'

export function StatusBadge({ status }: { status: ExperimentStatus }) {
  const meta = statusMeta[status]
  return (
    <span className={`status-badge status-${meta.tone}`}>
      <i aria-hidden="true" />
      {meta.label}
    </span>
  )
}
