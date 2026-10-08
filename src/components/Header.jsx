import { Bell, Menu, Search, User } from 'lucide-react'

export default function Header({ title, subtitle, menuOpen, menuButtonRef, onMenu, onSearch, onNotifications }) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10 lg:py-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-btn -ml-2 shrink-0 lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={onMenu}
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl lg:text-[1.75rem]">{title}</h1>
            <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" className="icon-btn" aria-label="Search prompts and templates" title="Search (Ctrl+K)" onClick={onSearch}>
            <Search aria-hidden="true" className="h-5 w-5" />
          </button>
          <button type="button" className="icon-btn" aria-label="Notifications" onClick={onNotifications}>
            <Bell aria-hidden="true" className="h-5 w-5" />
          </button>
          <div role="img" aria-label="Profile" className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-raised text-muted">
            <User aria-hidden="true" className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  )
      }
