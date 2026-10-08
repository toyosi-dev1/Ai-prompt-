import { useCallback, useEffect, useRef, useState } from 'react'
import { useToast } from '../context/ToastContext'

export const useCopy = () => {
  const notify = useToast()
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), 1800)
        notify('Prompt copied to clipboard.')
        return true
      } catch {
        notify('Copying is blocked in this browser. Select the text and copy it manually.', 'error')
        return false
      }
    },
    [notify],
  )

  return { copied, copy }
}
