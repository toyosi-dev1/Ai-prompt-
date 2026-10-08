import { useEffect, useId, useRef } from 'react'

const focusableSelector = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function Modal({ title, onClose, children, placement = 'center', hideTitle = false }) {
  const panelRef = useRef(null)
  const closeRef = useRef(onClose)
  const titleId = useId()

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const panel = panelRef.current
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const getFocusable = () => Array.from(panel.querySelectorAll(focusableSelector))
    const initial = panel.querySelector('[data-autofocus]') ?? getFocusable()[0] ?? panel
    initial.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const items = getFocusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [])

  return (
    <div
      className={`overlay fixed inset-0 z-[60] flex justify-center bg-black/60 p-4 ${placement === 'top' ? 'items-start pt-[10vh]' : 'items-center'}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="modal-panel w-full max-w-lg rounded-xl border border-line-strong bg-panel shadow-xl"
      >
        <h2 id={titleId} className={hideTitle ? 'sr-only' : 'px-6 pt-6 text-lg font-semibold tracking-tight'}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}
