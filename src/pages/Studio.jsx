import { useCallback, useEffect, useRef, useState } from 'react'
import PromptForm from '../components/PromptForm'
import PromptOutput from '../components/PromptOutput'
import { useApp } from '../context/AppContext'
import { useStudio } from '../context/StudioContext'
import { createPromptRecord, generatePrompt, makeId } from '../utils/promptGenerator'

const GENERATION_DELAY = 1000

export default function Studio() {
  const { form, updateForm, result, setResult } = useStudio()
  const { prompts, savePrompt } = useApp()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const timer = useRef(null)
  const outputRef = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleChange = useCallback(
    (patch) => {
      if (patch.idea !== undefined) setError('')
      updateForm(patch)
    },
    [updateForm],
  )

  const handleGenerate = () => {
    if (!form.idea.trim()) {
      setError('Add an idea to generate a prompt.')
      return
    }
    setError('')
    setLoading(true)
    const settings = { ...form }
    timer.current = setTimeout(() => {
      setResult({ id: makeId(), variant: 0, settings, text: generatePrompt({ ...settings, variant: 0 }) })
      setLoading(false)
      if (window.matchMedia('(max-width: 1279px)').matches) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        outputRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      }
    }, GENERATION_DELAY)
  }

  const handleRegenerate = useCallback(() => {
    if (!result) return
    let variant = result.variant
    let text = result.text
    for (let attempt = 0; attempt < 6 && text === result.text; attempt += 1) {
      variant += 1
      text = generatePrompt({ ...result.settings, variant })
    }
    setResult({ ...result, id: makeId(), variant, text })
  }, [result, setResult])

  const handleSave = useCallback(() => {
    if (result) savePrompt(createPromptRecord({ text: result.text, settings: result.settings }))
  }, [result, savePrompt])

  const isSaved = Boolean(result) && prompts.some((item) => item.text === result.text)

  return (
    <div className="grid items-start gap-6 xl:grid-cols-2 xl:gap-8">
      <PromptForm form={form} error={error} loading={loading} onChange={handleChange} onSubmit={handleGenerate} />
      <div ref={outputRef} className="scroll-mt-4">
        <PromptOutput result={result} loading={loading} isSaved={isSaved} onSave={handleSave} onRegenerate={handleRegenerate} />
        <p role="status" className="sr-only">
          {loading ? 'Crafting your prompt...' : ''}
        </p>
      </div>
    </div>
  )
}
