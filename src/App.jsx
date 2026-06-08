import React, { useState, useEffect, useRef } from 'react'
import { locales, translatePhoto } from './locales'

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
  const [activeVilla, setActiveVilla] = useState('red')
  const [showcaseHighlight, setShowcaseHighlight] = useState(false)
  const [currentVillaPhotoIdx, setCurrentVillaPhotoIdx] = useState(0)
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Refs for layout
  const storyContainerRef = useRef(null)
  const tabsRef = useRef(null)
  const galleryStartRef = useRef(null)

  // Trigger temporary glow on showcase when active villa changes
  useEffect(() => {
    setShowcaseHighlight(true)
    const timer = setTimeout(() => {
      setShowcaseHighlight(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [activeVilla])

  useEffect(() => {
    const handleScroll = () => {
      const container = storyContainerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const containerCenter = rect.top + rect.height / 2
        const viewportCenter = viewportHeight / 2
        const offset = containerCenter - viewportCenter
        container.style.setProperty('--scroll-offset', `${offset}px`)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hero Slider
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroSlides = [
    'photos/large/_CCN3531.webp',
    'photos/large/_CCN3571.webp',
    'photos/large/_CCN3607.webp',
    'photos/large/_CCN3683.webp'
  ]

  // Lightbox States
  const [lightboxActive, setLightboxActive] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxLoaded, setLightboxLoaded] = useState(false)

  // FAQ Active Accordion
  const [activeFaq, setActiveFaq] = useState(null)

  // --- FAQ Data & Villas Data dynamically retrieved from dictionary ---
  const villas = locales[locale]?.villas || locales['zh'].villas
  const faqData = locales[locale]?.faq || locales['zh'].faq

  // Active Section Highlights
  const [activeSection, setActiveSection] = useState('home')

  // --- Effects ---

  // 1. Fetch Photo Manifest on mount
  useEffect(() => {
    fetch('/photos_manifest.json')
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

  // Get active villa object
  const currentVillaObj = villas.find(v => v.id === activeVilla) || villas[0]

  // Direct photos selection for active villa (mapped through translation helper)
  const currentVillaPhotos = photos
    .filter(p => currentVillaObj.photoIds.includes(p.id))
    .map(p => translatePhoto(p, locale))

  // Lightbox handlers (maps directly to currentVillaPhotos)
  const openLightbox = (photoId) => {
    const idx = currentVillaPhotos.findIndex(p => p.id === photoId)
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
    setLightboxIndex(prev => (prev + 1) % currentVillaPhotos.length)
  }

  const prevLightbox = () => {
    setLightboxLoaded(false)
    setLightboxIndex(prev => (prev - 1 + currentVillaPhotos.length) % currentVillaPhotos.length)
  }

  // Preload lightbox images
  useEffect(() => {
    if (lightboxActive && currentVillaPhotos[lightboxIndex]) {
      const img = new Image()
      img.src = currentVillaPhotos[lightboxIndex].large
      img.onload = () => setLightboxLoaded(true)
    }
  }, [lightboxIndex, lightboxActive, currentVillaPhotos])

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
  }, [lightboxActive, currentVillaPhotos, lightboxIndex])

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
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`slide ${currentSlide === idx ? 'active' : ''}`}
                style={{ backgroundImage: `url('${slide}')` }}
              />
            ))}
          </div>

          <div className="hero-overlay"></div>

          <div className="hero-content-wrapper">
            <div className="hero-content">
              <span className="hero-subtitle">{t('hero.subtitle')}</span>
              <h1 className="hero-title">{t('hero.title')}</h1>
              <p className="hero-tagline">{t('hero.tagline')}</p>
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
                  <img src="photos/large/_CCN3744.webp" alt="八代町物業實景 - 主外觀" />
                </div>
                
                {/* Card B: Top right overlap */}
                <div className="parallax-card card-sub-tr">
                  <img src="photos/large/_CCN3704.webp" alt="八代町物業實景 - 獨立湯池與泳池" />
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
                <p className="story-desc-text">{t('about.desc')}</p>

                <div className="concept-features">
                  <div className="concept-item">
                    <div className="concept-icon"><i className="fa-solid fa-house-user"></i></div>
                    <div className="concept-info">
                      <h3>{t('about.feat1Title')}</h3>
                      <p>{t('about.feat1Desc')}</p>
                    </div>
                  </div>
                  <div className="concept-item">
                    <div className="concept-icon"><i className="fa-solid fa-water-ladder"></i></div>
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
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* 📍 Section 3: 房型介紹 (Rooms Gallery - Split into 4 Villas) */}
        <section className="gallery-section" id="rooms">
          <div className="container">
            <div className="section-header text-center reveal-on-scroll">
              <span className="section-badge">{t('rooms.badge')}</span>
              <h2 className="section-title">{t('rooms.title')}</h2>
              <p className="section-desc">{t('rooms.desc')}</p>
            </div>

            {/* 🏰 Primary Tabs: 4 Villas Selection Card Grid */}
            <div ref={tabsRef} className="villa-tabs">
              {villas.map((villa) => (
                <div
                  key={villa.id}
                  className={`villa-tab-card villa-tab-card-${villa.id} ${activeVilla === villa.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveVilla(villa.id);
                    setCurrentVillaPhotoIdx(0);
                    // Smoothly scroll to the photos content area
                    setTimeout(() => {
                      galleryStartRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                >
                  <span className="villa-num">{villa.number}</span>
                  <h3>{villa.name}</h3>
                </div>
              ))}
            </div>

            {/* 🧭 Visual connection pointer linking active tab to details */}
            <div className="villa-tab-pointers">
              {villas.map((villa) => (
                <div
                  key={villa.id}
                  className={`pointer-arrow-col pointer-col-${villa.id} ${activeVilla === villa.id ? 'active' : ''}`}
                >
                  <div className="pointer-line"></div>
                  <div className="pointer-arrow">
                    <div className="pointer-icon-wrapper">
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Showcase details area (amenities left, carousel right) */}
            <div 
              ref={galleryStartRef} 
              className={`villa-details-showcase theme-${activeVilla} ${showcaseHighlight ? 'showcase-highlight' : ''}`}
            >
              {/* Left Column: Amenities */}
              <div className="villa-amenities-col">

                
                <div className="villa-amenities-block">
                  <h4 className="villa-column-title">
                    <i className="fa-solid fa-circle-info"></i>
                    {t('rooms.amenitiesLabel')}
                  </h4>
                  <div className="villa-amenities-grid">
                    {currentVillaObj.amenities?.map((amenity, idx) => (
                      <div key={idx} className="villa-amenity-item">
                        <span className="villa-amenity-icon"><i className={amenity.icon}></i></span>
                        <span className="villa-amenity-text">{amenity.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Carousel Slideshow */}
              <div className="villa-carousel-col">
                {currentVillaPhotos.length > 0 ? (
                  <div className="villa-carousel-wrapper">
                    {/* Active Image container */}
                    <div 
                      className="villa-carousel-image-container"
                      onClick={() => openLightbox(currentVillaPhotos[currentVillaPhotoIdx]?.id)}
                    >
                      <span className="villa-carousel-badge">
                        {currentVillaPhotos[currentVillaPhotoIdx]?.category === 'room' || currentVillaPhotos[currentVillaPhotoIdx]?.category === 'interior' 
                          ? t('rooms.cardBadgeRoom') 
                          : t('rooms.cardBadgeDetail')
                        }
                      </span>
                      <div className="villa-carousel-overlay">
                        <i className="fa-solid fa-maximize"></i>
                        <span>放大實景</span>
                      </div>
                      <img 
                        src={currentVillaPhotos[currentVillaPhotoIdx]?.large} 
                        alt={currentVillaPhotos[currentVillaPhotoIdx]?.title} 
                        className="villa-carousel-img"
                      />
                      
                      {/* Image Caption */}
                      <div className="villa-carousel-caption">
                        <h3>{currentVillaPhotos[currentVillaPhotoIdx]?.title}</h3>
                        <p>{currentVillaPhotos[currentVillaPhotoIdx]?.description}</p>
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                      className="villa-carousel-arrow arrow-left"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentVillaPhotoIdx(prev => (prev - 1 + currentVillaPhotos.length) % currentVillaPhotos.length);
                      }}
                      aria-label="上一張"
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button 
                      className="villa-carousel-arrow arrow-right"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentVillaPhotoIdx(prev => (prev + 1) % currentVillaPhotos.length);
                      }}
                      aria-label="下一張"
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>

                    {/* Dot Indicators */}
                    <div className="villa-carousel-dots">
                      {currentVillaPhotos.map((_, idx) => (
                        <button
                          key={idx}
                          className={`villa-carousel-dot ${currentVillaPhotoIdx === idx ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentVillaPhotoIdx(idx);
                          }}
                          aria-label={`切換至第 ${idx + 1} 張`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="villa-carousel-placeholder">
                    <i className="fa-solid fa-images"></i>
                    <p>圖片加載中...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 📍 Section: 品牌理念 (Philosophy Banner - Parallax) */}
        <section className="quote-banner-section">
          <div className="container">
            <div className="philosophy-banner-content text-center reveal-on-scroll">
              <span className="philosophy-banner-badge">{t('philosophy.badge')}</span>
              <h2 className="philosophy-banner-title">{t('philosophy.title')}</h2>
              <p className="philosophy-banner-lead">{t('philosophy.lead')}</p>
              <p className="philosophy-banner-desc">{t('philosophy.desc')}</p>
            </div>
          </div>
        </section>

        {/* 📍 Section 4: 線上訂房 (Online Booking System) */}
        <section className="booking-system-section" id="booking-system">
          <div className="container">
            <div className="booking-system-card reveal-on-scroll">
              <span className="section-badge">{t('booking.badge')}</span>
              <h2 className="section-title">{t('booking.title')}</h2>
              <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto 15px', color: 'var(--text-muted)' }}>
                {t('booking.desc')}
              </p>

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
              <p className="section-desc">{t('rules.desc')}</p>
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
              <p className="section-desc">{t('contact.desc')}</p>
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
                  <p>0912-345-678</p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <h4>{t('contact.emailLabel')}</h4>
                  <p>service@yashirocho-guesthouse.com</p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-brands fa-line"></i>
                <div>
                  <h4>{t('contact.lineLabel')}</h4>
                  <p><a href="https://lin.ee/uxHS4Qg" target="_blank" rel="noopener noreferrer" className="contact-link">{t('contact.lineVal')}</a></p>
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
                  <p><a href="https://www.instagram.com/8machi368/" target="_blank" rel="noopener noreferrer" className="contact-link">{t('contact.igVal')}</a></p>
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
      {lightboxActive && currentVillaPhotos[lightboxIndex] && (
        <div className={`lightbox ${lightboxActive ? 'active' : ''}`}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label={t('lightbox.close')}>&times;</button>
          <button className="lightbox-prev" onClick={prevLightbox} aria-label={t('lightbox.prev')}><i className="fa-solid fa-chevron-left"></i></button>
          <button className="lightbox-next" onClick={nextLightbox} aria-label={t('lightbox.next')}><i className="fa-solid fa-chevron-right"></i></button>

          <div className="lightbox-content-container">
            <div className="lightbox-image-wrapper">
              <img
                src={currentVillaPhotos[lightboxIndex].large}
                className={lightboxLoaded ? 'loaded' : ''}
                alt={currentVillaPhotos[lightboxIndex].title}
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
                  {currentVillaPhotos[lightboxIndex].category === 'room' || currentVillaPhotos[lightboxIndex].category === 'interior' ? t('rooms.cardBadgeRoom') : t('rooms.cardBadgeDetail')}
                </span>
                <span className="lightbox-index">{lightboxIndex + 1} / {currentVillaPhotos.length}</span>
              </div>
              <h3 className="lightbox-title">{currentVillaPhotos[lightboxIndex].title}</h3>
              <p className="lightbox-desc">{currentVillaPhotos[lightboxIndex].description}</p>
            </div>
          </div>
        </div>
      )}

      {/* <footer> Footer Copyright */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-brand-info text-center reveal-on-scroll" style={{ marginBottom: '40px' }}>
            <p className="footer-brand-features" style={{ fontSize: '0.95rem', color: 'var(--text-light)', letterSpacing: '0.15em', marginBottom: '8px' }}>
              {t('footer.brandFeatures')}
            </p>
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
