import { aspectRatios, defaultSettings, promptTypes, visualStyles } from '../data/options'
import { buildSamplePrompts } from './samples'

const PROMPTS_KEY = 'prompt-studio:prompts'
const PREFERENCES_KEY = 'prompt-studio:preferences'

const readJson = (key) => {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? null : JSON.parse(raw)
  } catch {
    return null
  }
}

const writeJson = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

const isPromptRecord = (item) =>
  Boolean(item) && typeof item === 'object' && typeof item.id === 'string' && typeof item.text === 'string' && typeof item.title === 'string'

export const loadPrompts = () => {
  const stored = readJson(PROMPTS_KEY)
  if (Array.isArray(stored)) return stored.filter(isPromptRecord)
  const samples = buildSamplePrompts()
  writeJson(PROMPTS_KEY, samples)
  return samples
}

export const persistPrompts = (prompts) => writeJson(PROMPTS_KEY, prompts)

export const defaultPreferences = {
  theme: 'dark',
  promptType: defaultSettings.promptType,
  style: defaultSettings.style,
  aspectRatio: defaultSettings.aspectRatio,
}

const pickValid = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback)

export const loadPreferences = () => {
  const stored = readJson(PREFERENCES_KEY) ?? {}
  return {
    theme: stored.theme === 'light' ? 'light' : 'dark',
    promptType: pickValid(stored.promptType, promptTypes, defaultPreferences.promptType),
    style: pickValid(stored.style, visualStyles, defaultPreferences.style),
    aspectRatio: pickValid(stored.aspectRatio, aspectRatios, defaultPreferences.aspectRatio),
  }
}

export const persistPreferences = (preferences) => writeJson(PREFERENCES_KEY, preferences)
