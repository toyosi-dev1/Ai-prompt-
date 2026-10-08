import { aspectProfiles, styleProfiles } from '../utils/profiles'

export default function FormatPreview({ aspectRatio, style }) {
  const aspect = aspectProfiles[aspectRatio] ?? aspectProfiles['4:5']
  const swatches = (styleProfiles[style] ?? styleProfiles.Editorial).swatches
  const [width, height] = aspect.frame
  const x = (64 - width) / 2
  const y = (64 - height) / 2

  return (
    <div className="flex items-center gap-4 border-b border-line pb-5">
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden="true" className="shrink-0 text-accent">
        <rect x={x} y={y} width={width} height={height} rx="2" stroke="currentColor" strokeWidth="1.5" />
        <g stroke="currentColor" strokeWidth="0.75" opacity="0.4">
          <path d={`M${x + width / 3} ${y}v${height}M${x + (width * 2) / 3} ${y}v${height}`} />
          <path d={`M${x} ${y + height / 3}h${width}M${x} ${y + (height * 2) / 3}h${width}`} />
        </g>
      </svg>
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">{aspect.format}</p>
        <p className="mt-0.5 text-xs text-muted">{style} palette</p>
        <div className="mt-2 flex gap-1.5" aria-hidden="true">
          {swatches.map((color) => (
            <span key={color} className="h-3.5 w-3.5 rounded-full border border-line-strong" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </div>
  )
}
