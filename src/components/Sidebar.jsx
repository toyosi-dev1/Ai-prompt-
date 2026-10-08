import { useEffect, useRef } from 'react'
import { Bookmark, Github, LayoutTemplate, Moon, Settings, Sparkles, Sun, X } from 'lucide-react'
import Logo from './Logo'
import { PROJECT_URL, VERSION } from '../data/constants'
import { hrefFor } from '../utils/router'

const items = [
  { name: 'studio', label: 'Studio', icon: Sparkles },
  { name: 'prompts', label: 'My Prompts', icon: Bookmark },
  { name: 'templates', label: 'Templates', icon: LayoutTemplate },
  { name: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ current, open, isInert, theme, onToggleTheme, onClose, onNavigate }) {
  const firstLink = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    firstLink.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const ThemeIcon = theme === 'dark' ? Sun : Moon

  return (
    <>
      {open && <div className="overlay fixed inset-0 z-40 bg-black/60 lg:hidden" aria-hidden="true" onClick={onClose} />}
      <aside
        id="site-nav"
        {...(isInert ? { inert: '' } : {})}
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-line bg-panel transition-transform duration-200 ease-out lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <a href={hrefFor('studio')} onClick={onNavigate} className="rounded-md" aria-label="Prompt Studio home">
            <Logo />
          </a>
          <button type="button" className="icon-btn -mr-2 lg:hidden" aria-label="Close navigation menu" onClick={onClose}>
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {items.map(({ name, label, icon: Icon }, index) => {
              const active = current === name
              return (
                <li key={name}>
                  <a
                    ref={index === 0 ? firstLink : undefined}
                    href={hrefFor(name)}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                      active ? 'bg-raised text-ink' : 'text-muted hover:bg-raised/70 hover:text-ink'
                    }`}
                  >
                    {active && <span aria-hidden="true" className="absolute left-0 top-2.5 h-6 w-0.5 rounded-full bg-accent" />}
                    <Icon aria-hidden="true" className={`h-[18px] w-[18px] ${active ? 'text-accent' : ''}`} />
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="space-y-1 border-t border-line p-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted transition-colors hover:bg-raised/70 hover:text-ink"
            aria-label={`Switch to ${nextTheme} theme`}
          >
            <ThemeIcon aria-hidden="true" className="h-[18px] w-[18px]" />
            {theme === 'dark' ? 'Light theme' : 'Dark theme'}
          </button>
          <a
            href={PROJECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center gap-3 rounded-lg px-3 text-sm text-muted transition-colors hover:bg-raised/70 hover:text-ink"
          >
            <Github aria-hidden="true" className="h-[18px] w-[18px]" />
            GitHub project
          </a>
          <p className="px-3 pt-2 text-xs text-muted">AI Prompt Studio v{VERSION}</p>
        </div>
      </aside>
    </>
  )
}
