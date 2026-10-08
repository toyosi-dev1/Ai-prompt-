import { useId } from 'react'
import { AlertCircle, Image as ImageIcon, Lightbulb, Sparkles, Type, Video } from 'lucide-react'
import SegmentedControl from './SegmentedControl'
import SelectControl from './SelectControl'
import { aspectRatios, compositionOptions, exampleIdeas, lightingOptions, promptTypes, visualStyles } from '../data/options'
import { aspectProfiles } from '../utils/profiles'

const typeIcons = { Image: ImageIcon, Video, Text: Type }

const typeOptions = promptTypes.map((value) => {
  const Icon = typeIcons[value]
  return { value, label: value, icon: <Icon aria-hidden="true" className="h-5 w-5" /> }
})

const ratioOptions = aspectRatios.map((value) => ({ value, label: value, glyph: aspectProfiles[value].glyph }))
const lightingChoices = lightingOptions.map((value) => ({ value, label: value }))

export default function PromptForm({ form, error, loading, onChange, onSubmit }) {
  const ideaId = useId()
  const errorId = useId()

  const showNextExample = () => onChange({ idea: exampleIdeas[(exampleIdeas.indexOf(form.idea) + 1) % exampleIdeas.length] })

  return (
    <form
      className="panel p-5 sm:p-6"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <h2 className="text-lg font-semibold tracking-tight">Build your prompt</h2>
      <label htmlFor={ideaId} className="mt-1 block text-sm text-muted">
        Describe what you want to create.
      </label>

      <div className="mt-4">
        <textarea
          id={ideaId}
          rows={5}
          maxLength={400}
          value={form.idea}
          onChange={(event) => onChange({ idea: event.target.value })}
          placeholder="Describe your creative idea..."
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="field min-h-36 resize-y py-3 leading-6"
        />
        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted">
          <button type="button" className="link-button" onClick={showNextExample}>
            <Lightbulb aria-hidden="true" className="h-3.5 w-3.5" />
            Try an example
          </button>
          <span>{form.idea.length}/400</span>
        </div>
        {error && (
          <p id={errorId} role="alert" className="mt-2 flex items-center gap-2 text-sm text-danger">
            <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
            {error}
          </p>
        )}
      </div>

      <div className="mt-6 space-y-6">
        <SegmentedControl
          legend="Prompt type"
          name="prompt-type"
          variant="card"
          options={typeOptions}
          value={form.promptType}
          onChange={(promptType) => onChange({ promptType })}
          className="grid grid-cols-3 gap-3"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <SelectControl label="Visual style" value={form.style} options={visualStyles} onChange={(style) => onChange({ style })} />
          <SelectControl
            label="Camera / composition"
            value={form.composition}
            options={compositionOptions}
            onChange={(composition) => onChange({ composition })}
          />
        </div>

        <SegmentedControl
          legend="Aspect ratio"
          name="aspect-ratio"
          options={ratioOptions}
          value={form.aspectRatio}
          onChange={(aspectRatio) => onChange({ aspectRatio })}
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        />

        <SegmentedControl
          legend="Lighting"
          name="lighting"
          options={lightingChoices}
          value={form.lighting}
          onChange={(lighting) => onChange({ lighting })}
          className="flex flex-wrap gap-2"
        />
      </div>

      <button
        type="submit"
        aria-disabled={loading}
        className={`btn btn-primary mt-8 h-12 w-full text-base ${loading ? 'btn-loading cursor-wait' : ''}`}
        onClick={(event) => {
          if (loading) event.preventDefault()
        }}
      >
        {loading ? (
          <>
            <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Crafting your prompt...
          </>
        ) : (
          <>
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            Generate Prompt
          </>
        )}
      </button>
    </form>
  )
}
