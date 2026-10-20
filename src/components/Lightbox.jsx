import { useEffect, useRef } from 'react'
import { photoSrc, pick } from '../lib/content'
import { useLocale } from '../lib/locale'

export default function Lightbox({ photos, index, onChange, onClose, title }) {
  const { t, locale } = useLocale()
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const photo = photos[index]
  const step = (d) => onChange((index + d + photos.length) % photos.length)

  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus()
    document.body.classList.add('no-scroll')
    return () => {
      document.body.classList.remove('no-scroll')
      previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    // Warm the neighbours so stepping through feels instant.
    ;[1, -1].forEach(d => { new Image().src = photoSrc(photos[(index + d + photos.length) % photos.length].file) })
    return () => window.removeEventListener('keydown', onKey)
  })

  const caption = pick(photo.caption, locale)

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <figure className="lightbox-figure">
        <img key={photo.file} src={photoSrc(photo.file)} alt={caption || `${title} ${index + 1}`} />
        <figcaption>
          <span>{caption}</span>
          <span className="lightbox-count">{index + 1} / {photos.length}</span>
        </figcaption>
      </figure>
      <button type="button" className="lightbox-close" ref={closeRef} onClick={onClose} aria-label={t('lightbox.close')}>
        <i className="fa-solid fa-xmark" aria-hidden="true" />
      </button>
      {photos.length > 1 && (
        <>
          <button type="button" className="lightbox-step prev" onClick={() => step(-1)} aria-label={t('lightbox.prev')}>
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>
          <button type="button" className="lightbox-step next" onClick={() => step(1)} aria-label={t('lightbox.next')}>
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  )
}
