import { useLocale } from '../lib/locale'
import { Link } from '../lib/router'

export default function NotFound() {
  const { t } = useLocale()
  return (
    <section className="not-found">
      <h1 className="display">{t('not_found.heading')}</h1>
      <p>{t('not_found.body')}</p>
      <Link to="/" className="button">{t('nav.home')}</Link>
    </section>
  )
}
