import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Bookmark, Search, SearchX } from 'lucide-react'
import PromptCard from '../components/PromptCard'
import SelectControl from '../components/SelectControl'
import { useApp } from '../context/AppContext'

const ALL_STYLES = 'All styles'

export default function MyPrompts({ params }) {
  const { prompts, deletePrompt, navigate } = useApp()
  const [query, setQuery] = useState(params.q ?? '')
  const [style, setStyle] = useState(ALL_STYLES)
  const deferredQuery = useDeferredValue(query)

  useEffect(() => setQuery(params.q ?? ''), [params.q])

  const styleOptions = useMemo(() => [ALL_STYLES, ...new Set(prompts.map((prompt) => prompt.style).filter(Boolean))], [prompts])

  const visible = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase()
    return prompts.filter((prompt) => {
      const matchesStyle = style === ALL_STYLES || prompt.style === style
      const matchesQuery = !needle || `${prompt.title} ${prompt.text} ${prompt.style}`.toLowerCase().includes(needle)
      return matchesStyle && matchesQuery
    })
  }, [prompts, deferredQuery, style])

  if (prompts.length === 0) {
    return (
      <div className="panel flex flex-col items-center px-6 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-line-strong bg-raised text-accent">
          <Bookmark aria-hidden="true" className="h-6 w-6" />
        </span>
        <h2 className="mt-6 text-xl font-semibold tracking-tight">No saved prompts yet</h2>
        <p className="mt-2 max-w-sm text-sm text-muted">Generate your first prompt in Studio.</p>
        <button type="button" className="btn btn-primary mt-8" onClick={() => navigate('studio')}>
          Open Studio
        </button>
      </div>
    )
  }

  const resetFilters = () => {
    setQuery('')
    setStyle(ALL_STYLES)
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="prompt-search" className="sr-only">
            Search saved prompts
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="prompt-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search saved prompts"
            className="field h-11 pl-10"
          />
        </div>
        <div className="sm:w-56">
          <SelectControl label="Filter by style" hideLabel value={style} options={styleOptions} onChange={setStyle} />
        </div>
      </div>

      <p role="status" className="mt-4 text-sm text-muted">
        {visible.length} of {prompts.length} saved {prompts.length === 1 ? 'prompt' : 'prompts'}
      </p>

      {visible.length === 0 ? (
        <div className="panel mt-4 flex flex-col items-center px-6 py-16 text-center">
          <SearchX aria-hidden="true" className="h-6 w-6 text-muted" />
          <h2 className="mt-4 text-lg font-semibold tracking-tight">No prompts match</h2>
          <p className="mt-2 text-sm text-muted">Try a different search term or style.</p>
          <button type="button" className="btn btn-secondary mt-6" onClick={resetFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {visible.map((prompt) => (
            <li key={prompt.id}>
              <PromptCard prompt={prompt} onDelete={deletePrompt} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
