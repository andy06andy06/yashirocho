import { useEffect } from 'react'
import { findVilla, site } from './lib/content'
import { useLocale } from './lib/locale'
import { matchVilla, scrollToHash, useLocation } from './lib/router'
import Header from './components/Header'
import { Footer } from './components/Sections'
import Home from './pages/Home'
import Villa from './pages/Villa'
import NotFound from './pages/NotFound'

export default function App() {
  const { p } = useLocale()
  const { pathname, hash } = useLocation()
  const villaId = matchVilla(pathname)
  const villa = villaId && findVilla(villaId)
  const isHome = pathname === '/'

  useEffect(() => {
    // Content is rendered client-side, so the browser can't jump to #hash on first load by itself.
    if (hash) scrollToHash(hash)
  }, [])

  useEffect(() => {
    const brand = `${site.brand.name} ${site.brand.latin}`
    document.title = villa ? `${p(villa.name)}｜${brand}` : brand
  }, [villa, p])

  let page = <NotFound />
  if (isHome) page = <Home />
  else if (villa) page = <Villa key={villa.id} villa={villa} />

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header overImage={isHome} />
      <main id="main">{page}</main>
      <Footer />
    </>
  )
}
