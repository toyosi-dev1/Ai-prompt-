export default function Logo() {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="29" height="29" rx="7" className="stroke-line-strong" />
        <path d="M16 7l7 9-7 9-7-9z" className="fill-accent" />
        <path d="M16 7v18" className="stroke-panel" strokeWidth="1.5" />
      </svg>
      <span className="text-sm font-semibold tracking-[0.14em] text-ink">PROMPT STUDIO</span>
    </span>
  )
}
