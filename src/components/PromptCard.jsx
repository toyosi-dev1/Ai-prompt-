import { useState } from 'react'
import { Check, ChevronDown, Copy, Trash2 } from 'lucide-react'
import { aspectProfiles, styleProfiles } from '../utils/profiles'
import { useCopy } from '../utils/useCopy'

const formatDate = (iso) => {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PromptCard({ prompt, onDelete }) {
  const { copied, copy } = useCopy()
  const [expanded, setExpanded] = useState(false)
  const swatches = styleProfiles[prompt.style]?.swatches ?? []
  const format = aspectProfiles[prompt.aspectRatio]?.format ?? prompt.aspectRatio

  return (
    <article className="panel flex h-full flex-col p-5 transition-colors hover:border-line-strong">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold tracking-tight">{prompt.title}</h3>
        <div className="mt-1 flex shrink-0 gap-1" aria-hidden="true">
          {swatches.map((color) => (
            <span key={color} className="h-3 w-3 rounded-full border border-line-strong" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
      <p className={`mt-3 font-serif text-[0.9375rem] leading-7 text-muted ${expanded ? '' : 'line-clamp-3'}`}>{prompt.text}</p>
      <button
        type="button"
        className="link-button mt-2 self-start"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? 'Show less' : 'Show full prompt'}
        <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 text-xs">
        <div>
          <dt className="text-muted">Style</dt>
          <dd className="mt-1 text-ink">{prompt.style}</dd>
        </div>
        <div>
          <dt className="text-muted">Format</dt>
          <dd className="mt-1 text-ink">{format}</dd>
        </div>
        <div>
          <dt className="text-muted">Saved</dt>
          <dd className="mt-1 text-ink">{formatDate(prompt.savedAt)}</dd>
        </div>
      </dl>

      <div className="mt-5 flex gap-2">
        <button type="button" className="btn btn-secondary flex-1" onClick={() => copy(prompt.text)}>
          {copied ? <Check aria-hidden="true" className="h-4 w-4 text-accent" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(prompt.id)} aria-label={`Delete prompt: ${prompt.title}`}>
          <Trash2 aria-hidden="true" className="h-4 w-4" />
          Delete
        </button>
      </div>
    </article>
  )
}
