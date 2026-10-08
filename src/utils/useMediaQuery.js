import { useEffect, useState } from 'react'

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const list = window.matchMedia(query)
    const sync = () => setMatches(list.matches)
    sync()
    list.addEventListener('change', sync)
    return () => list.removeEventListener('change', sync)
  }, [query])

  return matches
}
