const baseUrl = 'https://meta-setup.vercel.app';

const buildProduct = (config) => ({
  ...config,
  keywords: config.keywords || [],
  specs: config.specs || [],
  benefits: config.benefits || [],
  idealFor: config.idealFor || [],
  customerLikes: config.customerLikes || [],
  included: config.included || [],
});

export const productCatalog = {
  // ─── COMPUTING CATEGORY ─────────────────────────────────────────────

  pc: buildProduct({
    id: 'pc',
    category: 'computing',
    label: 'TRUE NORT HyperVault Obsidian Gaming PC',
    shortLabel: 'HyperVault White PC',
    summary:
      'Premium white RGB gaming desktop built around Ryzen 5 7600X and RTX 5060 graphics for high-refresh 1080p and strong 1440p play.',
    heroImageUrl: `${baseUrl}/assets/true-nort-hypervault-obsidian-white-pc.jpg`,
    listDescription:
      'Ryzen 5 7600X, RTX 5060, 16GB RAM, 1TB SSD, white RGB',
    valueLine:
      'A clean premium gaming build for buyers who want fast load times, modern graphics, and a polished white setup.',
    idealFor: [
      'Competitive 1080p and 1440p gaming',
      'Streaming and multitasking',
      'Buyers building a white RGB desk setup',
    ],
    benefits: [
      'AMD Ryzen 5 7600X gaming performance',
      'NVIDIA GeForce RTX 5060 graphics',
      'Fast 1TB NVMe SSD with Windows 11 Pro ready to go',
    ],
    customerLikes: [
      'Premium white RGB chassis styling',
      'Strong day-one gaming performance',
      'Clean modern build with fast boot and app loading',
    ],
    specs: [
      'CPU: AMD Ryzen 5 7600X',
      'GPU: NVIDIA GeForce RTX 5060',
      'RAM: 16GB high-speed memory',
      'Storage: 1TB NVMe SSD',
      'OS: Windows 11 Pro',
      'Case: Premium Obsidian White RGB gaming case',
    ],
    priceRange: 'Ask for current in-store pricing',
    included: [
      'Configured gaming desktop',
      'Power cable',
      'Windows 11 Pro preinstalled',
      'Standard warranty coverage',
    ],
    availabilityNote:
      'Stock depends on RTX 5060 allocation and current white case availability.',
    deliveryEstimate: '2-4 business days within UAE depending on stock confirmation.',
    keywords: [
      'pc',
      'computer',
      'gaming pc',
      'gaming desktop',
      'ryzen',
      'rtx 5060',
      'true nort',
      'hypervault',
    ],
  }),

  gaming_laptop: buildProduct({
    id: 'gaming_laptop',
    category: 'computing',
    label: 'ASUS TUF Gaming A15 Laptop',
    shortLabel: 'TUF Gaming A15',
    summary:
      'Battle-tested gaming laptop with Ryzen 7 and RTX 4060 for portable 1080p gaming, streaming, and university work.',
    heroImageUrl: `${baseUrl}/assets/gaming-laptop.png`,
    listDescription:
      'Ryzen 7, RTX 4060, 16GB RAM, 512GB SSD, 144Hz display',
    valueLine:
      'A durable gaming laptop that handles AAA titles, content creation, and daily uni work without slowing down.',
    idealFor: [
      'Portable gaming on the go',
      'University students who game',
      'Content creators needing GPU power',
    ],
    benefits: [
      'AMD Ryzen 7 processor for multitasking',
      'NVIDIA RTX 4060 laptop GPU',
      '144Hz IPS display for smooth gameplay',
    ],
    customerLikes: [
      'MIL-STD-810H military-grade durability',
      'Good battery life for a gaming laptop',
      'Runs cool under sustained gaming loads',
    ],
    specs: [
      'CPU: AMD Ryzen 7 7735HS',
      'GPU: NVIDIA GeForce RTX 4060 (8GB)',
      'RAM: 16GB DDR5',
      'Storage: 512GB NVMe SSD',
      'Display: 15.6" FHD 144Hz IPS',
      'OS: Windows 11 Home',
      'Battery: Up to 8 hours mixed use',
    ],
    priceRange: 'Ask for current in-store pricing',
    included: [
      'Gaming laptop',
      'Power adapter (200W)',
      'Windows 11 preinstalled',
      'Standard warranty coverage',
    ],
    availabilityNote: 'Popular model — stock moves fast during back-to-school season.',
    deliveryEstimate: '1-3 business days within UAE.',
    keywords: ['asus', 'tuf', 'gaming laptop', 'laptop gaming', 'a15'],
  }),

  office_laptop: buildProduct({
    id: 'office_laptop',
    category: 'computing',
    label: 'Lenovo IdeaPad Slim 3 Office Laptop',
    shortLabel: 'IdeaPad Slim 3',
    summary:
      'Lightweight everyday laptop for office work, browsing, and video calls. Reliable performance at a practical price.',
    heroImageUrl: `${baseUrl}/assets/office-laptop.png`,
    listDescription:
      'Intel i5, 8GB RAM, 256GB SSD, 15.6" FHD, lightweight',
    valueLine:
      'The go-to choice for professionals and students who need a reliable daily driver without overspending.',
    idealFor: [
      'Office and productivity work',
      'Students and daily browsing',
      'Video calls and presentations',
    ],
    benefits: [
      'Intel Core i5 12th Gen efficiency',
      'Slim and lightweight at 1.7kg',
      'Full HD anti-glare display',
    ],
    customerLikes: [
      'Quiet fan and cool operation',
      'Long battery life for meetings',
      'Fast boot with SSD storage',
    ],
    specs: [
      'CPU: Intel Core i5-1235U',
      'RAM: 8GB DDR4',
      'Storage: 256GB NVMe SSD',
      'Display: 15.6" FHD Anti-Glare',
      'OS: Windows 11 Home',
      'Weight: 1.7 kg',
      'Battery: Up to 10 hours',
    ],
    priceRange: 'Ask for current in-store pricing',
    included: [
      'Laptop',
      'Power adapter (65W)',
      'Windows 11 preinstalled',
      'Standard warranty coverage',
    ],
    availabilityNote: 'Always in stock — our most requested office laptop.',
    deliveryEstimate: '1-2 business days within UAE.',
    keywords: ['lenovo', 'ideapad', 'office laptop', 'work laptop', 'slim', 'business laptop'],
  }),

  budget_desktop: buildProduct({
    id: 'budget_desktop',
    category: 'computing',
    label: 'Al-Mafnood Office Desktop Bundle',
    shortLabel: 'Office Desktop',
    summary:
      'Complete office desktop setup with monitor, keyboard, and mouse. Built for daily business use, accounting, and browsing.',
    heroImageUrl: `${baseUrl}/assets/budget-desktop.png`,
    listDescription:
      'Intel i3, 8GB RAM, 256GB SSD, 22" monitor, KB+mouse',
    valueLine:
      'A ready-to-use office setup for shops, offices, and reception desks. Plug in and start working.',
    idealFor: [
      'Small business and shop counters',
      'Accounting and invoicing',
      'Reception and front-desk use',
    ],
    benefits: [
      'Complete bundle — no extra purchases needed',
      'Intel i3 handles office tasks smoothly',
      'Compact case saves desk space',
    ],
    customerLikes: [
      'Everything included out of the box',
      'Quiet operation for office environments',
      'Easy to upgrade RAM and storage later',
    ],
    specs: [
      'CPU: Intel Core i3-12100',
      'RAM: 8GB DDR4',
      'Storage: 256GB NVMe SSD',
      'Display: 22" FHD Monitor included',
      'Peripherals: USB Keyboard + Mouse included',
      'OS: Windows 11 Pro',
      'Case: Compact Mini-Tower',
    ],
    priceRange: 'Ask for current in-store pricing',
    included: [
      'Desktop PC',
      '22" FHD Monitor',
      'USB Keyboard and Mouse',
      'All cables',
      'Windows 11 Pro preinstalled',
      'Standard warranty coverage',
    ],
    availabilityNote: 'Custom-built in-store. Ready in 1-2 days.',
    deliveryEstimate: '2-3 business days within UAE.',
    keywords: ['office pc', 'desktop', 'budget pc', 'office desktop', 'bundle', 'i3'],
  }),

  // ─── ACCESSORIES & NETWORKING CATEGORY ──────────────────────────────

  anker_p20i: buildProduct({
    id: 'anker_p20i',
    category: 'audio',
    label: 'soundcore Anker P20i',
    shortLabel: 'Anker P20i',
    summary:
      'Powerful everyday wireless earbuds designed for deep bass, stable connectivity, and long battery life.',
    heroImageUrl: `${baseUrl}/assets/anker-p20i.jpg`,
    listDescription:
      'Deep bass earbuds, Bluetooth 5.3, up to 30H battery',
    valueLine:
      'A reliable everyday audio pick for calls, commuting, workouts, and casual listening.',
    idealFor: ['Daily music listening', 'Calls and meetings', 'Gym and travel use'],
    benefits: [
      '10mm dynamic bass drivers',
      'Bluetooth 5.3 fast pairing',
      'Up to 30 hours total battery',
    ],
    customerLikes: [
      'Strong bass performance',
      'Reliable battery backup',
      'Smooth Android and iPhone connectivity',
    ],
    specs: [
      '10mm drivers with bass-focused tuning',
      'Bluetooth 5.3 for stable pairing',
      'Up to 30 hours total playtime',
      'IPX5 water resistance',
      '2 mics with AI clear calls',
      '22 preset EQs with app customization',
    ],
    priceRange: 'Ask for current in-store pricing',
    included: [
      'Charging case',
      'USB-C charging cable',
      'Ear tips',
      'Standard warranty coverage',
    ],
    availabilityNote: 'Frequently requested model with fast-moving stock.',
    deliveryEstimate: '1-2 business days within UAE.',
    keywords: ['anker', 'p20i', 'soundcore', 'earbuds', 'earbud'],
  }),

  bone_conduction_open_ear: buildProduct({
    id: 'bone_conduction_open_ear',
    category: 'audio',
    label: 'Open Ear Bone Conduction Headphones',
    shortLabel: 'Bone Conduction',
    summary:
      'Open-ear sports headphones built for running, outdoor awareness, and lighter all-day wear.',
    heroImageUrl: `${baseUrl}/assets/open-ear-bone-conduction.jpg`,
    listDescription: 'Open-ear sports model, IPX5, up to 9H battery',
    valueLine:
      'Designed for customers who prioritize movement, situational awareness, and lighter sports use.',
    idealFor: [
      'Running and outdoor workouts',
      'Cycling and walking',
      'Users who prefer open-ear awareness',
    ],
    benefits: [
      'Open-ear bone conduction design',
      'IPX5 workout-friendly protection',
      'Lightweight daily sports use',
    ],
    customerLikes: [
      'Awareness outdoors',
      'Comfort for movement',
      'Simple workout-focused design',
    ],
    specs: [
      'Open-ear bone conduction design',
      'Built-in mic for calls',
      'IPX5 water resistance',
      'Up to 9 hours playtime',
      'Suited for running and outdoor workouts',
    ],
    priceRange: 'Ask for current in-store pricing',
    included: ['Charging cable', 'User guide', 'Standard warranty coverage'],
    availabilityNote: 'Best suited for sports and outdoor-use enquiries.',
    deliveryEstimate: '1-2 business days within UAE.',
    keywords: ['bone conduction', 'running headphone', 'sports headphone'],
  }),

  truefree_open_ear: buildProduct({
    id: 'truefree_open_ear',
    category: 'audio',
    label: 'Truefree Open Ear Bluetooth 5.3',
    shortLabel: 'Truefree Open Ear',
    summary:
      'Open-ear earhook earbuds with long battery life, strong call clarity, and comfortable all-day wear.',
    heroImageUrl: `${baseUrl}/assets/truefree-open-ear.jpg`,
    listDescription: 'Open-ear earhook, 54H battery, 4-mic calls',
    valueLine:
      'A strong all-rounder for customers who want comfort, longer battery life, and better call support.',
    idealFor: ['Work and calls', 'Long daily wear', 'Battery-focused buyers'],
    benefits: [
      'Up to 54 hours total playtime',
      '4-mic clearer call pickup',
      'Comfortable earhook fit',
    ],
    customerLikes: [
      'Long battery life',
      'Comfortable fit for extended use',
      'Better clarity during calls',
    ],
    specs: [
      'Bluetooth 5.3 wireless connection',
      'Earhook fit with open-ear comfort',
      '16.2mm driver for stereo sound',
      'ENC noise reduction for calls',
      '4 mics for clearer voice pickup',
      'Up to 54 hours total playtime',
      'App control support',
    ],
    priceRange: 'Ask for current in-store pricing',
    included: [
      'Charging case',
      'Charging cable',
      'User guide',
      'Standard warranty coverage',
    ],
    availabilityNote: 'Popular for comfort-first and call-focused buyers.',
    deliveryEstimate: '1-2 business days within UAE.',
    keywords: ['truefree', 'earhook', '16.2mm', '54h'],
  }),

  gaming_keyboard_mouse: buildProduct({
    id: 'gaming_keyboard_mouse',
    category: 'audio',
    label: 'Redragon S101 Gaming Keyboard & Mouse Combo',
    shortLabel: 'Redragon Combo',
    summary:
      'RGB mechanical-feel gaming keyboard with a high-precision gaming mouse. The go-to starter combo for any gaming setup.',
    heroImageUrl: `${baseUrl}/assets/gaming-keyboard-mouse.png`,
    listDescription: 'RGB keyboard + 3200 DPI mouse, wired combo',
    valueLine:
      'Everything you need to start gaming on PC. Solid build quality at a price that makes sense.',
    idealFor: [
      'First-time gaming PC builds',
      'Budget-conscious gamers',
      'Office users who want a better typing feel',
    ],
    benefits: [
      'Full RGB backlighting with effects',
      '3200 DPI optical gaming mouse',
      'Spill-resistant keyboard build',
    ],
    customerLikes: [
      'Satisfying key feel for the price',
      'Mouse fits well in hand',
      'RGB effects look premium on desk',
    ],
    specs: [
      'Keyboard: 104-key membrane with mechanical feel',
      'Backlighting: Full RGB with 8 modes',
      'Mouse: 3200 DPI optical sensor',
      'Mouse Buttons: 6 programmable',
      'Connection: USB wired (both)',
      'Cable: Braided for durability',
    ],
    priceRange: 'Ask for current in-store pricing',
    included: [
      'Gaming keyboard',
      'Gaming mouse',
      'User guide',
      'Standard warranty coverage',
    ],
    availabilityNote: 'Always in stock. Best-selling gaming accessory.',
    deliveryEstimate: '1-2 business days within UAE.',
    keywords: ['keyboard', 'mouse', 'redragon', 'combo', 'gaming keyboard', 'gaming mouse', 's101'],
  }),

  wifi_router: buildProduct({
    id: 'wifi_router',
    category: 'audio',
    label: 'TP-Link Archer AX55 WiFi 6 Router',
    shortLabel: 'Archer AX55 Router',
    summary:
      'Dual-band WiFi 6 router with wide coverage, fast speeds, and easy app setup. Handles 40+ devices for homes and offices.',
    heroImageUrl: `${baseUrl}/assets/wifi-router.png`,
    listDescription: 'WiFi 6, dual-band, 3Gbps, covers large spaces',
    valueLine:
      'Reliable internet for the whole house or office. No dead zones, no buffering.',
    idealFor: [
      'Home WiFi upgrades',
      'Small office networking',
      'Gamers needing low-latency connections',
    ],
    benefits: [
      'WiFi 6 (AX3000) with OFDMA technology',
      'Dual-band up to 3 Gbps combined speed',
      '4 high-gain antennas for full coverage',
    ],
    customerLikes: [
      'Easy setup with Tether app',
      'Handles many devices without lag',
      'Strong signal through walls',
    ],
    specs: [
      'Standard: WiFi 6 (802.11ax)',
      'Speed: Up to 3 Gbps dual-band',
      'Antennas: 4 external high-gain',
      'Ports: 1 Gigabit WAN + 4 Gigabit LAN',
      'USB: 1x USB 3.0 for file sharing',
      'Security: WPA3 encryption',
      'Coverage: Up to 2500 sq ft',
    ],
    priceRange: 'Ask for current in-store pricing',
    included: [
      'Router unit',
      'Power adapter',
      'Ethernet cable',
      'Quick setup guide',
      'Standard warranty coverage',
    ],
    availabilityNote: 'In stock. We also do on-site installation.',
    deliveryEstimate: '1-2 business days within UAE.',
    keywords: ['router', 'wifi', 'tp-link', 'archer', 'networking', 'wifi 6', 'mesh'],
  }),

  gaming_monitor: buildProduct({
    id: 'gaming_monitor',
    category: 'audio',
    label: 'MSI Optix G27C4 27" Curved Gaming Monitor',
    shortLabel: 'MSI 27" Curved',
    summary:
      'Curved 27-inch 165Hz gaming monitor with 1ms response time. Immersive visuals for competitive and casual gaming.',
    heroImageUrl: `${baseUrl}/assets/gaming-monitor.png`,
    listDescription: '27" curved, 165Hz, 1ms, FHD, AMD FreeSync',
    valueLine:
      'A monitor that makes games look and feel better. Curved display pulls you into the action.',
    idealFor: [
      'Competitive FPS and racing games',
      'Immersive single-player experiences',
      'Dual-monitor desk setups',
    ],
    benefits: [
      '165Hz refresh rate for buttery-smooth visuals',
      '1ms response time — no ghosting',
      '1500R curve for immersive field of view',
    ],
    customerLikes: [
      'Colors pop right out of the box',
      'Curve makes a big difference in gaming',
      'Thin bezels look clean on any desk',
    ],
    specs: [
      'Panel: 27" VA Curved (1500R)',
      'Resolution: 1920x1080 FHD',
      'Refresh Rate: 165Hz',
      'Response Time: 1ms (MPRT)',
      'Sync: AMD FreeSync Premium',
      'Ports: 2x HDMI, 1x DisplayPort',
      'VESA: 100x100mm mount ready',
    ],
    priceRange: 'Ask for current in-store pricing',
    included: [
      'Monitor with stand',
      'HDMI cable',
      'Power cable',
      'Quick setup guide',
      'Standard warranty coverage',
    ],
    availabilityNote: 'In stock. Monitor arms also available separately.',
    deliveryEstimate: '1-3 business days within UAE.',
    keywords: ['monitor', 'gaming monitor', 'msi', 'curved', '27 inch', '165hz', 'screen'],
  }),
};

export const listPrimaryProducts = () =>
  Object.values(productCatalog).map((product) => product.label);

export const getProductById = (productId) => productCatalog[productId] || null;

export const getProductsByCategory = (categoryId) =>
  Object.values(productCatalog).filter((product) => product.category === categoryId);

export const findProductByKeyword = (text) =>
  Object.values(productCatalog).find((product) =>
    product.keywords.some((keyword) => text.includes(keyword)),
  ) || null;
