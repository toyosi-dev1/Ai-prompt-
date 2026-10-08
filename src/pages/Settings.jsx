import { useState } from 'react'
import { Moon, Sun, Trash2 } from 'lucide-react'
import Modal from '../components/Modal'
import SegmentedControl from '../components/SegmentedControl'
import SelectControl from '../components/SelectControl'
import { useApp } from '../context/AppContext'
import { aspectRatios, promptTypes, visualStyles } from '../data/options'

const themeOptions = [
  { value: 'dark', label: 'Dark', icon: <Moon aria-hidden="true" className="h-4 w-4" /> },
  { value: 'light', label: 'Light', icon: <Sun aria-hidden="true" className="h-4 w-4" /> },
]

function Section({ id, title, description, children }) {
  return (
    <section aria-labelledby={id} className="panel p-5 sm:p-6">
      <h2 id={id} className="text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function Settings() {
  const { preferences, updatePreferences, prompts, clearPrompts } = useApp()
  const [confirming, setConfirming] = useState(false)

  const confirmClear = () => {
    clearPrompts()
    setConfirming(false)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Section id="appearance" title="Appearance" description="Choose how the workspace looks.">
        <SegmentedControl
          legend="Theme"
          name="theme"
          options={themeOptions}
          value={preferences.theme}
          onChange={(theme) => updatePreferences({ theme })}
          className="grid max-w-xs grid-cols-2 gap-2"
        />
      </Section>

      <Section id="preferences" title="Preferences" description="Defaults used when you open a new prompt in Studio.">
        <div className="grid gap-5 sm:grid-cols-3">
          <SelectControl label="Default prompt type" value={preferences.promptType} options={promptTypes} onChange={(promptType) => updatePreferences({ promptType })} />
          <SelectControl label="Default visual style" value={preferences.style} options={visualStyles} onChange={(style) => updatePreferences({ style })} />
          <SelectControl label="Default aspect ratio" value={preferences.aspectRatio} options={aspectRatios} onChange={(aspectRatio) => updatePreferences({ aspectRatio })} />
        </div>
      </Section>

      <Section id="data" title="Data" description="Saved prompts and settings live only in this browser.">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">
            {prompts.length} saved {prompts.length === 1 ? 'prompt' : 'prompts'}
          </p>
          <button type="button" className="btn btn-danger" disabled={prompts.length === 0} onClick={() => setConfirming(true)}>
            <Trash2 aria-hidden="true" className="h-4 w-4" />
            Clear saved prompts
          </button>
        </div>
      </Section>

      {confirming && (
        <Modal title="Clear all saved prompts?" onClose={() => setConfirming(false)}>
          <p className="px-6 pt-2 text-sm leading-6 text-muted">
            This permanently removes {prompts.length} saved {prompts.length === 1 ? 'prompt' : 'prompts'} from this browser. This can’t be undone.
          </p>
          <div className="flex justify-end gap-2 p-6">
            <button type="button" data-autofocus className="btn btn-secondary" onClick={() => setConfirming(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={confirmClear}>
              Clear prompts
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
