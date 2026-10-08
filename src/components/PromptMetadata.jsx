export default function PromptMetadata({ items }) {
  return (
    <section aria-labelledby="prompt-structure" className="mt-8">
      <h3 id="prompt-structure" className="text-sm font-semibold">
        Prompt structure
      </h3>
      <dl className="mt-3 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {items.map(({ label, value }) => (
          <div key={label} className="border-t border-line pt-3">
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="mt-1 text-sm text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
