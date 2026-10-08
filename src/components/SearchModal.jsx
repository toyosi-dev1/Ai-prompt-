import { useEffect, useMemo, useState } from 'react'
import { Bookmark, LayoutTemplate, Search } from 'lucide-react'
import Modal from './Modal'
import { useApp } from '../context/AppContext'
import { templates } from '../data/templates'
import { searchAll } from '../utils/search'

const kindMeta = {
  prompt: { label: 'Saved prompts', icon: Bookmark },
  template: { label: 'Templates', icon: LayoutTemplate },
}

export default function SearchModal({ onClose }) {
  const { prompts, navigate } = useApp()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const results = useMemo(() => searchAll(query, prompts, templates), [query, prompts])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    document.getElementById(`search-option-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const choose = (result) => {
    navigate(result.kind === 'prompt' ? 'prompts' : 'templates', { q: result.title })
    onClose()
  }

  const handleKeyDown = (event) => {
    if (results.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => (index + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => (index - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      choose(results[active])
    }
  }

  return (
    <Modal title="Search prompts and templates" onClose={onClose} placement="top" hideTitle>
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-muted" />
        <input
          data-autofocus
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="search-results"
          aria-activedescendant={results.length ? `search-option-${active}` : undefined}
          aria-label="Search prompts and templates"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search prompts and templates"
          className="h-14 w-full bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
        />
      </div>
      <ul id="search-results" role="listbox" aria-label="Results" className="max-h-[50vh] overflow-y-auto p-2">
        {results.length === 0 && (
          <li role="presentation" className="px-3 py-8 text-center text-sm text-muted">
            Nothing matches “{query.trim()}”. Try a style, product, or template name.
          </li>
        )}
        {results.map((result, index) => {
          const { icon: Icon, label } = kindMeta[result.kind]
          const showGroup = index === 0 || results[index - 1].kind !== result.kind
          return (
            <li key={result.key} role="presentation">
              {showGroup && <p className="px-3 pb-1 pt-3 text-xs font-medium text-muted">{label}</p>}
              <div
                id={`search-option-${index}`}
                role="option"
                aria-selected={index === active}
                onClick={() => choose(result)}
                onMouseMove={() => setActive(index)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${index === active ? 'bg-raised text-ink' : 'text-muted'}`}
              >
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate text-ink">{result.title}</span>
                <span className="shrink-0 text-xs text-muted">{result.detail}</span>
              </div>
            </li>
          )
        })}
      </ul>
      <p className="flex items-center gap-4 border-t border-line px-4 py-3 text-xs text-muted">
        <span>
          <kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> to move
        </span>
        <span>
          <kbd className="kbd">Enter</kbd> to open
        </span>
        <span>
          <kbd className="kbd">Esc</kbd> to close
        </span>
      </p>
    </Modal>
  )
}
