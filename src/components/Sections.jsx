// Smaller blocks shared by the home and villa pages.
import { amenities, faq, site, home } from '../lib/content'
import { useLocale } from '../lib/locale'
import { RichText, Stanza } from './Text'
import Mark from './Mark'

export function Booking({ heading, body, label }) {
  const { t } = useLocale()
  return (
    <div className="booking">
      <h2 className="display booking-heading">{heading}</h2>
      <Stanza text={body} />
      <a className="button button-large" href={site.booking_url} target="_blank" rel="noopener noreferrer">
        {label || t('booking.button')}
      </a>
      <p className="booking-hint">{t('booking.hint')}</p>
    </div>
  )
}

export function Faq() {
  const { p } = useLocale()
  return (
    <div className="faq">
      {faq.items.map((item, i) => (
        <details key={i}>
          <summary>{p(item.question)}</summary>
          <RichText text={p(item.answer)} />
        </details>
      ))}
    </div>
  )
}

export function Amenities() {
  const { p } = useLocale()
  return (
    <div className="amenities">
      {amenities.groups.map((group, i) => (
        <section key={i} className="amenity-group">
          <h3>{p(group.name)}</h3>
          <ul>
            {group.items.map((item, j) => (
              <li key={j}>
                <i className={`fa-solid fa-${item.icon}`} aria-hidden="true" />
                {p(item.text)}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export function Contact() {
  const { p, t } = useLocale()
  const c = site.contact
  const rows = [
    ['address', p(c.address), null],
    ['phone', c.phone, `tel:${c.phone}`],
    ['email', c.email, `mailto:${c.email}`],
    ['line', p(c.line.label), c.line.url],
    ['facebook', p(c.facebook.label), c.facebook.url],
    ['instagram', p(c.instagram.label), c.instagram.url]
  ]
  const mapQuery = encodeURIComponent(c.map_query)
  return (
    <div className="contact">
      <dl className="contact-list">
        {rows.map(([key, value, href]) => (
          <div key={key}>
            <dt>{t(`contact.${key}`)}</dt>
            <dd>
              {href
                ? <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{value}</a>
                : value}
            </dd>
          </div>
        ))}
        <div>
          <dt className="visually-hidden">Google Maps</dt>
          <dd>
            <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer">
              {t('contact.directions')}
            </a>
          </dd>
        </div>
      </dl>
      <iframe
        className="contact-map"
        title={t('contact.map_title')}
        src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

export function Footer() {
  const { p, t } = useLocale()
  return (
    <footer className="site-footer">
      <Mark />
      <p className="footer-brand display">{site.brand.name}<span>{site.brand.latin}</span></p>
      <p className="footer-tagline">{p(home.footer.tagline)}</p>
      <p className="footer-keywords">{p(home.footer.keywords)}</p>
      <p className="footer-legal">
        {t('footer.licenses')} {site.licenses.join('、')}
        <br />© {new Date().getFullYear()} {site.brand.name} {site.brand.latin}. {t('footer.rights')}
      </p>
    </footer>
  )
}
