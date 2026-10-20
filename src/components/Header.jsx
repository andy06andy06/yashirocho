import { useEffect, useState } from 'react'
import { LOCALES, site } from '../lib/content'
import { useLocale } from '../lib/locale'
import { Link } from '../lib/router'

const SECTIONS = [
  ['about', 'nav.about'],
  ['villas', 'nav.villas'],
  ['rules', 'nav.rules'],
  ['contact', 'nav.contact']
]

export function LanguageSwitch({ className = 'lang-switch' }) {
  const { locale, setLocale } = useLocale()
  return (
    <div className={className} role="group" aria-label="Language">
      {LOCALES.map(l => (
        <button
          key={l.code}
          type="button"
          lang={l.html}
          aria-pressed={locale === l.code}
          aria-label={l.name}
          onClick={() => setLocale(l.code)}
        >
          {l.short}
        </button>
      ))}
    </div>
  )
}

export default function Header({ overImage }) {
  const { t } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.body.classList.add('no-scroll')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const tone = overImage && !scrolled && !open ? 'over-image' : 'solid'
  const close = () => setOpen(false)

  return (
    <header className="site-header" data-tone={tone} data-open={open}>
      <Link to="/" className="brand" onClick={close}>
        <img src="/photos/logo/logo-1.png" alt="" width="40" height="40" />
        <span className="brand-name">{site.brand.name}</span>
        <span className="brand-latin">{site.brand.latin}</span>
      </Link>

      <nav id="site-nav" className="site-nav" aria-label={t('nav.menu')}>
        <ul>
          {SECTIONS.map(([id, key]) => (
            <li key={id}><Link to={`/#${id}`} onClick={close}>{t(key)}</Link></li>
          ))}
        </ul>
        <LanguageSwitch />
      </nav>

      <a className="button button-book" href={site.booking_url} target="_blank" rel="noopener noreferrer">
        {t('nav.book')}
      </a>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen(o => !o)}
      >
        <span className="menu-toggle-bars" aria-hidden="true" />
        <span className="visually-hidden">{open ? t('nav.close_menu') : t('nav.menu')}</span>
      </button>
    </header>
  )
}
