import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import SegmentedControl from '../components/SegmentedControl'
import TemplateCard from '../components/TemplateCard'
import { useApp } from '../context/AppContext'
import { useStudio } from '../context/StudioContext'
import { useToast } from '../context/ToastContext'
import { templateCategories, templates } from '../data/templates'

const categoryOptions = ['All', ...templateCategories].map((value) => ({ value, label: value }))

export default function Templates({ params }) {
  const { navigate } = useApp()
  const { applyTemplate } = useStudio()
  const notify = useToast()
  const [category, setCategory] = useState('All')
  const query = (params.q ?? '').trim().toLowerCase()

  const visible = useMemo(
    () =>
      templates.filter((template) => {
        const matchesCategory = category === 'All' || template.category === category
        const matchesQuery = !query || `${template.title} ${template.description} ${template.form.style}`.toLowerCase().includes(query)
        return matchesCategory && matchesQuery
      }),
    [category, query],
  )

  const handleUseTemplate = (template) => {
    applyTemplate(template.form)
    navigate('studio')
    notify(`${template.title} loaded into Studio.`)
  }

  return (
    <div>
      <SegmentedControl
        legend="Template category"
        hideLegend
        name="template-category"
        options={categoryOptions}
        value={category}
        onChange={setCategory}
        className="flex flex-wrap gap-2"
      />

      {query && (
        <p className="mt-4 text-sm text-muted">
          Showing results for “{params.q}”.{' '}
          <button type="button" className="link-button" onClick={() => navigate('templates')}>
            Clear search
          </button>
        </p>
      )}

      {visible.length === 0 ? (
        <div className="panel mt-6 flex flex-col items-center px-6 py-16 text-center">
          <SearchX aria-hidden="true" className="h-6 w-6 text-muted" />
          <h2 className="mt-4 text-lg font-semibold tracking-tight">No templates match</h2>
          <p className="mt-2 text-sm text-muted">Choose another category or clear your search.</p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((template) => (
            <li key={template.id}>
              <TemplateCard template={template} onUse={handleUseTemplate} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
