import type { ExperimentCategory, ExperimentStatus } from '../types/project'

export const categoryMeta: Record<ExperimentCategory, { index: string; label: string; short: string; description: string }> = {
  interactive: {
    index: '01',
    label: 'Interactive',
    short: 'INTERACTIVE',
    description: 'Experiences to explore.',
  },
  tools: {
    index: '02',
    label: 'Tools',
    short: 'TOOLS',
    description: 'Things you can actually use.',
  },
  worlds: {
    index: '03',
    label: 'Digital Worlds',
    short: 'DIGITAL WORLDS',
    description: 'Websites to discover.',
  },
}

export const statusMeta: Record<ExperimentStatus, { label: string; tone: string }> = {
  live: { label: 'LIVE', tone: 'live' },
  experimental: { label: 'EXPERIMENTAL', tone: 'experimental' },
  development: { label: 'IN DEVELOPMENT', tone: 'development' },
  soon: { label: 'COMING SOON', tone: 'soon' },
}

export const navigation = [
  { label: 'HOME', href: '#/' },
  { label: 'LAB', href: '#/lab' },
  { label: 'TOOLS', href: '#/lab?category=tools' },
  { label: 'WORLDS', href: '#/lab?category=worlds' },
  { label: 'ABOUT', href: '#/about' },
]
