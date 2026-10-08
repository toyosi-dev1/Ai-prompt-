import { useId } from 'react'
import { ChevronDown } from 'lucide-react'

export default function SelectControl({ label, value, options, onChange, hideLabel = false }) {
  const id = useId()
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={hideLabel ? 'sr-only' : 'mb-2 block text-sm font-medium'}>
        {label}
      </label>
      <div className="relative">
        <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="field h-11 appearance-none pr-10">
          {options.map((option) => {
            const item = typeof option === 'string' ? { value: option, label: option } : option
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            )
          })}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>
    </div>
  )
}
