import { AppProvider } from './context/AppContext'
import { StudioProvider } from './context/StudioContext'
import { ToastProvider } from './context/ToastContext'
import AppShell from './components/AppShell'

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <StudioProvider>
          <AppShell />
        </StudioProvider>
      </AppProvider>
    </ToastProvider>
  )
}
