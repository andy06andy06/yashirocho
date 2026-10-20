import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { LOCALES, pick, ui } from './content'

const STORAGE_KEY = 'yashirocho_lang'
const LocaleContext = createContext(null)

function initialLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LOCALES.some(l => l.code === saved)) return saved
  } catch { /* storage unavailable */ }
  const browser = navigator.language || ''
  if (browser.startsWith('ja')) return 'ja'
  if (browser.startsWith('en')) return 'en'
  return 'zh'
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(initialLocale)

  useEffect(() => {
    document.documentElement.lang = LOCALES.find(l => l.code === locale).html
    document.documentElement.dataset.locale = locale
  }, [locale])

  const value = useMemo(() => {
    const setLocale = (code) => {
      setLocaleState(code)
      try { localStorage.setItem(STORAGE_KEY, code) } catch { /* storage unavailable */ }
    }
    const p = (field) => pick(field, locale)
    // t('nav.about') or t('hero.slide', { n: 2 }) — looks up content/ui.yaml
    const t = (key, vars) => {
      const field = key.split('.').reduce((node, k) => node?.[k], ui)
      let text = field === undefined ? key : p(field)
      if (vars) for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, v)
      return text
    }
    return { locale, setLocale, p, t }
  }, [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export const useLocale = () => useContext(LocaleContext)
