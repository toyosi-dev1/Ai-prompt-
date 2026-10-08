import { useCallback, useEffect, useState } from 'react'

export const routes = {
  studio: '/',
  prompts: '/prompts',
  templates: '/templates',
  settings: '/settings',
}

const namesByPath = Object.fromEntries(Object.entries(routes).map(([name, path]) => [path, name]))

const parseHash = () => {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [path, search = ''] = raw.split('?')
  return {
    name: namesByPath[path] ?? 'studio',
    params: Object.fromEntries(new URLSearchParams(search)),
  }
}

export const hrefFor = (name, params) => {
  const query = params && Object.keys(params).length ? `?${new URLSearchParams(params)}` : ''
  return `#${routes[name]}${query}`
}

export const useHashRoute = () => {
  const [route, setRoute] = useState(parseHash)

  useEffect(() => {
    const sync = () => setRoute(parseHash())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const navigate = useCallback((name, params) => {
    window.location.hash = hrefFor(name, params)
  }, [])

  return { route, navigate }
}
