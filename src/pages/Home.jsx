import { home } from '../lib/content'
import { useLocale } from '../lib/locale'
import Hero from '../components/Hero'
import Photo from '../components/Photo'
import VillaMap from '../components/VillaMap'
import Mark from '../components/Mark'
import { Stanza } from '../components/Text'
import { Booking, Contact, Faq } from '../components/Sections'

// A titled section: the heading sits in its own column (set vertically for zh/ja on wide screens).
function Chapter({ id, heading, className = '', children }) {
  return (
    <section id={id} className={`chapter ${className}`}>
      {heading && <h2 className="chapter-heading display">{heading}</h2>}
      <div className="chapter-body">{children}</div>
    </section>
  )
}

export default function Home() {
  const { p, t } = useLocale()

  return (
    <>
      <Hero />

      <section className="prelude">
        <Mark />
        <Stanza text={p(home.prelude.body)} className="stanza prelude-text" />
      </section>

      <Chapter id="about" heading={p(home.story.heading)} className="story">
        <Stanza text={p(home.story.body)} />
        <div className="story-photos">
          {home.story.photos.map((file, i) => (
            <Photo key={file} file={file} sizes={i === 0 ? '(min-width: 900px) 40vw, 90vw' : '(min-width: 900px) 20vw, 45vw'} />
          ))}
        </div>
      </Chapter>

      <Chapter heading={p(home.philosophy.heading)} className="philosophy">
        <Photo file={home.philosophy.photo} sizes="(min-width: 900px) 50vw, 100vw" className="philosophy-photo" />
        <Stanza text={p(home.philosophy.body)} />
      </Chapter>

      <Chapter heading={p(home.features.heading)} className="features">
        <ul className="feature-list">
          {home.features.items.map((item, i) => (
            <li key={i}>
              <h3 className="display">{p(item.title)}</h3>
              <p>{p(item.body)}</p>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter id="villas" heading={p(home.villas.heading)} className="villas">
        <Stanza text={p(home.villas.body)} />
        <VillaMap />
      </Chapter>

      <section className="quote">
        <blockquote className="display">
          <Stanza text={p(home.quote.lines)} className="quote-lines" />
        </blockquote>
      </section>

      <Chapter heading={p(home.pet.heading)} className="pet">
        <Stanza text={p(home.pet.body)} />
        <Photo file={home.pet.photo} sizes="(min-width: 900px) 45vw, 100vw" className="pet-photo" />
      </Chapter>

      <section id="booking" className="booking-band">
        <Booking heading={p(home.booking.heading)} body={p(home.booking.body)} />
      </section>

      <Chapter id="rules" heading={t('rules.heading')} className="rules">
        <Faq />
      </Chapter>

      <Chapter id="contact" heading={t('contact.heading')} className="contact-chapter">
        <Contact />
      </Chapter>
    </>
  )
}
