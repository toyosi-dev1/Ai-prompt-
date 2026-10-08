import { Check } from 'lucide-react'

const optionClasses = {
  card: 'flex h-20 flex-col items-center justify-center gap-1.5 rounded-lg border border-line-strong bg-raised text-sm text-muted transition-colors hover:border-muted peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent',
  pill: 'flex h-10 items-center justify-center gap-2 rounded-lg border border-line-strong bg-raised px-3.5 text-sm text-muted transition-colors hover:border-muted peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent',
}

export default function SegmentedControl({ legend, hideLegend = false, name, options, value, onChange, variant = 'pill', className = '' }) {
  return (
    <fieldset className="min-w-0">
      <legend className={hideLegend ? 'sr-only' : 'mb-2 text-sm font-medium'}>{legend}</legend>
      <div className={className}>
        {options.map((option) => (
          <label key={option.value} className="relative block cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className={optionClasses[variant]}>
              {option.icon}
              {option.glyph && (
                <span aria-hidden="true" className="rounded-[2px] border border-current" style={{ width: option.glyph[0], height: option.glyph[1] }} />
              )}
              {option.label}
            </span>
            {variant === 'card' && (
              <Check aria-hidden="true" className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-accent opacity-0 peer-checked:opacity-100" />
            )}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
