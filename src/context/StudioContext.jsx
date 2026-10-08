import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from './AppContext'
import { defaultSettings, exampleIdeas } from '../data/options'
import { generatePrompt, makeId } from '../utils/promptGenerator'

const StudioContext = createContext(null)

const initialForm = (preferences) => ({
  idea: exampleIdeas[0],
  promptType: preferences.promptType,
  style: preferences.style,
  aspectRatio: preferences.aspectRatio,
  lighting: defaultSettings.lighting,
  composition: defaultSettings.composition,
})

const createResult = (settings, variant = 0) => ({
  id: makeId(),
  variant,
  settings,
  text: generatePrompt({ ...settings, variant }),
})

export function StudioProvider({ children }) {
  const { preferences } = useApp()
  const [form, setForm] = useState(() => initialForm(preferences))
  const [result, setResult] = useState(() => createResult(initialForm(preferences)))
  const firstRun = useRef(true)

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    setForm((current) => ({
      ...current,
      promptType: preferences.promptType,
      style: preferences.style,
      aspectRatio: preferences.aspectRatio,
    }))
  }, [preferences.promptType, preferences.style, preferences.aspectRatio])

  const updateForm = useCallback((patch) => setForm((current) => ({ ...current, ...patch })), [])

  const applyTemplate = useCallback((values) => {
    setForm((current) => ({ ...current, ...values }))
    setResult(null)
  }, [])

  const value = useMemo(() => ({ form, updateForm, applyTemplate, result, setResult }), [form, updateForm, applyTemplate, result])

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
}

export const useStudio = () => useContext(StudioContext)
