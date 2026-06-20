import React, { useState, useEffect, useRef } from 'react'
import { locales, translatePhoto } from './locales'


// --- Helper for villa specs ---
const getVillaSpecs = (villaId, locale) => {
  const specsData = {
    red: {
      zh: [
        { icon: 'fa-solid fa-users', label: '適合人數', value: '12 ~ 15 人' },
        { icon: 'fa-solid fa-stairs', label: '別墅樓層', value: '5 層樓獨棟空間' },
        { icon: 'fa-solid fa-door-open', label: '房型格局', value: '1 間四人房 + 4 間雙人房' }
      ],
      en: [
        { icon: 'fa-solid fa-users', label: 'Capacity', value: '12 ~ 15 Guests' },
        { icon: 'fa-solid fa-stairs', label: 'Floors', value: '5-Story Detached Villa' },
        { icon: 'fa-solid fa-door-open', label: 'Layout', value: '1 Quad Room + 4 Double Rooms' }
      ],
      ja: [
        { icon: 'fa-solid fa-users', label: '定員', value: '12 〜 15 名' },
        { icon: 'fa-solid fa-stairs', label: '階数', value: '5階建て一棟貸し' },
        { icon: 'fa-solid fa-door-open', label: '間取り', value: '4人部屋 1室 + ダブルルーム 4室' }
      ]
    },
    shadow: {
      zh: [
        { icon: 'fa-solid fa-users', label: '適合人數', value: '12 ~ 15 人' },
        { icon: 'fa-solid fa-stairs', label: '別墅樓層', value: '5 層樓獨棟空間' },
        { icon: 'fa-solid fa-door-open', label: '房型格局', value: '1 間四人房 + 4 間雙人房' }
      ],
      en: [
        { icon: 'fa-solid fa-users', label: 'Capacity', value: '12 ~ 15 Guests' },
        { icon: 'fa-solid fa-stairs', label: 'Floors', value: '5-Story Detached Villa' },
        { icon: 'fa-solid fa-door-open', label: 'Layout', value: '1 Quad Room + 4 Double Rooms' }
      ],
      ja: [
        { icon: 'fa-solid fa-users', label: '定員', value: '12 〜 15 名' },
        { icon: 'fa-solid fa-stairs', label: '階数', value: '5階建て一棟貸し' },
        { icon: 'fa-solid fa-door-open', label: '間取り', value: '4人部屋 1室 + ダブルルーム 4室' }
      ]
    },
    wood: {
      zh: [
        { icon: 'fa-solid fa-users', label: '適合人數', value: '12 ~ 15 人' },
        { icon: 'fa-solid fa-stairs', label: '別墅樓層', value: '5 層樓獨棟空間' },
        { icon: 'fa-solid fa-door-open', label: '房型格局', value: '1 間四人房 + 4 間雙人房' }
      ],
      en: [
        { icon: 'fa-solid fa-users', label: 'Capacity', value: '12 ~ 15 Guests' },
        { icon: 'fa-solid fa-stairs', label: 'Floors', value: '5-Story Detached Villa' },
        { icon: 'fa-solid fa-door-open', label: 'Layout', value: '1 Quad Room + 4 Double Rooms' }
      ],
      ja: [
        { icon: 'fa-solid fa-users', label: '定員', value: '12 〜 15 名' },
        { icon: 'fa-solid fa-stairs', label: '階数', value: '5階建て一棟貸し' },
        { icon: 'fa-solid fa-door-open', label: '間取り', value: '4人部屋 1室 + ダブルルーム 4室' }
      ]
    },
    gold: {
      zh: [
        { icon: 'fa-solid fa-users', label: '適合人數', value: '14 ~ 18 人' },
        { icon: 'fa-solid fa-stairs', label: '別墅樓層', value: '5 層樓獨棟空間' },
        { icon: 'fa-solid fa-door-open', label: '房型格局', value: '1 間四人房 + 5 間雙人房' }
      ],
      en: [
        { icon: 'fa-solid fa-users', label: 'Capacity', value: '14 ~ 18 Guests' },
        { icon: 'fa-solid fa-stairs', label: 'Floors', value: '5-Story Detached Villa' },
        { icon: 'fa-solid fa-door-open', label: 'Layout', value: '1 Quad Room + 5 Double Rooms' }
      ],
      ja: [
        { icon: 'fa-solid fa-users', label: '定員', value: '14 〜 18 名' },
        { icon: 'fa-solid fa-stairs', label: '階数', value: '5階建て一棟貸し' },
        { icon: 'fa-solid fa-door-open', label: '間取り', value: '4人部屋 1室 + ダブルルーム 5室' }
      ]
    }
  };
  return specsData[villaId]?.[locale] || specsData[villaId]?.['zh'] || [];
};

// 🏰 Sub-component representing a single Villa block (slideshow on one side, details on other)
function VillaShowcaseBlock({ villa, photos, t, openLightbox, isEven, locale }) {
  const [photoIdx, setPhotoIdx] = useState(0)

  const villaPhotos = photos
    .filter(p => p.id !== undefined && villa.photoIds?.includes(p.id))
    .map(p => translatePhoto(p, locale))

  const handlePrevPhoto = (e) => {
    e.stopPropagation()
    if (villaPhotos.length > 0) {
      setPhotoIdx(prev => (prev - 1 + villaPhotos.length) % villaPhotos.length)
    }
  }

  const handleNextPhoto = (e) => {
    e.stopPropagation()
    if (villaPhotos.length > 0) {
      setPhotoIdx(prev => (prev + 1) % villaPhotos.length)
    }
  }

  const handleDotClick = (idx, e) => {
    e.stopPropagation()
    setPhotoIdx(idx)
  }

  const currentPhoto = villaPhotos[photoIdx]
  const villaSpecs = getVillaSpecs(villa.id, locale)

  return (
    <div className={`villa-block theme-${villa.id} reveal-on-scroll`}>
      <div className={`villa-block-grid ${isEven ? 'layout-normal' : 'layout-reversed'}`}>
        
        {/* Carousel Column */}
        <div className="villa-carousel-col">
          {villaPhotos.length > 0 ? (
            <div className="villa-carousel-wrapper">
              <div 
                className="villa-carousel-image-container"
                onClick={() => openLightbox(currentPhoto?.id, villa.id)}
              >
                <span className="villa-carousel-badge">
                  {currentPhoto?.category === 'room' || currentPhoto?.category === 'interior' 
                    ? t('rooms.cardBadgeRoom') 
                    : t('rooms.cardBadgeDetail')
                  }
                </span>
                <div className="villa-carousel-overlay">
                  <i className="fa-solid fa-maximize"></i>
                  <span>{locale === 'en' ? 'Enlarge' : locale === 'ja' ? '拡大する' : '放大實景'}</span>
                </div>
                <img 
                  src={currentPhoto?.large ? encodeURI(currentPhoto.large) : ''} 
                  alt={currentPhoto?.title} 
                  className="villa-carousel-img"
                  loading="lazy"
                />
                
                <div className="villa-carousel-caption">
                  <h3>{currentPhoto?.title}</h3>
                </div>
              </div>

              <button 
                className="villa-carousel-arrow arrow-left"
                onClick={handlePrevPhoto}
                aria-label="上一張"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button 
                className="villa-carousel-arrow arrow-right"
                onClick={handleNextPhoto}
                aria-label="下一張"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>

              <div className="villa-carousel-dots">
                {villaPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    className={`villa-carousel-dot ${photoIdx === idx ? 'active' : ''}`}
                    onClick={(e) => handleDotClick(idx, e)}
                    aria-label={`切換至第 ${idx + 1} 張`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="villa-carousel-placeholder">
              <i className="fa-regular fa-image"></i>
              <span>{locale === 'en' ? 'Loading photos...' : locale === 'ja' ? '写真読み込み中...' : '照片讀取中...'}</span>
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="villa-content-col">
          <div className="villa-block-header">
            <div className="villa-name-row">
              <span className="villa-number">{villa.number}</span>
              <h3 className="villa-title">{villa.name}</h3>
            </div>
          </div>

          {/* 📋 Villa Basic Specifications */}
          <div className="villa-specs-container">
            {villaSpecs.map((spec, idx) => (
              <div key={idx} className="villa-spec-item">
                <div className="villa-spec-info">
                  <span className="villa-spec-label">{spec.label}</span>
                  <span className="villa-spec-value">{spec.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default function App() {
  // --- Language Initialization & Helper ---
  const getInitialLocale = () => {
    const saved = localStorage.getItem('yashirocho_lang')
    if (saved && ['zh', 'en', 'ja'].includes(saved)) {
      return saved
    }
    const browserLang = navigator.language || navigator.userLanguage || ''
    if (browserLang.startsWith('ja')) return 'ja'
    if (browserLang.startsWith('en')) return 'en'
    return 'zh'
  }

  const [locale, setLocale] = useState(getInitialLocale)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)

  const changeLocale = (newLocale) => {
    setLocale(newLocale)
    localStorage.setItem('yashirocho_lang', newLocale)
    setIsLangDropdownOpen(false)
  }

  // Translation helper supporting nested keys (e.g. t('about.title'))
  const t = (keyPath) => {
    const keys = keyPath.split('.')
    let obj = locales[locale]
    for (const key of keys) {
      if (obj && obj[key] !== undefined) {
        obj = obj[key]
      } else {
        // Fallback to Traditional Chinese
        let fallbackObj = locales['zh']
        for (const fk of keys) {
          if (fallbackObj && fallbackObj[fk] !== undefined) {
            fallbackObj = fallbackObj[fk]
          } else {
            return keyPath
          }
        }
        return fallbackObj
      }
    }
    return obj
  }

  // --- States ---
  const [photos, setPhotos] = useState([])
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Refs for layout
  const storyContainerRef = useRef(null)
  const quoteContainerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const container = storyContainerRef.current
      if (container) {
        const rect = container.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        if (rect.top < viewportHeight && rect.bottom > 0) {
          const containerCenter = rect.top + rect.height / 2
          const viewportCenter = viewportHeight / 2
          const offset = containerCenter - viewportCenter
          container.style.setProperty('--scroll-offset', `${offset}px`)
        }
      }

      const quoteContainer = quoteContainerRef.current
      if (quoteContainer) {
        const rect = quoteContainer.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        if (rect.top < viewportHeight && rect.bottom > 0) {
          const containerCenter = rect.top + rect.height / 2
          const viewportCenter = viewportHeight / 2
          const offset = containerCenter - viewportCenter
          quoteContainer.style.setProperty('--quote-scroll-offset', `${offset}px`)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hero Slider
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroSlides = [
    'photos/封面/_CCN3683.JPG',
    'photos/封面/_CCN3692.JPG',
    'photos/封面/dji_fly_20260114_125700_0004_1768396454384_photo.JPG',
    'photos/封面/dji_fly_20260114_130714_0008_1768395781247_photo.JPG'
  ]

  // Lightbox States
  const [lightboxActive, setLightboxActive] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxLoaded, setLightboxLoaded] = useState(false)
  const [lightboxVillaId, setLightboxVillaId] = useState('red')

  // Slide orientations detection
  const [slideOrientations, setSlideOrientations] = useState({})
  useEffect(() => {
    heroSlides.forEach(url => {
      const img = new Image()
      img.onload = () => {
        const orientation = img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape'
        setSlideOrientations(prev => ({ ...prev, [url]: orientation }))
      }
      img.src = url
    })
  }, [])

  // FAQ Active Accordion
  const [activeFaq, setActiveFaq] = useState(null)

  // --- FAQ Data & Villas Data dynamically retrieved from dictionary ---
  const villas = locales[locale]?.villas || locales['zh'].villas
  const faqData = locales[locale]?.faq || locales['zh'].faq

  // Active Section Highlights
  const [activeSection, setActiveSection] = useState('home')

  // --- Effects ---

  // 1. Fetch Photo Manifest on mount with cache buster
  useEffect(() => {
    fetch(`/photos_manifest.json?t=${new Date().getTime()}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load photos')
        return res.json()
      })
      .then(data => {
        setPhotos(data)
      })
      .catch(err => {
        console.error('Error fetching photos manifest:', err)
      })
  }, [])

  // 2. Scroll event listeners (sticky nav + scroll reveal trigger)
  useEffect(() => {
    const handleScroll = () => {
      // Sticky header state
      setIsNavScrolled(window.scrollY > 50)

      // Section highlighting
      const sections = ['home', 'about', 'rooms', 'booking-system', 'rules', 'contact']
      const scrollPos = window.scrollY + 200

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }

      // Simple scroll reveal triggers
      const reveals = document.querySelectorAll('.reveal-on-scroll')
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top <= (window.innerHeight - 50)
        if (isVisible) {
          el.classList.add('active-scroll')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    setTimeout(handleScroll, 500)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 3. Hero slide rotation (6s interval)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // 4. Click outside to close language dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isLangDropdownOpen && !e.target.closest('.lang-switcher-container')) {
        setIsLangDropdownOpen(false)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [isLangDropdownOpen])

  // 5. Click outside to close mobile hamburger menu drawer
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-toggle')) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // --- Functions ---

  // Derive active lightbox photos based on lightboxVillaId (supporting swiping through that villa's photos)
  const lightboxVillaObj = villas.find(v => v.id === lightboxVillaId) || villas[0]
  const lightboxPhotos = photos
    .filter(p => p.id !== undefined && lightboxVillaObj.photoIds?.includes(p.id))
    .map(p => translatePhoto(p, locale))

  // Lightbox handlers (maps to the specific villa's photo list)
  const openLightbox = (photoId, villaId) => {
    setLightboxVillaId(villaId)
    const villaObj = villas.find(v => v.id === villaId) || villas[0]
    const villaPhotosList = photos
      .filter(p => p.id !== undefined && villaObj.photoIds?.includes(p.id))
      .map(p => translatePhoto(p, locale))
    const idx = villaPhotosList.findIndex(p => p.id === photoId)
    if (idx !== -1) {
      setLightboxIndex(idx)
      setLightboxLoaded(false)
      setLightboxActive(true)
      document.body.style.overflow = 'hidden'
    }
  }

  const closeLightbox = () => {
    setLightboxActive(false)
    document.body.style.overflow = ''
  }

  const nextLightbox = () => {
    setLightboxLoaded(false)
    setLightboxIndex(prev => (prev + 1) % lightboxPhotos.length)
  }

  const prevLightbox = () => {
    setLightboxLoaded(false)
    setLightboxIndex(prev => (prev - 1 + lightboxPhotos.length) % lightboxPhotos.length)
  }

  // Preload lightbox images
  useEffect(() => {
    if (lightboxActive && lightboxPhotos[lightboxIndex]) {
      const img = new Image()
      img.src = encodeURI(lightboxPhotos[lightboxIndex].large)
      img.onload = () => setLightboxLoaded(true)
    }
  }, [lightboxIndex, lightboxActive, lightboxPhotos])

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxActive) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextLightbox()
      if (e.key === 'ArrowLeft') prevLightbox()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxActive, lightboxPhotos, lightboxIndex])

  // FAQ toggle accordion
  const toggleFaq = (idx) => {
    setActiveFaq(prev => prev === idx ? null : idx)
  }

  return (
    <>
      {/* 🧭 Floating Glassmorphism Navigation Bar */}
      <header className={`main-header ${isNavScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="header-container">
          <a href="#home" className="logo" onClick={() => setIsMenuOpen(false)}>
            <div className="logo-img-wrapper">
              <img src="photos/logo/logo-1.png" alt="八代町 Logo" className="logo-img" />
            </div>
            <div className="logo-text">
              <span className="logo-zh">{t('nav.logoZh')}</span>
              <span className="logo-en">{t('nav.logoEn')}</span>
            </div>
          </a>

          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li>
                <a
                  href="#about"
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a
                  href="#rooms"
                  className={`nav-link ${activeSection === 'rooms' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.rooms')}
                </a>
              </li>
              <li>
                <a
                  href="#booking-system"
                  className={`nav-link ${activeSection === 'booking-system' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.booking')}
                </a>
              </li>
              <li>
                <a
                  href="#rules"
                  className={`nav-link ${activeSection === 'rules' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.rules')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.contact')}
                </a>
              </li>

              {/* 🌐 Mobile Drawer Language Selector */}
              <li className="mobile-lang-switcher">
                <div className="mobile-lang-label">
                  <i className="fa-solid fa-globe"></i>
                  <span>Language</span>
                </div>
                <div className="mobile-lang-options">
                  <button
                    className={`mobile-lang-btn ${locale === 'zh' ? 'active' : ''}`}
                    onClick={() => {
                      changeLocale('zh')
                      setIsMenuOpen(false)
                    }}
                  >
                    繁中
                  </button>
                  <span className="lang-separator">|</span>
                  <button
                    className={`mobile-lang-btn ${locale === 'en' ? 'active' : ''}`}
                    onClick={() => {
                      changeLocale('en')
                      setIsMenuOpen(false)
                    }}
                  >
                    EN
                  </button>
                  <span className="lang-separator">|</span>
                  <button
                    className={`mobile-lang-btn ${locale === 'ja' ? 'active' : ''}`}
                    onClick={() => {
                      changeLocale('ja')
                      setIsMenuOpen(false)
                    }}
                  >
                    日本語
                  </button>
                </div>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            {/* 🌐 Desktop Glassmorphism Language Selector */}
            <div className="lang-switcher-container">
              <button
                className="lang-switcher-trigger"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                aria-label="Select Language"
              >
                <i className="fa-solid fa-globe"></i>
                <span>{locale === 'zh' ? '繁中' : locale === 'en' ? 'EN' : '日本語'}</span>
                <i className={`fa-solid fa-chevron-down chevron-icon ${isLangDropdownOpen ? 'open' : ''}`}></i>
              </button>
              {isLangDropdownOpen && (
                <ul className="lang-dropdown-menu">
                  <li>
                    <button
                      className={locale === 'zh' ? 'active' : ''}
                      onClick={() => changeLocale('zh')}
                    >
                      繁體中文
                    </button>
                  </li>
                  <li>
                    <button
                      className={locale === 'en' ? 'active' : ''}
                      onClick={() => changeLocale('en')}
                    >
                      English
                    </button>
                  </li>
                  <li>
                    <button
                      className={locale === 'ja' ? 'active' : ''}
                      onClick={() => changeLocale('ja')}
                    >
                      日本語
                    </button>
                  </li>
                </ul>
              )}
            </div>

            <a
              href="https://www.booking-owlnest.com/bfc5e404-4e82-4ecc-8d9d-0869bd730a7b?lang=zh_TW&adult=1&child=0&infant=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary nav-cta-btn"
            >
              {t('nav.cta')}
            </a>
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="開啟選單"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 📍 Section 1: Hero Slider (首頁) */}
        <section className="hero-section" id="home">
          <div className="hero-slider">
            {heroSlides.map((slide, idx) => {
              const isPortrait = slideOrientations[slide] === 'portrait';
              return (
                <div
                  key={idx}
                  className={`slide ${currentSlide === idx ? 'active' : ''} ${isPortrait ? 'is-portrait' : 'is-landscape'}`}
                  style={{ backgroundImage: !isPortrait ? `url('${slide}')` : 'none' }}
                >
                  {isPortrait && (
                    <>
                      <div className="slide-blur-bg" style={{ backgroundImage: `url('${slide}')` }}></div>
                      <div className="slide-contain-fg" style={{ backgroundImage: `url('${slide}')` }}></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="hero-overlay"></div>

          <div className="hero-content-wrapper">
            <div className="hero-content">
              <h1 className="hero-title">{t('hero.title')}</h1>
            </div>
          </div>

          <div className="scroll-indicator">
            <span className="mouse">
              <span className="wheel"></span>
            </span>
            <span className="scroll-text">{t('hero.scrollText')}</span>
          </div>
        </section>

        {/* 📍 Section 2: 關於八代町 (About) */}
        <section className="story-section" id="about">
          <div className="container">
            <div className="story-grid">
              <div 
                className="story-image-group story-parallax-container reveal-on-scroll"
                ref={storyContainerRef}
              >
                
                {/* Card A: Center base */}
                <div className="parallax-card card-main">
                  <img src="photos/about/IMG_2339.HEIC" alt="八代町物業實景 - 主外觀" />
                </div>
                
                {/* Card B: Top right overlap */}
                <div className="parallax-card card-sub-tr">
                  <img src="photos/large/_CCN3744.webp" alt="八代町物業實景 - 主外觀" />
                </div>
                
                {/* Card C: Bottom left overlap */}
                <div className="parallax-card card-sub-bl">
                  <img src="photos/large/_CCN3737.webp" alt="八代町物業實景 - 日式室內美學" />
                </div>

                {/* Card D: Top left overlap */}
                <div className="parallax-card card-sub-tl">
                  <img src="photos/large/_CCN3752.webp" alt="八代町物業實景 - 愜意茶空間" />
                </div>

                {/* Card E: Bottom right overlap */}
                <div className="parallax-card card-sub-br">
                  <img src="photos/large/_CCN3760.webp" alt="八代町物業實景 - 景觀露台與山景" />
                </div>
              </div>

              <div className="story-content reveal-on-scroll">
                <span className="section-badge">{t('about.badge')}</span>
                <h2 className="section-title">{t('about.title')}</h2>
                <p className="story-lead">{t('about.lead')}</p>


                <div className="concept-features">
                  <div className="concept-item">
                    <div className="concept-icon"><i className="fa-solid fa-house-user"></i></div>
                    <div className="concept-info">
                      <h3>{t('about.feat1Title')}</h3>
                      <p>{t('about.feat1Desc')}</p>
                    </div>
                  </div>
                  <div className="concept-item">
                    <div className="concept-icon"><i className="fa-solid fa-bath"></i></div>
                    <div className="concept-info">
                      <h3>{t('about.feat2Title')}</h3>
                      <p>{t('about.feat2Desc')}</p>
                    </div>
                  </div>
                  <div className="concept-item">
                    <div className="concept-icon"><i className="fa-solid fa-leaf"></i></div>
                    <div className="concept-info">
                      <h3>{t('about.feat4Title')}</h3>
                      <p>{t('about.feat4Desc')}</p>
                    </div>
                  </div>
                  <div className="concept-item">
                    <div className="concept-icon"><i className="fa-solid fa-paw"></i></div>
                    <div className="concept-info">
                      <h3>{t('about.feat5Title')}</h3>
                      <p>{t('about.feat5Desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* 📍 Section 3: 房型介紹 (Rooms Gallery - Alternating Villa Blocks) */}
        <section className="gallery-section" id="rooms">
          <div className="container">
            <div className="section-header text-center reveal-on-scroll">
              <span className="section-badge">{t('rooms.badge')}</span>
              <h2 className="section-title">{t('rooms.title')}</h2>
            </div>

            {/* 🏰 Villa Blocks Alternating List */}
            <div className="villa-blocks-list">
              {villas.map((villa, idx) => (
                <VillaShowcaseBlock
                  key={villa.id}
                  villa={villa}
                  photos={photos}
                  t={t}
                  openLightbox={openLightbox}
                  isEven={idx % 2 === 0}
                  locale={locale}
                />
              ))}
            </div>

            {/* 🌟 Shared Amenities Flat Grid Section (Mimicking screenshot layout) */}
            <div className="shared-amenities-block reveal-on-scroll">
              <div className="shared-amenities-header">
                <h3 className="shared-amenities-title">{t('sharedAmenities.title')}</h3>
              </div>

              <div className="shared-amenities-flat-container">
                {/* 1. Public Area Facilities & Services */}
                <div className="shared-amenity-flat-section">
                  <h4 className="shared-category-flat-title">{t('sharedAmenities.categories.public')}</h4>
                  <div className="shared-amenity-flat-grid">
                    {t('sharedAmenities.items.public').map((item, idx) => (
                      <div key={idx} className="shared-amenity-flat-item">
                        <span className="shared-item-flat-icon"><i className={item.icon}></i></span>
                        <span className="shared-item-flat-text">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Entertainment Facilities */}
                <div className="shared-amenity-flat-section">
                  <h4 className="shared-category-flat-title">{t('sharedAmenities.categories.dining')}</h4>
                  <div className="shared-amenity-flat-grid">
                    {t('sharedAmenities.items.dining').map((item, idx) => (
                      <div key={idx} className="shared-amenity-flat-item">
                        <span className="shared-item-flat-icon"><i className={item.icon}></i></span>
                        <span className="shared-item-flat-text">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Kitchen Facilities */}
                <div className="shared-amenity-flat-section">
                  <h4 className="shared-category-flat-title">{t('sharedAmenities.categories.kitchen')}</h4>
                  <div className="shared-amenity-flat-grid">
                    {t('sharedAmenities.items.kitchen').map((item, idx) => (
                      <div key={idx} className="shared-amenity-flat-item">
                        <span className="shared-item-flat-icon"><i className={item.icon}></i></span>
                        <span className="shared-item-flat-text">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Other Facilities */}
                <div className="shared-amenity-flat-section">
                  <h4 className="shared-category-flat-title">{t('sharedAmenities.categories.others')}</h4>
                  <div className="shared-amenity-flat-grid">
                    {t('sharedAmenities.items.others').map((item, idx) => (
                      <div key={idx} className="shared-amenity-flat-item">
                        <span className="shared-item-flat-icon"><i className={item.icon}></i></span>
                        <span className="shared-item-flat-text">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 📍 Section: 品牌理念 (Philosophy Banner - Parallax) */}
        <section className="quote-banner-section" ref={quoteContainerRef}>
          <div className="quote-banner-bg"></div>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="philosophy-banner-content text-center reveal-on-scroll">
              <span className="philosophy-banner-badge">{t('philosophy.badge')}</span>
              <h2 className="philosophy-banner-title">{t('philosophy.title')}</h2>
              <p className="philosophy-banner-lead">{t('philosophy.lead')}</p>
            </div>
          </div>
        </section>

        {/* 📍 Section 4: 線上訂房 (Online Booking System) */}
        <section className="booking-system-section" id="booking-system">
          <div className="container">
            <div className="booking-system-card reveal-on-scroll">
              <span className="section-badge">{t('booking.badge')}</span>
              <h2 className="section-title">{t('booking.title')}</h2>

              <div className="booking-btn-wrapper">
                <a
                  href="https://www.booking-owlnest.com/bfc5e404-4e82-4ecc-8d9d-0869bd730a7b?lang=zh_TW&adult=1&child=0&infant=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-booking-redirect"
                >
                  <i className="fa-solid fa-calendar-days"></i>
                  {t('booking.button')}
                  <i className="fa-solid fa-arrow-right-long icon-arrow"></i>
                </a>
              </div>

              <p className="booking-hint">
                {t('booking.hint')}
              </p>
            </div>
          </div>
        </section>



        {/* 📍 Section 5: 入住須知 (Rules) */}
        <section className="rules-section" id="rules">
          <div className="container">
            <div className="section-header text-center reveal-on-scroll">
                <span className="section-badge">{t('rules.badge')}</span>
                <h2 className="section-title">{t('rules.title')}</h2>
              </div>

            {/* FAQ foldouts */}
            <div className="faq-container reveal-on-scroll" style={{ marginBottom: '20px' }}>
              <div className="faq-grid">
                {faqData.map((faq, idx) => (
                  <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                    <button className="faq-question" onClick={() => toggleFaq(idx)}>
                      <span>{faq.question}</span>
                      <i className="fa-solid fa-chevron-down"></i>
                    </button>
                    <div
                      className="faq-answer"
                      style={{
                        maxHeight: activeFaq === idx ? '600px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.4s ease',
                        padding: '0 24px'
                      }}
                    >
                      <div style={{ paddingTop: '10px', paddingBottom: '20px', lineHeight: '1.7', color: 'var(--text-light)' }}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 📍 Section 6: 聯絡我們 (Contact) */}
        <section className="contact-section" id="contact">
          <div className="container">
            <div className="section-header text-center reveal-on-scroll">
              <span className="section-badge">{t('contact.badge')}</span>
              <h2 className="section-title">{t('contact.title')}</h2>
            </div>

            {/* Contact Info summary card */}
            <div className="contact-summary-card reveal-on-scroll" style={{ marginBottom: '60px', marginTop: '40px' }}>
              <div className="summary-block">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h4>{t('contact.addressLabel')}</h4>
                  <p>{t('contact.addressVal')}</p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h4>{t('contact.phoneLabel')}</h4>
                  <p>0902101161</p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <h4>{t('contact.emailLabel')}</h4>
                  <p>selectstaycation@gmail.com</p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-brands fa-line"></i>
                <div>
                  <h4>{t('contact.lineLabel')}</h4>
                  <p><a href="https://line.me/R/ti/p/@434bmbqm" target="_blank" rel="noopener noreferrer" className="contact-link">{t('contact.lineVal')}</a></p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-brands fa-facebook-f"></i>
                <div>
                  <h4>{t('contact.fbLabel')}</h4>
                  <p><a href="https://www.facebook.com/8machi" target="_blank" rel="noopener noreferrer" className="contact-link">{t('contact.fbVal')}</a></p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-brands fa-instagram"></i>
                <div>
                  <h4>{t('contact.igLabel')}</h4>
                  <p><a href="https://www.instagram.com/8machi_villa?igsh=ZXVzbjA1aW04N292" target="_blank" rel="noopener noreferrer" className="contact-link">{t('contact.igVal')}</a></p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="reveal-on-scroll" style={{ marginBottom: '20px' }}>
              <div
                className="embedded-map-container"
                style={{
                  width: '100%',
                  height: '360px',
                  borderRadius: 'var(--border-radius-md)',
                  overflow: 'hidden',
                  border: '1px solid rgba(92, 99, 83, 0.15)',
                  position: 'relative'
                }}
              >
                <iframe
                  title="八代町民宿 Google Map"
                  src="https://maps.google.com/maps?q=%E5%8F%B0%E7%81%A3%E5%AE%9C%E8%98%AD%E7%B8%A3%E5%86%ac%E5%B1%B1%E9%83%B7%E6%B0%B8%E9%8E%AE%E8%B7%AF122%E8%99%9F&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.35) contrast(1.08) brightness(0.95)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 🌐 Premium Lightbox Modal for Gallery */}
      {lightboxActive && lightboxPhotos[lightboxIndex] && (
        <div className={`lightbox ${lightboxActive ? 'active' : ''}`}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label={t('lightbox.close')}>&times;</button>
          <button className="lightbox-prev" onClick={prevLightbox} aria-label={t('lightbox.prev')}><i className="fa-solid fa-chevron-left"></i></button>
          <button className="lightbox-next" onClick={nextLightbox} aria-label={t('lightbox.next')}><i className="fa-solid fa-chevron-right"></i></button>

          <div className="lightbox-content-container">
            <div className="lightbox-image-wrapper">
              <img
                src={encodeURI(lightboxPhotos[lightboxIndex].large)}
                className={lightboxLoaded ? 'loaded' : ''}
                alt={lightboxPhotos[lightboxIndex].title}
              />
              {!lightboxLoaded && (
                <div className="lightbox-loader">
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                </div>
              )}
            </div>

            <div className="lightbox-caption">
              <div className="lightbox-meta">
                <span className="lightbox-category">
                  {lightboxPhotos[lightboxIndex].category === 'room' || lightboxPhotos[lightboxIndex].category === 'interior' ? t('rooms.cardBadgeRoom') : t('rooms.cardBadgeDetail')}
                </span>
                <span className="lightbox-index">{lightboxIndex + 1} / {lightboxPhotos.length}</span>
              </div>
              <h3 className="lightbox-title">{lightboxPhotos[lightboxIndex].title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* <footer> Footer Copyright */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-brand-info text-center reveal-on-scroll" style={{ marginBottom: '40px' }}>
            <p className="footer-brand-tagline" style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--primary-color)' }}>
              {t('footer.brandTagline')}
            </p>
          </div>
          <div className="footer-bottom text-center">
            <p>{t('footer.copyright')}</p>
            <p className="footer-legal">
              {t('footer.legal')}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
