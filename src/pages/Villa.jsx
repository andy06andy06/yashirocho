import { useState } from 'react'
import { asPhoto, villas } from '../lib/content'
import { useLocale } from '../lib/locale'
import { Link } from '../lib/router'
import Photo from '../components/Photo'
import Lightbox from '../components/Lightbox'
import { Stanza } from '../components/Text'
import { Amenities, Booking } from '../components/Sections'

export default function Villa({ villa }) {
  const { p, t } = useLocale()
  const [open, setOpen] = useState(null)
  const photos = (villa.photos ?? []).map(asPhoto)
  const name = p(villa.name)
  const tags = p(villa.tags) || []
  const others = villas.filter(v => v.id !== villa.id)

  return (
    <article className="villa-page" style={{ '--villa': villa.color?.main, '--villa-tint': villa.color?.tint }}>
      <header className="villa-hero">
        <Link to="/#villas" className="villa-back">{t('villas.back')}</Link>
        <h1 className="villa-name display">{name}</h1>
        <Stanza text={p(villa.concept)} className="stanza villa-concept" />
        <Photo file={villa.cover} eager sizes="(min-width: 900px) 60vw, 100vw" className="villa-cover" />
      </header>

      <section className="villa-facts" aria-label={t('villas.specs')}>
        <dl>
          {(villa.specs ?? []).map((spec, i) => (
            <div key={i}>
              <dt>{p(spec.label)}</dt>
              <dd>{p(spec.value)}</dd>
            </div>
          ))}
          <div>
            <dt>{t('villas.pets_label')}</dt>
            <dd>{villa.pets ? t('villas.pets_yes') : t('villas.pets_no')}</dd>
          </div>
        </dl>
        {tags.length > 0 && <p className="villa-tags">{tags.join('　')}</p>}
      </section>

      {photos.length > 0 && (
        <section className="villa-gallery" aria-label={t('villas.gallery')}>
          <h2 className="section-label">{t('villas.gallery')}</h2>
          <ul>
            {photos.map((photo, i) => (
              <li key={photo.file}>
                <button type="button" onClick={() => setOpen(i)} aria-label={`${t('lightbox.open')} ${i + 1}`}>
                  <Photo file={photo.file} alt={p(photo.caption)} sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 50vw" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="villa-amenities">
        <Amenities />
      </section>

      <section className="villa-booking">
        <Booking heading={name} body={null} label={t('villas.book_this')} />
      </section>

      <nav className="villa-others" aria-label={t('villas.others')}>
        <h2 className="section-label">{t('villas.others')}</h2>
        <ul>
          {others.map(v => (
            <li key={v.id} style={{ '--villa': v.color?.main }}>
              <Link to={`/villa/${v.id}`}>
                <Photo file={v.cover} sizes="(min-width: 900px) 30vw, 90vw" />
                <span className="display">{p(v.name)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open !== null && (
        <Lightbox photos={photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} title={name} />
      )}
    </article>
  )
}
