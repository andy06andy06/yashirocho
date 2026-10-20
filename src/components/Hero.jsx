import { useEffect, useState } from 'react'
import { home, site } from '../lib/content'
import { useLocale } from '../lib/locale'
import Photo from './Photo'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Hero() {
  const { p, t } = useLocale()
  const photos = site.hero?.photos ?? []
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (photos.length < 2 || paused || reducedMotion()) return
    const id = setInterval(() => setCurrent(c => (c + 1) % photos.length), (site.hero.interval_seconds || 6) * 1000)
    return () => clearInterval(id)
  }, [photos.length, paused])

  return (
    <section className="hero" aria-label={site.brand.name}>
      <div className="hero-photos">
        {photos.map((file, i) => (
          <div key={file} className="hero-photo" data-active={i === current} aria-hidden={i !== current}>
            <Photo file={file} eager={i === 0} />
          </div>
        ))}
      </div>
      <h1 className="hero-title display">
        {/* Each clause gets its own line — a column when the title is set vertically. */}
        {p(home.hero.title).split(/(?<=[，。、])\s*|\s+—\s+/).map((line, i) => <span key={i}>{line}</span>)}
      </h1>
      {photos.length > 1 && (
        <div className="hero-dots" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {photos.map((file, i) => (
            <button
              key={file}
              type="button"
              aria-label={t('hero.slide', { n: i + 1 })}
              aria-current={i === current}
              onClick={() => { setCurrent(i); setPaused(true) }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
