import type { ExperimentCategory } from '../types/project'

export type AppRoute =
  | { page: 'home' }
  | { page: 'lab'; category?: ExperimentCategory }
  | { page: 'about' }
  | { page: 'experiment'; slug: string }

const categoryValues: ExperimentCategory[] = ['interactive', 'tools', 'worlds']

export function readRoute(): AppRoute {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [pathname, queryString] = raw.split('?')
  const params = new URLSearchParams(queryString)

  if (pathname === '/' || pathname === '') return { page: 'home' }
  if (pathname === '/about') return { page: 'about' }
  if (pathname === '/lab') {
    const category = params.get('category') as ExperimentCategory | null
    return category && categoryValues.includes(category)
      ? { page: 'lab', category }
      : { page: 'lab' }
  }
  if (pathname.startsWith('/lab/')) {
    return { page: 'experiment', slug: pathname.replace('/lab/', '') }
  }
  return { page: 'home' }
}

export function labHref(category?: ExperimentCategory) {
  return category ? `#/lab?category=${category}` : '#/lab'
}

export function experimentHref(slug: string) {
  return `#/lab/${slug}`
}

export function navigate(to: string) {
  window.location.hash = to.replace(/^#/, '')
}
