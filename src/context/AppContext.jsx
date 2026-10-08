import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useToast } from './ToastContext'
import { loadPreferences, loadPrompts, persistPreferences, persistPrompts } from '../utils/storage'
import { useHashRoute } from '../utils/router'

const AppContext = createContext(null)

const themeColors = { dark: '#0d0c0b', light: '#f5f1ea' }

export function AppProvider({ children }) {
  const { route, navigate } = useHashRoute()
  const notify = useToast()
  const [prompts, setPrompts] = useState(loadPrompts)
  const [preferences, setPreferences] = useState(loadPreferences)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = preferences.theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[preferences.theme])
  }, [preferences.theme])

  const commitPrompts = useCallback(
    (next) => {
      setPrompts(next)
      if (!persistPrompts(next)) notify('Changes could not be stored in this browser.', 'error')
    },
    [notify],
  )

  const savePrompt = useCallback(
    (record) => {
      if (prompts.some((item) => item.text === record.text)) {
        notify('This prompt is already in My Prompts.')
        return
      }
      commitPrompts([record, ...prompts])
      notify('Prompt saved to My Prompts')
    },
    [prompts, commitPrompts, notify],
  )

  const deletePrompt = useCallback(
    (id) => {
      commitPrompts(prompts.filter((item) => item.id !== id))
      notify('Prompt deleted.')
    },
    [prompts, commitPrompts, notify],
  )

  const clearPrompts = useCallback(() => {
    commitPrompts([])
    notify('Saved prompts cleared.')
  }, [commitPrompts, notify])

  const updatePreferences = useCallback(
    (patch, { silent = false } = {}) => {
      const next = { ...preferences, ...patch }
      setPreferences(next)
      if (!persistPreferences(next)) notify('Settings could not be stored in this browser.', 'error')
      else if (!silent) notify('Settings updated.')
    },
    [preferences, notify],
  )

  const toggleTheme = useCallback(
    () => updatePreferences({ theme: preferences.theme === 'dark' ? 'light' : 'dark' }, { silent: true }),
    [preferences.theme, updatePreferences],
  )

  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  const value = useMemo(
    () => ({
      route,
      navigate,
      prompts,
      savePrompt,
      deletePrompt,
      clearPrompts,
      preferences,
      updatePreferences,
      toggleTheme,
      searchOpen,
      openSearch,
      closeSearch,
    }),
    [route, navigate, prompts, savePrompt, deletePrompt, clearPrompts, preferences, updatePreferences, toggleTheme, searchOpen, openSearch, closeSearch],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
