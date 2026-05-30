import React, { useState, useEffect, useRef } from 'react'

export default function App() {
  // --- States ---
  const [photos, setPhotos] = useState([])
  const [activeVilla, setActiveVilla] = useState('red')
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  // Ambient Audio
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioRef = useRef(null)


  // FAQ Active Accordion
  const [activeFaq, setActiveFaq] = useState(null)

  // --- FAQ Data (6 items) ---
  const faqData = [
    {
      question: "Q1：請問入住與退房時間是幾點？可以延遲退房嗎？",
      answer: (
        <>
          <p style={{ marginBottom: '8px' }}><strong>標準時間：</strong>入住時間為 15:00 - 20:00；退房時間為隔日 11:00 前。</p>
          <p style={{ marginBottom: '8px' }}><strong>迎賓茶點：</strong>若您預計於 15:00 - 18:00 抵達，我們準備了專屬迎賓茶點，請提早與管家預約抵達時間。</p>
          <p style={{ marginBottom: '0' }}><strong>延遲退房：</strong>若需延退，請務必於「前一晚 21:00 前」與管家確認房況（若當日有新住客則無法提供延退）。費用為 $1,000/小時，超過 4 小時將以一日房費計算。</p>
        </>
      )
    },
    {
      question: "Q2：入住有需要支付押金嗎？退還的標準是什麼？",
      answer: (
        <>
          <p style={{ marginBottom: '8px' }}>為維護高品質住宿環境，入住時將收取 <strong>$5,000 的環境維護押金</strong>。</p>
          <p style={{ marginBottom: '8px' }}>退房當日下午，管家確認以下事項無誤後，將以轉帳方式全額退還：</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '6px' }}>垃圾已分類、廚具與餐具已清洗歸位。</li>
            <li style={{ marginBottom: '6px' }}>傢俱、電器、寢具無損壞或無法清除之污漬（包含寵物便溺、人為嘔吐物等）。</li>
            <li style={{ marginBottom: '6px' }}>室內全面禁菸（含電子菸），違者加收「一日房費」空氣淨化費。</li>
            <li style={{ marginBottom: '0' }}>無違法與危險行為（嚴禁施放煙火、仙女棒、使用明火/電磁爐，毒品等違法行為將立即報警並取消住宿）。</li>
          </ul>
        </>
      )
    },
    {
      question: "Q3：請問有提供哪些備品？續住會更換嗎？",
      answer: (
        <>
          <p style={{ marginBottom: '8px' }}><strong>綠色旅遊：</strong>響應環保愛地球，館內僅提供浴巾與毛巾，不提供一次性消耗備品（如牙刷、梳子等），敬請自備。</p>
          <p style={{ marginBottom: '0' }}><strong>續住規範：</strong>續住期間我們不主動更換毛巾與浴巾。為了感謝您與我們一起減少碳足跡，我們將為您提供專屬的續住優惠價。</p>
        </>
      )
    },
    {
      question: "Q4：可以帶寵物（毛小孩）一起入住嗎？有什麼規定？",
      answer: (
        <>
          <p style={{ marginBottom: '8px' }}>我們非常歡迎毛小孩同樂！請注意此服務為<strong>指定棟別且須事先預約</strong>。</p>
          <p style={{ marginBottom: '8px' }}><strong>寵物清潔費：</strong>$500 / 隻。</p>
          <p style={{ marginBottom: '8px' }}><strong>毛孩住宿公約：</strong></p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '6px' }}>請自備毛孩專屬的籠子、睡墊及尿布。</li>
            <li style={{ marginBottom: '6px' }}>嚴禁毛孩上床、上沙發或進入戲水池。</li>
            <li style={{ marginBottom: '0' }}>毛孩的便溺請家長隨手清理。若不慎弄髒環境或留下異味，將酌收 $3,000 的深度清潔費。</li>
          </ul>
        </>
      )
    },
    {
      question: "Q5：如果在民宿烤肉、辦聚會，有什麼需要注意的嗎？",
      answer: (
        <>
          <p style={{ marginBottom: '8px' }}><strong>外燴與活動：</strong>若有邀請外燴、餐車或表演團體，我們將酌收場地借用費 $1,000。</p>
          <p style={{ marginBottom: '8px' }}><strong>場地維護：</strong>烤肉時請勿移動烤爐以策安全。歡聚後，請協助將廚房餐具/鍋具清洗歸位，並將桌面與垃圾收拾整齊。</p>
          <p style={{ marginBottom: '8px' }}><strong>寧靜時刻：</strong>夜晚 22:00 後請將音量放小，讓歡笑聲留在屋內，與鄰里共享靜謐夜晚。</p>
          <p style={{ marginBottom: '0' }}><strong>訪客規範：</strong>若有非住宿訪客，費用為 $500 / 位，且須於 22:00 前道別離場。</p>
        </>
      )
    },
    {
      question: "Q6：使用館內設施（熱水、戲水池、樓梯）有什麼安全提醒？",
      answer: (
        <>
          <p style={{ marginBottom: '8px' }}><strong>洗澡熱水：</strong>本館採用蓄熱式熱水器。若前一位家人泡澡或沖洗較久，建議下一位稍微等待 20-30 分鐘讓熱水補滿，洗沐感會更舒適。</p>
          <p style={{ marginBottom: '8px' }}><strong>兒童安全：</strong>戲水池、浴缸與樓梯間請家長務必全程陪伴孩童，共創安全的親子回憶（本館已投保公共意外責任險，安心有保障）。</p>
          <p style={{ marginBottom: '0' }}><strong>環境安全：</strong>為保障您的安全並避免爭議，一樓公共空間與公共區域設有安全攝影設備，靜靜守護您的美好假期。室內請換穿我們準備的室內拖鞋（請勿外穿）以防光滑地面跌倒。</p>
        </>
      )
    }
  ]

  // Active Section Highlights
  const [activeSection, setActiveSection] = useState('home')

  // --- 4 Villas Static Data Configuration (No English, Element themed tags) ---
  const villas = [
    {
      id: 'red',
      number: '01',
      name: '緋紅 · 樂',
      concept: '融合溫暖的陶紅與原木，創造充滿歡愉與溫度的微醺共享空間。適合與摯愛好友把酒言歡。',
      tags: ['溫慢篝火', '火紅陶藝', '熱烈微醺'],
      photoIds: [1, 2, 3, 4, 5, 6, 7]
    },
    {
      id: 'shadow',
      number: '02',
      name: '流影 · 淨',
      concept: '以極簡水泥與大理石為基調，捕捉日光流逝的光影戲劇，洗滌一身的喧囂與浮躁。',
      tags: ['淨水天井', '潺潺流影', '澄澈水石'],
      photoIds: [8, 9, 10, 11, 12, 13, 14]
    },
    {
      id: 'wood',
      number: '03',
      name: '青木 · 舒',
      concept: '被翠綠山林與藺草香氣包圍，吸吐之間皆是芬多精，沉浸於大自然的全然放鬆。',
      tags: ['芬多翠木', '原生藺木', '溫潤木質'],
      photoIds: [15, 16, 17, 18, 19, 20, 21]
    },
    {
      id: 'gold',
      number: '04',
      name: '金箔 · 粹',
      concept: '低調奢華的雙層閣樓空間，精緻的黃銅飾條與特製陶器，展現純粹的當代生活美學。',
      tags: ['金緻奢華', '極致金箔', '純粹金屬'],
      photoIds: [22, 23, 24, 25, 26, 27, 28]
    }
  ]

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

  // --- Functions ---

  // Ambient sound toggle
  const toggleAmbientSound = () => {
    if (!audioRef.current) return

    if (isPlayingAudio) {
      audioRef.current.pause()
      setIsPlayingAudio(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlayingAudio(true))
        .catch(err => {
          console.error("Audio blocked:", err)
          alert("瀏覽器限制了音訊自動播放，請點擊網頁任意處後再試一次！")
        })
    }
  }

  // Get active villa object
  const currentVillaObj = villas.find(v => v.id === activeVilla) || villas[0]

  // Direct photos selection for active villa (no sub-filter required!)
  const currentVillaPhotos = photos.filter(p => currentVillaObj.photoIds.includes(p.id))

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
      {/* 🎵 Ambient Audio Player Component */}
      <div className="ambient-player-container">
        <button
          className={`ambient-toggle-btn ${isPlayingAudio ? 'playing' : ''}`}
          onClick={toggleAmbientSound}
          title="切換背景音樂"
        >
          <span className="music-wave" style={{ display: isPlayingAudio ? 'flex' : 'none' }}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </span>
          {!isPlayingAudio && <i className="fa-solid fa-volume-xmark" style={{ marginRight: '4px' }}></i>}
          <span className="btn-text">氛圍音</span>
        </button>
        <audio
          ref={audioRef}
          loop
          src="https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav"
          preload="auto"
        />
      </div>

      {/* 🧭 Floating Glassmorphism Navigation Bar */}
      <header className={`main-header ${isNavScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="header-container">
          <a href="#home" className="logo" onClick={() => setIsMenuOpen(false)}>
            <span className="logo-zh">八代町</span>
            <span className="logo-en">yashirocho</span>
          </a>

          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li>
                <a
                  href="#about"
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >關於八代町</a>
              </li>
              <li>
                <a
                  href="#rooms"
                  className={`nav-link ${activeSection === 'rooms' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >房型介紹</a>
              </li>
              <li>
                <a
                  href="#booking-system"
                  className={`nav-link ${activeSection === 'booking-system' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >線上訂房</a>
              </li>
              <li>
                <a
                  href="#rules"
                  className={`nav-link ${activeSection === 'rules' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >入住須知</a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >聯絡我們</a>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <a
              href="https://www.booking-owlnest.com/bfc5e404-4e82-4ecc-8d9d-0869bd730a7b?lang=zh_TW&adult=1&child=0&infant=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary nav-cta-btn"
            >
              立即預約
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
              <span className="hero-subtitle">Yashirocho</span>
              <h1 className="hero-title">靜謐八代町<br />尋回生活的寧靜與溫度</h1>
              <p className="hero-tagline">以大自然之筆，織一室溫柔光影。融合侘寂美學與極致舒適的渡假園區。</p>
              <div className="hero-actions">
                <a href="#rooms" className="btn btn-outline">探索民宿</a>
                <a href="#booking" className="btn btn-primary">規劃旅程</a>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <span className="mouse">
              <span className="wheel"></span>
            </span>
            <span className="scroll-text">向下捲動探索</span>
          </div>
        </section>

        {/* 📍 Section 2: 關於八代町 (About) */}
        <section className="story-section" id="about">
          <div className="container">
            <div className="story-grid">
              <div className="story-image-group">
                <div className="story-img-wrapper main-img reveal-on-scroll">
                  <img src="photos/large/_CCN3744.webp" alt="八代町公共空間" />
                </div>
                <div className="story-img-wrapper sub-img reveal-on-scroll delay-1">
                  <img src="photos/large/_CCN3737.webp" alt="光影茶室" />
                </div>
                <div className="experience-badge reveal-on-scroll delay-2">
                  <span className="badge-num">侘寂</span>
                  <span className="badge-text">四棟自然共生園區</span>
                </div>
              </div>

              <div className="story-content reveal-on-scroll">
                <span className="section-badge">ABOUT YASHIROCHO</span>
                <h2 className="section-title">四棟獨立美學，與自然共呼吸</h2>
                <p className="story-lead">宜蘭冬山鄉的一抹幽靜。「八代町」園區建有四棟獨立的侘寂風民宿，我們將大自然的風、光、木、石引入，讓每棟空間都有專屬的靈魂溫度。</p>

                <div className="concept-features">
                  <div className="concept-item">
                    <div className="concept-icon"><i className="fa-solid fa-hotel"></i></div>
                    <div className="concept-info">
                      <h3>四棟獨立美學聚落</h3>
                      <p>緋紅、流影、青木、金箔，四棟風格迴異。分別詮釋火、水、木、金四大元素能量。</p>
                    </div>
                  </div>
                  <div className="concept-item">
                    <div className="concept-icon"><i className="fa-solid fa-sun"></i></div>
                    <div className="concept-info">
                      <h3>流動的光影天井</h3>
                      <p>精心設計的採光天井與落地大窗，隨太陽運行在牆面與榻榻米上描繪流動的幾何光影。</p>
                    </div>
                  </div>
                  <div className="concept-item">
                    <div className="concept-icon"><i className="fa-solid fa-spa"></i></div>
                    <div className="concept-info">
                      <h3>舒壓放鬆生活</h3>
                      <p>摒棄繁複的多餘裝飾，專注於空氣的流動、器皿的手感與心靈的全然平靜。</p>
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
              <span className="section-badge">ESTATE SHOWCASE</span>
              <h2 className="section-title">四棟獨棟民宿房型與美學</h2>
              <p className="section-desc">「八代町」園區由四棟不同設計主理的侘寂美學建築組成。點擊下方切換不同別墅，一窺其空間魅力與精緻裝飾細節。</p>
            </div>

            {/* 🏰 Primary Tabs: 4 Villas Selection Card Grid */}
            <div className="villa-tabs reveal-on-scroll">
              {villas.map((villa) => (
                <div
                  key={villa.id}
                  className={`villa-tab-card ${activeVilla === villa.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveVilla(villa.id);
                  }}
                >
                  <span className="villa-num">{villa.number}</span>
                  <h3>{villa.name}</h3>
                  <div className="villa-card-tags">
                    {villa.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="villa-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 💬 Active Villa Concept Introduction */}
            <div className="villa-concept-banner reveal-on-scroll">
              <div className="concept-decor"><i className="fa-solid fa-quote-left"></i></div>
              <div className="concept-main-content">
                <h4>設計理念</h4>
                <p className="villa-concept-desc">{currentVillaObj.concept}</p>
              </div>
            </div>

            {/* Gallery Grid container (dynamically filters based on activeVilla) */}
            <div className="gallery-grid reveal-on-scroll">
              {currentVillaPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="gallery-card show"
                  onClick={() => openLightbox(photo.id)}
                >
                  <div className="gallery-img-container">
                    <span className="gallery-card-badge">
                      {photo.category === 'room' || photo.category === 'interior' ? '實景空間' : '細節特寫'}
                    </span>
                    <div className="gallery-img-overlay"></div>
                    <img src={photo.thumb} alt={photo.title} loading="lazy" />
                  </div>
                  <div className="gallery-info">
                    <h3>{photo.title}</h3>
                    <p>{photo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 📍 Section 4: 線上訂房 (Online Booking System) */}
        <section className="booking-system-section" id="booking-system">
          <div className="container">
            <div className="booking-system-card reveal-on-scroll">
              <span className="section-badge">ONLINE RESERVATION</span>
              <h2 className="section-title">開啟您的侘寂之旅</h2>
              <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto 15px', color: 'var(--text-muted)' }}>
                八代町已全面啟用全新「獨立線上訂房系統」，提供您最即時的房況查詢、房型預覽與專屬優惠房價。
              </p>

              <div className="booking-btn-wrapper">
                <a
                  href="https://www.booking-owlnest.com/bfc5e404-4e82-4ecc-8d9d-0869bd730a7b?lang=zh_TW&adult=1&child=0&infant=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-booking-redirect"
                >
                  <i className="fa-solid fa-calendar-days"></i>
                  立即前往線上訂房系統
                  <i className="fa-solid fa-arrow-right-long icon-arrow"></i>
                </a>
              </div>

              <p className="booking-hint">
                * 點擊按鈕將開啟新分頁跳轉至安全外部預訂系統。如有整館包棟、特殊餐食或團體諮詢需求，亦可於下方聯絡我們。
              </p>
            </div>
          </div>
        </section>

        {/* 📍 Section 5: 入住須知 (Rules) */}
        <section className="rules-section" id="rules">
          <div className="container">
            <div className="section-header text-center reveal-on-scroll">
              <span className="section-badge">STAY GUIDELINES</span>
              <h2 className="section-title">入住須知與常見問題</h2>
              <p className="section-desc">為了確保您在八代町擁有最完美的侘寂包棟體驗，請在入住前撥空閱讀以下須知與公約。</p>
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
                      <div style={{ paddingTop: '10px', paddingBottom: '20px', lineHeight: '1.7', color: 'var(--text-muted)' }}>
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
              <span className="section-badge">CONTACT US</span>
              <h2 className="section-title">與八代町聯絡</h2>
              <p className="section-desc">若您有任何包棟需求、交通安排、或是想進一步了解八代町，隨時歡迎與我們聯繫，我們將竭誠為您服務。</p>
            </div>

            {/* Contact Info summary card */}
            <div className="contact-summary-card reveal-on-scroll" style={{ marginBottom: '60px', marginTop: '40px' }}>
              <div className="summary-block">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h4>民宿地址</h4>
                  <p>台灣宜蘭縣冬山鄉永鎮路 122 號</p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h4>聯絡專線</h4>
                  <p>0912-345-678</p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <h4>客服信箱</h4>
                  <p>service@yashirocho-guesthouse.com</p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-brands fa-line"></i>
                <div>
                  <h4>LINE 官方帳號</h4>
                  <p><a href="https://lin.ee/uxHS4Qg" target="_blank" rel="noopener noreferrer" className="contact-link">@8machi（點擊加好友）</a></p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-brands fa-facebook-f"></i>
                <div>
                  <h4>Facebook 臉書粉專</h4>
                  <p><a href="https://www.facebook.com/8machi" target="_blank" rel="noopener noreferrer" className="contact-link">八代町（點擊前往）</a></p>
                </div>
              </div>
              <div className="summary-block">
                <i className="fa-brands fa-instagram"></i>
                <div>
                  <h4>Instagram 品牌主頁</h4>
                  <p><a href="https://www.instagram.com/8machi368/" target="_blank" rel="noopener noreferrer" className="contact-link">@8machi368（點擊追蹤）</a></p>
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
          <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
          <button className="lightbox-prev" onClick={prevLightbox}><i className="fa-solid fa-chevron-left"></i></button>
          <button className="lightbox-next" onClick={nextLightbox}><i className="fa-solid fa-chevron-right"></i></button>

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
                  {currentVillaPhotos[lightboxIndex].category === 'room' || currentVillaPhotos[lightboxIndex].category === 'interior' ? '實景空間' : '細節特寫'}
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
          <div className="footer-bottom text-center">
            <p>&copy; 2026 八代町 YASHIROCHO. All Rights Reserved. Designed for premium living experience.</p>
            <p className="footer-legal">
              宜蘭縣合法民宿 編號 NO.3028 &nbsp;｜&nbsp; 宜蘭縣合法民宿 編號 NO.3033 &nbsp;｜&nbsp; 宜蘭縣合法民宿 編號 NO.3034 &nbsp;｜&nbsp; 宜蘭縣合法民宿 編號 NO.3039
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
