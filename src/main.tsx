import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/amiri/400.css'
import '@fontsource/amiri/700.css'
import '@fontsource-variable/fraunces/index.css'
import '@fontsource-variable/fraunces/wght-italic.css'
import '@fontsource/instrument-sans/400.css'
import '@fontsource/instrument-sans/500.css'
import '@fontsource/instrument-sans/600.css'
import '@fontsource/noto-nastaliq-urdu/400.css'
import './index.css'
import App from './App.tsx'
import { PrefsProvider } from './state/prefs.tsx'
import { AudioProvider } from './state/audio.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrefsProvider>
      <AudioProvider>
        <App />
      </AudioProvider>
    </PrefsProvider>
  </StrictMode>,
)
