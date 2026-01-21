import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme') as Theme
    if (saved === 'light' || saved === 'dark') {
      return saved
    }
    
    // Check system preference
    let initialTheme: Theme = 'dark' // Default
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initialTheme = 'dark'
    } else {
      initialTheme = 'light'
    }
    
    // Save to localStorage if not already set
    localStorage.setItem('theme', initialTheme)
    
    return initialTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    const body = window.document.body
    const rootEl = window.document.getElementById('root')
    
    // Remove both classes first
    root.classList.remove('light', 'dark')
    // Add the current theme class
    root.classList.add(theme)
    root.setAttribute('data-theme', theme)
    root.style.colorScheme = theme
    
    // Force body and root background update
    if (theme === 'dark') {
      body.style.backgroundColor = '#0f172a'
      body.style.color = '#f1f5f9'
      if (rootEl) {
        rootEl.style.backgroundColor = '#0f172a'
      }
    } else {
      body.style.backgroundColor = '#f8fafc'
      body.style.color = '#0f172a'
      if (rootEl) {
        rootEl.style.backgroundColor = '#f8fafc'
      }
    }
    
    // Always update localStorage when theme changes
    localStorage.setItem('theme', theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    setThemeState(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
