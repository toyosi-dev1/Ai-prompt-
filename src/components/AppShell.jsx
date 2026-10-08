import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Studio from '../pages/Studio'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { DEFAULT_TITLE } from '../data/constants'
import { useMediaQuery } from '../utils/useMediaQuery'

const MyPrompts = lazy(() => import('../pages/MyPrompts'))
const Templates = lazy(() => import('../pages/Templates'))
const Settings = lazy(() => import('../pages/Settings'))
const SearchModal = lazy(() => import('./SearchModal'))

const pages = { studio: Studio, prompts: MyPrompts, templates: Templates, settings: Settings }

const pageMeta = {
  studio: { title: 'AI Prompt Studio', subtitle: 'Turn rough ideas into production-ready AI prompts.' },
  prompts: { title: 'My Prompts', subtitle: 'Your saved creative prompts.' },
  templates: { title: 'Templates', subtitle: 'Start from a proven creative direction.' },
  settings: { title: 'Settings', subtitle: 'Tune the workspace to the way you work.' },
}

export default function AppShell() {
  const { route, preferences, toggleTheme, searchOpen, openSearch, closeSearch } = useApp()
  const notify = useToast()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const mainRef = useRef(null)
  const firstRender = useRef(true)

  useEffect(() => {
    if (isDesktop) setMenuOpen(false)
  }, [isDesktop])

  useEffect(() => {
    document.title = route.name === 'studio' ? DEFAULT_TITLE : `${pageMeta[route.name].title} — AI Prompt Studio`
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    mainRef.current?.focus({ preventScroll: true })
    window.scrollTo(0, 0)
  }, [route.name])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        openSearch()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [openSearch])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  const handleNavigate = useCallback(() => setMenuOpen(false), [])

  const Page = pages[route.name]
  const { title, subtitle } = pageMeta[route.name]

  return (
    <div className="min-h-screen">
      <button type="button" className="skip-link" onClick={() => mainRef.current?.focus()}>
        Skip to content
      </button>
      <Sidebar
        current={route.name}
        open={menuOpen}
        isInert={!isDesktop && !menuOpen}
        theme={preferences.theme}
        onToggleTheme={toggleTheme}
        onClose={closeMenu}
        onNavigate={handleNavigate}
      />
      <div className="lg:pl-60">
        <Header
          title={title}
          subtitle={subtitle}
          menuOpen={menuOpen}
          menuButtonRef={menuButtonRef}
          onMenu={() => setMenuOpen(true)}
          onSearch={openSearch}
          onNotifications={() => notify('No new notifications.')}
        />
        <main id="main" ref={mainRef} tabIndex={-1} className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pt-8">
          <Suspense fallback={<div className="min-h-[60vh]" role="status" aria-label="Loading page" />}>
            <Page params={route.params} />
          </Suspense>
        </main>
      </div>
      {searchOpen && (
        <Suspense fallback={null}>
          <SearchModal onClose={closeSearch} />
        </Suspense>
      )}
    </div>
  )
}
