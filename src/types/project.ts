export type ExperimentCategory = 'interactive' | 'tools' | 'worlds'

export type ExperimentStatus = 'live' | 'experimental' | 'development' | 'soon'

export interface Experiment {
  id: number
  slug: string
  name: string
  category: ExperimentCategory
  status: ExperimentStatus
  tagline: string
  description: string
  detail: string
  focus: string[]
  accent: string
  featured?: boolean
}
