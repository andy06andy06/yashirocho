import React from 'react'

// Translation Dictionary for Yashirocho Website
export const locales = {
  zh: {
    // Navigation
    nav: {
      about: '關於八代町',
      rooms: '房型介紹',
      booking: '線上訂房',
      rules: '入住須知',
      contact: '聯絡我們',
      cta: '立即預約',
      logoZh: '八代町',
      logoEn: 'yashirocho'
    },
    // Hero
    hero: {
      subtitle: 'Yashirocho',
      title: <>靜謐八代町<br />尋回生活的寧靜與溫度</>,
      tagline: '以大自然之筆，織一室溫柔光影。融合侘寂美學與極致舒適的渡假園區。',
      scrollText: '向下捲動探索'
    },
    // About
    about: {
      badge: 'ABOUT YASHIROCHO',
      title: '四棟獨立美學，與自然共呼吸',
      lead: '宜蘭冬山鄉的一抹幽靜。「八代町」園區建有四棟獨立的侘寂風民宿，我們將大自然的風、光、木、石引入，讓每棟空間都有專屬的靈魂溫度。',
      badgeNum: '侘寂',
      badgeText: '四棟自然共生園區',
      feat1Title: '四棟獨立美學聚落',
      feat1Desc: '緋紅、流影、青木、金箔，四棟風格迴異。分別詮釋火、水、木、金四大元素能量。',
      feat2Title: '流動的光影天井',
      feat2Desc: '精心設計的採光天井與落地大窗，隨太陽運行在牆面與榻榻米上描繪流動的幾何光影。',
      feat3Title: '舒壓放鬆生活',
      feat3Desc: '摒棄繁複的多餘裝飾，專注於空氣的流動、器皿的手感與心靈的全然平靜。'
    },
    // Rooms
    rooms: {
      badge: 'ESTATE SHOWCASE',
      title: '四棟獨棟民宿房型與美學',
      desc: '「八代町」園區由四棟不同設計主理的侘寂美學建築組成。點擊下方切換不同別墅，一窺其空間魅力與精緻裝飾細節。',
      conceptLabel: '設計理念',
      cardBadgeRoom: '實景空間',
      cardBadgeDetail: '細節特寫'
    },
    // Booking
    booking: {
      badge: 'ONLINE RESERVATION',
      title: '開啟您的侘寂之旅',
      desc: '八代町已全面啟用全新「獨立線上訂房系統」，提供您最即時的房況查詢、房型預覽與專屬優惠房價。',
      button: '立即前往線上訂房系統',
      hint: '* 點擊按鈕將開啟新分頁跳轉至安全外部預訂系統。如有整館包棟、特殊餐食或團體諮詢需求，亦可於下方聯絡我們。'
    },
    // Rules / FAQ
    rules: {
      badge: 'STAY GUIDELINES',
      title: '入住須知與常見問題',
      desc: '為了確保您在八代町擁有最完美的防寂包棟體驗，請在入住前撥空閱讀以下須知與公約。'
    },
    // Contact
    contact: {
      badge: 'CONTACT US',
      title: '與八代町聯絡',
      desc: '若您有任何包棟需求、交通安排、或是想進一步了解八代町，隨時歡迎與我們聯繫，我們將竭誠為您服務。',
      addressLabel: '民宿地址',
      addressVal: '台灣宜蘭縣冬山鄉永鎮路 122 號',
      phoneLabel: '聯絡專線',
      emailLabel: '客服信箱',
      lineLabel: 'LINE 官方帳號',
      lineVal: '@8machi（點擊加好友）',
      fbLabel: 'Facebook 臉書粉專',
      fbVal: '八代町（點擊前往）',
      igLabel: 'Instagram 品牌主頁',
      igVal: '@8machi368（點擊追蹤）'
    },
    // Lightbox & Footer
    lightbox: {
      badgeRoom: '實景空間',
      badgeDetail: '細節特寫',
      close: '關閉',
      prev: '上一張',
      next: '下一張'
    },
    footer: {
      copyright: '© 2026 八代町 YASHIROCHO. All Rights Reserved. Designed for premium living experience.',
      legal: '宜蘭縣合法民宿 編號 NO.3028 ｜ 宜蘭縣合法民宿 編號 NO.3033 ｜ 宜蘭縣合法民宿 編號 NO.3034 ｜ 宜蘭縣合法民宿 編號 NO.3039'
    },
    // Villas Data
    villas: [
      {
        id: 'red',
        number: '01',
        name: '緋紅 · 樂',
        concept: '融合溫慢的陶紅與原木，創造充滿歡愉與溫度的微醺共享空間。適合與摯愛好友把酒言歡。',
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
    ],
    // FAQ Data
    faq: [
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
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--text-light)' }}>
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
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--text-light)' }}>
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
  },
  en: {
    // Navigation
    nav: {
      about: 'About',
      rooms: 'Villas',
      booking: 'Reservation',
      rules: 'Guidelines',
      contact: 'Contact',
      cta: 'Book Now',
      logoZh: '八代町',
      logoEn: 'yashirocho'
    },
    // Hero
    hero: {
      subtitle: 'Yashirocho',
      title: <>Serene Yashirocho<br />Reclaim Tranquility & Warmth</>,
      tagline: 'Using nature’s brush to weave gentle light and shadow. A retreat blending wabi-sabi aesthetics with ultimate comfort.',
      scrollText: 'Scroll Down to Explore'
    },
    // About
    about: {
      badge: 'ABOUT YASHIROCHO',
      title: 'Four Standalone Villas, Breathing in Harmony with Nature',
      lead: 'A serene oasis nestled in Dongshan, Yilan. "Yashirocho" features four independent wabi-sabi design villas. We invite nature’s wind, light, timber, and stone inside, giving each space a unique soul and temperature.',
      badgeNum: 'Wabi-Sabi',
      badgeText: 'Four Eco-integrated Villas',
      feat1Title: 'Four Unique Aesthetic Hubs',
      feat1Desc: 'Crimson, Shadow, Timber, and Gold villas each stand with contrasting styles, interpreting the elemental energy of Fire, Water, Wood, and Metal.',
      feat2Title: 'Flowing Sunlit Skylights',
      feat2Desc: 'Meticulously crafted skylights and floor-to-ceiling windows paint shifting geometric light patterns on tatami mats as the sun charts its course.',
      feat3Title: 'Decompress & Harmonize',
      feat3Desc: 'Casting aside redundant ornamentation to focus on air circulation, the warmth of handmade vessels, and absolute inner peace.'
    },
    // Rooms
    rooms: {
      badge: 'ESTATE SHOWCASE',
      title: 'Villas & Architectural Aesthetics',
      desc: 'The "Yashirocho" estate consists of four unique designer villas featuring wabi-sabi design. Select a villa below to preview its captivating charm and refined interior details.',
      conceptLabel: 'Concept',
      cardBadgeRoom: 'Space View',
      cardBadgeDetail: 'Close-up Detail'
    },
    // Booking
    booking: {
      badge: 'ONLINE RESERVATION',
      title: 'Begin Your Wabi-Sabi Sojourn',
      desc: 'Yashirocho has fully integrated a new independent booking engine, offering the most updated availability, room previews, and exclusive rates.',
      button: 'Proceed to Reservation System',
      hint: '* Clicking the button opens a secure external booking engine in a new tab. For exclusive private rentals, custom catering, or corporate inquiries, please reach out to us below.'
    },
    // Rules / FAQ
    rules: {
      badge: 'STAY GUIDELINES',
      title: 'Stay Guidelines & FAQ',
      desc: 'To ensure your private villa stay is absolutely perfect, please read these house rules and agreements prior to arrival.'
    },
    // Contact
    contact: {
      badge: 'CONTACT US',
      title: 'Connect with Yashirocho',
      desc: 'If you have custom booking queries, transport arrangements, or wish to explore more about our estate, we are always here to assist you.',
      addressLabel: 'Address',
      addressVal: 'No. 122, Yongzhen Road, Dongshan Township, Yilan County, Taiwan',
      phoneLabel: 'Hotline',
      emailLabel: 'Email',
      lineLabel: 'Official LINE',
      lineVal: '@8machi (Tap to Add Friend)',
      fbLabel: 'Facebook Fanpage',
      fbVal: 'Yashirocho (Tap to Visit)',
      igLabel: 'Instagram',
      igVal: '@8machi368 (Tap to Follow)'
    },
    // Lightbox & Footer
    lightbox: {
      badgeRoom: 'Actual Space',
      badgeDetail: 'Detail Shot',
      close: 'Close',
      prev: 'Previous',
      next: 'Next'
    },
    footer: {
      copyright: '© 2026 Yashirocho. All Rights Reserved. Designed for premium living experience.',
      legal: 'Yilan County Registered Guesthouse Licenses: NO.3028 ｜ NO.3033 ｜ NO.3034 ｜ NO.3039'
    },
    // Villas Data
    villas: [
      {
        id: 'red',
        number: '01',
        name: 'Crimson · Joy',
        concept: 'Blending warm terracotta tones and raw timber to forge a lively and heart-warming space for shared tipsy moments. Perfect for sharing wine and stories with beloved friends.',
        tags: ['Slow Firepit', 'Red Ceramics', 'Warm Tipsiness'],
        photoIds: [1, 2, 3, 4, 5, 6, 7]
      },
      {
        id: 'shadow',
        number: '02',
        name: 'Shadow · Purity',
        concept: 'Formed from minimalist concrete and marble to capture the beautiful theatre of shifting sunlight, cleansing away all outer noise and restlessness.',
        tags: ['Purity Skylight', 'Flowing Shadow', 'Clear Waterstone'],
        photoIds: [8, 9, 10, 11, 12, 13, 14]
      },
      {
        id: 'wood',
        number: '03',
        name: 'Timber · Comfort',
        concept: 'Embraced by verdant forests and aromatic tatami rushes, every breath draws in natural phytoncides, immersing you in complete relaxation.',
        tags: ['Forest Greens', 'Aromatic Rush', 'Warm Wood'],
        photoIds: [15, 16, 17, 18, 19, 20, 21]
      },
      {
        id: 'gold',
        number: '04',
        name: 'Gold · Essence',
        concept: 'A low-profile luxury loft space utilizing exquisite brass accents and bespoke ceramics to express a pure vision of contemporary living.',
        tags: ['Exquisite Brass', 'Golden Leaf', 'Pure Metallurgy'],
        photoIds: [22, 23, 24, 25, 26, 27, 28]
      }
    ],
    // FAQ Data
    faq: [
      {
        question: "Q1: What are the standard check-in and check-out times? Is late check-out available?",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}><strong>Standard Hours:</strong> Check-in is between 15:00 - 20:00; check-out is before 11:00 the following morning.</p>
            <p style={{ marginBottom: '8px' }}><strong>Welcome Tea:</strong> If you plan to arrive between 15:00 - 18:00, we serve a bespoke welcome refreshment set. Please coordinate your arrival time with the butler in advance.</p>
            <p style={{ marginBottom: '0' }}><strong>Late Check-out:</strong> Requests must be made with the butler before 21:00 the night prior. This is strictly subject to same-day room availability. The rate is $1,000 TWD per hour; check-out delayed over 4 hours will be billed as a full additional night.</p>
          </>
        )
      },
      {
        question: "Q2: Is a security deposit required upon check-in? What is the standard for its return?",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}>To maintain our premium accommodation environment, a <strong>$5,000 TWD environmental maintenance deposit</strong> is collected upon check-in.</p>
            <p style={{ marginBottom: '8px' }}>The deposit will be refunded in full via bank transfer on the afternoon of check-out after the butler confirms the following:</p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--text-light)' }}>
              <li style={{ marginBottom: '6px' }}>Trash is fully sorted, and kitchenware/tableware are washed and neatly returned to cabinets.</li>
              <li style={{ marginBottom: '6px' }}>Furniture, appliances, and bedding are free from damage or stubborn stains (including pet accidents, human vomit, etc.).</li>
              <li style={{ marginBottom: '6px' }}>Strictly no indoor smoking (including electronic cigarettes). Violators will be charged an additional full day's room rate to cover commercial deep-cleaning and air purification.</li>
              <li style={{ marginBottom: '0' }}>No hazardous or illegal activities (strictly no fireworks, sparklers, open indoor flames, electric hotplates, or drugs. Any illegal behavior will prompt immediate police alert and reservation forfeiture).</li>
            </ul>
          </>
        )
      },
      {
        question: "Q3: What amenities are provided? Are they replaced during multi-night stays?",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}><strong>Green Tourism:</strong> Committed to eco-friendly practices, the villa provides only premium towels and bath towels. Single-use disposable toiletries (such as toothbrushes, combs, razors, etc.) are not provided. Please bring your own.</p>
            <p style={{ marginBottom: '0' }}><strong>Consecutive Stay Policy:</strong> We do not proactively replace towels or bed sheets during consecutive stays. To express our gratitude for joining us in carbon footprint reduction, we offer a special consecutive stay rate.</p>
          </>
        )
      },
      {
        question: "Q4: Can we bring pets? What are the pet regulations?",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}>We absolutely welcome your furry companions! Please note this service is <strong>vessel-specific and requires booking in advance</strong>.</p>
            <p style={{ marginBottom: '8px' }}><strong>Pet Cleaning Fee:</strong> $500 TWD per pet.</p>
            <p style={{ marginBottom: '8px' }}><strong>Furry Companion House Rules:</strong></p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--text-light)' }}>
              <li style={{ marginBottom: '6px' }}>Please bring your pet’s own crate, sleeping cushion, and pee pads.</li>
              <li style={{ marginBottom: '6px' }}>Pets are strictly prohibited from getting on beds, sofas, or entering the splash pool.</li>
              <li style={{ marginBottom: '0' }}>Please clean up after your pet's waste immediately. If any severe stains or persistent odors are left on carpets or furnishings, a deep sanitization fee of $3,000 TWD will apply.</li>
            </ul>
          </>
        )
      },
      {
        question: "Q5: What should we keep in mind for BBQ gatherings or small celebrations?",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}><strong>Catering & Vendors:</strong> If you arrange external catering services, private food trucks, or live performers, a venue coordination fee of $1,000 TWD is charged.</p>
            <p style={{ marginBottom: '8px' }}><strong>Grill Care:</strong> For safety reasons, please do not relocate the commercial BBQ stove. After gathering, kindly wash and return all kitchen equipment, and pack up all loose garbage.</p>
            <p style={{ marginBottom: '8px' }}><strong>Quiet Hours:</strong> Please lower the noise volume after 22:00, keeping laughter and music indoors to preserve the quiet nature of our surrounding neighborhood.</p>
            <p style={{ marginBottom: '0' }}><strong>Visiting Guests:</strong> Any non-staying guests are charged a fee of $500 TWD per person, and all visitors must depart the premises before 22:00.</p>
          </>
        )
      },
      {
        question: "Q6: Are there safety reminders for the hot water system, splash pool, or stairs?",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}><strong>Bath Hot Water:</strong> The villa employs a storage-type boiler system. If a previous guest used a large amount of hot water for bathing, we kindly advise waiting 20-30 minutes for the boiler to refill to ensure full hot water pressure.</p>
            <p style={{ marginBottom: '8px' }}><strong>Child Safety:</strong> Parents must actively supervise children around the splash pool, deep bathtubs, and modern staircases at all times (the estate is fully covered by public liability insurance for ultimate reassurance).</p>
            <p style={{ marginBottom: '0' }}><strong>Security & Slipping:</strong> For your absolute safety and to prevent disputes, secure CCTV monitoring is active in the first-floor common spaces and outdoor pathways. Please wear the high-grip indoor slippers provided (please do not wear them outdoors) to prevent slipping on smooth tiles.</p>
          </>
        )
      }
    ]
  },
  ja: {
    // Navigation
    nav: {
      about: '八代町について',
      rooms: '客室紹介',
      booking: 'オンライン予約',
      rules: '宿泊の注意事項',
      contact: 'お問い合わせ',
      cta: '今すぐ予約',
      logoZh: '八代町',
      logoEn: 'yashirocho'
    },
    // Hero
    hero: {
      subtitle: 'Yashirocho',
      title: <>静寂なる八代町<br />暮らしの平穏と温もりを取り戻す</>,
      tagline: '大自然の筆が描く、優美な光と影。侘び寂びの美学と極上の心地よさが融合したリゾート空間。',
      scrollText: 'スクロールして探索'
    },
    // About
    about: {
      badge: 'ABOUT YASHIROCHO',
      title: '自然と調和する、四棟の独立した美学',
      lead: '宜蘭県冬山郷の静寂の中に佇む「八代町」。園内には、侘び寂びスタイルを取り入れた4棟の独立型ヴィラがあります。風、光、木、石という自然の要素を取り込み、それぞれの空間に独自の魂と温もりを吹き込みました。',
      badgeNum: '侘び寂び',
      badgeText: '自然と共生する4棟のヴィラ',
      feat1Title: '四棟の独立した美の集落',
      feat1Desc: '「緋紅」「流影」「青木」「金箔」、それぞれが異なる世界観を持ち、火、水、木、金という4つのエレメントを表現しています。',
      feat2Title: '光と影が流れる天井',
      feat2Desc: '緻密に計算された天井窓と大きな掃き出し窓から差し込む陽光が、時間とともに畳や壁に美しい幾何学模様を描き出します。',
      feat3Title: '心身を解き放つ暮らし',
      feat3Desc: '過剰な装飾を削ぎ落とし、空気の流れ、手作りの器の質感、そして内なる絶対的な平穏に寄り添います。'
    },
    // Rooms
    rooms: {
      badge: 'ESTATE SHOWCASE',
      title: '4棟のプライベートヴィラと空間美',
      desc: '「八代町」リゾートは、それぞれ異なるデザイナーが手がけた侘び寂びの美学が光る4棟の建築で構成されています。以下より各ヴィラを切り替え、こだわりの空間をご覧ください。',
      conceptLabel: 'デザインコンセプト',
      cardBadgeRoom: '実景空間',
      cardBadgeDetail: 'ディテール'
    },
    // Booking
    booking: {
      badge: 'ONLINE RESERVATION',
      title: '侘び寂びの旅を始めましょう',
      desc: '八代町では、リアルタイムの空室状況、客室プレビュー、限定宿泊プランをご提供する新しい「独立型オンライン予約システム」を導入しております。',
      button: '予約システムへ進む',
      hint: '* ボタンをクリックすると、安全な外部予約エンジン（OwlNest）が別タブで開きます。一棟貸切（グループ予約）、特別なお食事手配、団体利用のご相談は、下記のお問い合わせ先よりお気軽にご連絡ください。'
    },
    // Rules / FAQ
    rules: {
      badge: 'STAY GUIDELINES',
      title: '宿泊規約とよくある質問',
      desc: '八代町での一棟貸切体験を完璧なものにするため、ご宿泊前に必ず以下の規約と公約をお読みいただきますようお願いいたします。'
    },
    // Contact
    contact: {
      badge: 'CONTACT US',
      title: '八代町へのお問い合わせ',
      desc: '一棟貸切のご相談、交通手配、あるいは八代町について詳しくお知りになりたいことがございましたら、いつでもお気軽にお問い合わせください。',
      addressLabel: '住所',
      addressVal: '台湾宜蘭県冬山郷永鎮路122号',
      phoneLabel: '電話番号',
      emailLabel: 'メールアドレス',
      lineLabel: '公式LINEアカウント',
      lineVal: '@8machi (タップして友だち追加)',
      fbLabel: 'Facebookページ',
      fbVal: '八代町 (タップして開く)',
      igLabel: 'Instagram',
      igVal: '@8machi368 (タップしてフォロー)'
    },
    // Lightbox & Footer
    lightbox: {
      badgeRoom: '実景空間',
      badgeDetail: 'ディテール',
      close: '閉じる',
      prev: '前へ',
      next: '次へ'
    },
    footer: {
      copyright: '© 2026 八代町 YASHIROCHO. All Rights Reserved. Designed for premium living experience.',
      legal: '宜蘭県政府公認優良民宿ライセンス：NO.3028 ｜ NO.3033 ｜ NO.3034 ｜ NO.3039'
    },
    // Villas Data
    villas: [
      {
        id: 'red',
        number: '01',
        name: '緋紅 · 楽',
        concept: '温かみのあるテラコッタレッドと原木を融合させ、喜びと温もりに満ちたほろ酔いの共有空間を創り出します。大切な友人たちと楽しくお酒を酌み交わすのに最適です。',
        tags: ['温かな焚き火', '赤い陶芸', 'ほろ酔いの集い'],
        photoIds: [1, 2, 3, 4, 5, 6, 7]
      },
      {
        id: 'shadow',
        number: '02',
        name: '流影 · 浄',
        concept: '極限までシンプルなコンクリートと大理石を基調とし、一日の陽の移ろいを捉える光と影のドラマを演出します。日常の喧騒と焦燥を静かに洗い流してくれます。',
        tags: ['澄んだ天井窓', '流れる光影', '清らかな水石'],
        photoIds: [8, 9, 10, 11, 12, 13, 14]
      },
      {
        id: 'wood',
        number: '03',
        name: '青木 · 舒',
        concept: 'みずみずしい緑の森とイグサの香りに包まれ、呼吸するたびにフィトンチッドを吸い込む、大自然と完全に溶け合うリラクゼーション体験をご提供します。',
        tags: ['新緑の癒やし', '国産天然イグサ', '温もりの木肌'],
        photoIds: [15, 16, 17, 18, 19, 20, 21]
      },
      {
        id: 'gold',
        number: '04',
        name: '金箔 · 粹',
        concept: '真鍮のヘアライン装飾やオーダーメイドの陶器をあしらった、贅沢な2層構造のロフト空間。当代的でありながら純粋な美意識を体現したライフスタイルです。',
        tags: ['真鍮の煌めき', '金箔の意匠', '純粋なマテリアル'],
        photoIds: [22, 23, 24, 25, 26, 27, 28]
      }
    ],
    // FAQ Data
    faq: [
      {
        question: "Q1：チェックイン、チェックアウトの時間は何時ですか？レイトチェックアウトは可能ですか？",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}><strong>標準時間：</strong>チェックインは 15:00 - 20:00、チェックアウトは 翌日 11:00 までとなっております。</p>
            <p style={{ marginBottom: '8px' }}><strong>ウェルカムサービス：</strong>15:00 - 18:00 の間にご到着予定の場合、特製のウェルカムティーセットをご用意いたします。事前におおよそのご到着時間をお知らせください。</p>
            <p style={{ marginBottom: '0' }}><strong>レイトチェックアウト：</strong>ご希望の場合は、必ず「前日21:00まで」にバトラーにご確認ください（当日の空室状況によりご希望に添えない場合がございます）。料金は1時間あたり$1,000、4時間を超える場合は1日分の宿泊料となります。</p>
          </>
        )
      },
      {
        question: "Q2：宿泊にあたってデポジットの支払いは必要ですか？返金の基準はどうなっていますか？",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}>上質なご宿泊環境を維持するため、チェックイン時に環境維持デポジットとして <strong>$5,000 TWD（台湾ドル）</strong>をお預かりいたします。</p>
            <p style={{ marginBottom: '8px' }}>チェックアウト日の午後に、バトラーが以下の事項を確認後、ご指定の口座への振込にて全額返金いたします：</p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--text-light)' }}>
              <li style={{ marginBottom: '6px' }}>ゴミが分別され、調理器具や食器類が洗浄されて元の位置に戻されていること。</li>
              <li style={{ marginBottom: '6px' }}>家具、家電、寝具に破損や除去困難な汚れ（ペットの粗相、嘔吐物などによる汚れ）がないこと。</li>
              <li style={{ marginBottom: '6px' }}>室内は電子タバコを含め完全禁煙です。違反された場合は、空気清浄・脱臭費用として「1泊分の室料」を申し受けます。</li>
              <li style={{ marginBottom: '0' }}>危険・違法行為の禁止（花火、線香花火、直火や持ち込みの電磁調理器の使用、薬物等の違法行為は直ちに警察に通報し、宿泊を即時キャンセルとさせていただきます）。</li>
            </ul>
          </>
        )
      },
      {
        question: "Q3：アメニティはどのようなものが用意されていますか？連泊時の交換はありますか？",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}><strong>グリーンツーリズム：</strong>環境保護への取り組みとして、当館では高級バスタオルとフェイスタオルのみをご用意しております。歯ブラシ、ヘアブラシ、ひげ剃りなどの使い捨てアメニティは提供しておりませんので、ご持参くださいますようお願いいたします。</p>
            <p style={{ marginBottom: '0' }}><strong>連泊中のお掃除：</strong>ご滞在中のタオル類の交換やベッドシーツの交換は基本的におこなっておりません。二酸化炭素排出削減へのご協力への感謝として、お得な連泊特別料金を適用させていただいております。</p>
          </>
        )
      },
      {
        question: "Q4：ペット（愛犬）と一緒に宿泊できますか？ルールはありますか？",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}>愛犬のご宿泊も大歓迎です！ただし、ペット同伴可能棟が限定されており、<strong>事前の特別予約が必須</strong>となります。</p>
            <p style={{ marginBottom: '8px' }}><strong>ペット清掃料：</strong>ペット1匹につき1泊 $500 TWD。</p>
            <p style={{ marginBottom: '8px' }}><strong>愛犬との宿泊お約束事項：</strong></p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--text-light)' }}>
              <li style={{ marginBottom: '6px' }}>ペット専用のケージ、ベッド、トイレシート等はご持参ください。</li>
              <li style={{ marginBottom: '6px' }}>ペットをベッドやソファに乗せたり、プール（水遊び場）に入れたりすることは固くお断りいたします。</li>
              <li style={{ marginBottom: '0' }}>排泄物の後始末は随時おこなってください。万が一、施設内を汚されたり臭いが残ったりした場合は、ディープクリーニング費用として $3,000 TWD を請求させていただきます。</li>
            </ul>
          </>
        )
      },
      {
        question: "Q5：施設内でバーベキューやパーティーをする際に注意することはありますか？",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}><strong>出張シェフや外部ケータリング：</strong>外部ケータリング、キッチンカー、パフォーマー等のご利用がある場合は、会場使用料として $1,000 TWD を頂戴いたします。</p>
            <p style={{ marginBottom: '8px' }}><strong>バーベキューのご利用：</strong>安全上の理由から、常設グリルは移動させないようお願いいたします。ご利用後は、キッチンツールや食器類を洗浄して元の位置に戻し、テーブルやゴミの片付けにご協力ください。</p>
            <p style={{ marginBottom: '8px' }}><strong>夜間のマナー：</strong>近隣住民の皆様と静かな夜を共有するため、夜間22:00以降は音量を下げ、会話は室内でお楽しみください。</p>
            <p style={{ marginBottom: '0' }}><strong>ご訪問者様について：</strong>ご宿泊者様以外の訪問は、お一人様につき $500 TWD を頂戴し、22:00までにご退場いただきます。</p>
          </>
        )
      },
      {
        question: "Q6：お湯、プール、階段などの設備を使用する際、安全面の注意点はありますか？",
        answer: (
          <>
            <p style={{ marginBottom: '8px' }}><strong>給湯設備：</strong>当館は貯湯式のボイラーシステムを採用しております。前の方がお湯を大量に使用された場合は、お湯が再び沸くまでに20〜30分ほどお待ちいただくと、より快適にご利用いただけます。</p>
            <p style={{ marginBottom: '8px' }}><strong>お子様の安全：</strong>プール、バスタブ、階段の周辺では、安全で楽しい思い出づくりのため、保護者様がお子様から絶対に目を離さないようお願いいたします（当施設は万が一に備え、公共意外責任保険に加入しております）。</p>
            <p style={{ marginBottom: '0' }}><strong>防犯と安全：</strong>お客様の安全確保とトラブル防止のため、1階の共有スペースおよび公共エリアには防犯カメラを設置しております。また、滑りやすい床面での転倒を防ぐため、ご用意している室内用スリッパをご着用ください（室外への着用はご遠慮ください）。</p>
          </>
        )
      }
    ]
  }
}

// Helper function to dynamically translate a photo manifest item
export function translatePhoto(photo, lang) {
  if (!photo) return null
  const isZH = lang === 'zh'
  const isJA = lang === 'ja'

  let translatedTitle = photo.title
  let translatedDesc = photo.description

  const idNum = photo.id

  if (!isZH) {
    if (photo.category === 'room') {
      translatedTitle = isJA ? `美学空間ディテール ${idNum}` : `Aesthetic Space View ${idNum}`
      translatedDesc = isJA
        ? '陽光が差し込む午後、暮らしの細やかなデザインをじっくりと味わう。'
        : 'Savoring every exquisite design detail in the quiet of a sunlit afternoon.'
    } else if (photo.category === 'interior') {
      translatedTitle = isJA ? `民宿レジャースペース ${idNum}` : `Leisure Living Area ${idNum}`
      translatedDesc = isJA
        ? '心地よい光溢れる空間で、心身を解き放つ静かなひととき。'
        : 'Relaxing body and mind in a beautifully lit, peaceful common area.'
    } else if (photo.category === 'detail') {
      translatedTitle = isJA ? `工芸のディテール ${idNum}` : `Artisanal Detail Shot ${idNum}`
      translatedDesc = isJA
        ? '手の温もりが伝わる手仕事の器や厳選された調度品。'
        : 'Admiring handmade objects and carefully curated textures.'
    }
  }

  return {
    ...photo,
    title: translatedTitle,
    description: translatedDesc
  }
}
