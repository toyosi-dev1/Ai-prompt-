import { createContext, useCallback, useContext, useState } from 'react'
import { AlertCircle, Check } from 'lucide-react'

const ToastContext = createContext(() => {})

let nextId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((items) => items.map((item) => (item.id === id ? { ...item, leaving: true } : item)))
    setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 220)
  }, [])

  const notify = useCallback(
    (message, tone = 'success') => {
      nextId += 1
      const id = nextId
      setToasts((items) => [...items.slice(-2), { id, message, tone, leaving: false }])
      setTimeout(() => dismiss(id), tone === 'error' ? 4800 : 2800)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[70] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((toast) => {
          const Icon = toast.tone === 'error' ? AlertCircle : Check
          return (
            <div
              key={toast.id}
              className={`${toast.leaving ? 'toast-out' : 'toast-in'} pointer-events-auto flex max-w-md items-start gap-3 rounded-lg border border-line-strong bg-raised px-4 py-3 text-sm text-ink shadow-lg`}
            >
              <Icon aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${toast.tone === 'error' ? 'text-danger' : 'text-accent'}`} />
              <span>{toast.message}</span>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
