import { useState } from 'react'
import { site, villas } from '../lib/content'
import { useLocale } from '../lib/locale'
import { Link } from '../lib/router'
import Photo from './Photo'

// The aerial photo doubles as the villa index: each building is a link,
// positioned by `map_area` in content/villas/*.yaml.
export default function VillaMap() {
  const { p, t } = useLocale()
  const [active, setActive] = useState(null)
  const hover = (id) => ({
    onMouseEnter: () => setActive(id),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(id),
    onBlur: () => setActive(null)
  })

  return (
    <div className="villa-map">
      <div className="villa-map-figure">
        <Photo file={site.map_photo} sizes="(min-width: 1200px) 1000px, 100vw" />
        {villas.filter(v => v.map_area).map(v => (
          <Link
            key={v.id}
            to={`/villa/${v.id}`}
            className="villa-map-area"
            data-active={active === v.id}
            style={{
              '--villa': v.color?.main,
              left: `${v.map_area.x}%`,
              top: `${v.map_area.y}%`,
              width: `${v.map_area.w}%`,
              height: `${v.map_area.h}%`
            }}
            aria-label={p(v.name)}
            tabIndex={-1}
            {...hover(v.id)}
          >
            <span className="villa-map-label display" aria-hidden="true">{p(v.name)}</span>
          </Link>
        ))}
      </div>

      <ul className="villa-index">
        {villas.map(v => (
          <li key={v.id} style={{ '--villa': v.color?.main }} data-active={active === v.id}>
            <Link to={`/villa/${v.id}`} {...hover(v.id)}>
              <Photo file={v.cover} sizes="96px" className="villa-index-photo" />
              <span className="villa-index-text">
                <span className="villa-index-name display">{p(v.name)}</span>
                <span className="villa-index-meta">
                  {p(v.specs?.[0]?.value)}
                  {v.pets && <> ・ {t('villas.pets_yes')}</>}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="villa-map-hint">{t('villas.map_hint')}</p>
    </div>
  )
}
