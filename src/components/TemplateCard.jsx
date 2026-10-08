import { Image as ImageIcon, Type, Video } from 'lucide-react'
import { aspectProfiles, styleProfiles } from '../utils/profiles'

const typeIcons = { Image: ImageIcon, Video, Text: Type }

export default function TemplateCard({ template, onUse }) {
  const { title, description, category, form } = template
  const TypeIcon = typeIcons[form.promptType]
  const swatches = styleProfiles[form.style].swatches

  return (
    <article className="panel flex h-full flex-col p-5 transition-colors hover:border-line-strong">
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="rounded-full border border-line-strong px-2.5 py-1">{category}</span>
        <span className="flex items-center gap-1.5">
          <TypeIcon aria-hidden="true" className="h-3.5 w-3.5" />
          {form.promptType}
        </span>
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{description}</p>
      <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
        {swatches.map((color) => (
          <span key={color} className="h-4 w-4 rounded-full border border-line-strong" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <p className="min-w-0 truncate text-xs text-muted">
          {form.style}, {aspectProfiles[form.aspectRatio].format}
        </p>
        <button type="button" className="btn btn-secondary shrink-0" onClick={() => onUse(template)} aria-label={`Use template: ${title}`}>
          Use template
        </button>
      </div>
    </article>
  )
}
