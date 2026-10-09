const discoveryKey = 'samlab-discoveries'

export function readDiscoveries(): number[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(discoveryKey) || '[]')
    return Array.isArray(value) ? value.filter((id): id is number => typeof id === 'number') : []
  } catch {
    return []
  }
}

export function recordDiscovery(id: number): number[] {
  const discoveries = readDiscoveries()
  if (!discoveries.includes(id)) {
    const next = [...discoveries, id]
    try {
      window.localStorage.setItem(discoveryKey, JSON.stringify(next))
    } catch {
      // Private browsing may disallow storage. The navigation still works normally.
    }
    return next
  }
  return discoveries
}
