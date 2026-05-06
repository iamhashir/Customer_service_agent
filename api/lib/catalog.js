const baseUrl = 'https://meta-setup.vercel.app';

const buildProduct = (config) => ({
  ...config,
  keywords: config.keywords || [],
  specs: config.specs || [],
  examples: config.examples || [],
  benefits: config.benefits || [],
});

export const categoryCatalog = {
  computing: {
    id: 'computing',
    label: 'Gaming PCs',
    shortLabel: 'Gaming PCs',
    menuDescription: 'RTX builds, fast SSD, ready to order',
    menuIntro: 'Choose a PC path and I will move you to specs, pricing, and the next step.',
    productSelectionText: 'Want to see the audio catalog as well?',
    compareButtonId: 'category_audio',
    compareButtonLabel: 'Audio catalog',
    fallbackText: 'Choose specs, price, or go back to the main catalog.',
    keywords: ['pc', 'computer', 'gaming pc', 'gaming desktop'],
  },
  audio: {
    id: 'audio',
    label: 'Audio products',
    shortLabel: 'Audio',
    menuDescription: 'Earbuds, bone conduction, and open-ear options',
    menuIntro: 'Pick the audio product you want and I will keep the next steps focused on that exact model.',
    productSelectionText: 'Want to compare another audio product or continue with this one?',
    compareButtonId: 'category_audio',
    compareButtonLabel: 'More audio',
    fallbackText: 'Choose specs, price, or open the audio catalog again.',
    keywords: [
      'headphone',
      'headphones',
      'headset',
      'earphone',
      'earphones',
      'earbud',
      'earbuds',
      'open ear',
      'bluetooth headphone',
      'bluetooth earphone',
      'audio',
    ],
  },
};

export const productCatalog = {
  pc: buildProduct({
    id: 'pc',
    category: 'computing',
    label: 'Gaming PC',
    shortLabel: 'Gaming PCs',
    summary: 'Prebuilt gaming desktops tuned for smooth 1080p and 1440p play.',
    heroImageUrl:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
    listDescription: 'RTX builds, fast SSD, ready to order',
    valueLine: 'Best for buyers who want a ready-to-go desktop for gaming and daily work.',
    benefits: ['Strong 1080p to 1440p performance', 'Fast SSD loading', 'Straightforward ready-built option'],
    specs: [
      'CPU: Intel i5 / Ryzen 5+',
      'GPU: RTX 3060 to RTX 5060 range',
      'RAM: 16GB to 32GB',
      'Storage: SSD 512GB to 1TB',
    ],
    priceRange: 'AED 3,386.66 to AED 5,592.00',
    examples: [
      'RTX 5060 Gaming PC - AED 5,592.00',
      'HALO X2 Gaming PC - AED 3,386.66',
      'Apex Silver Gaming PC - AED 4,255.32',
    ],
    keywords: ['pc', 'computer', 'gaming pc', 'gaming desktop'],
  }),
  anker_p20i: buildProduct({
    id: 'anker_p20i',
    category: 'audio',
    label: 'soundcore Anker P20i',
    shortLabel: 'Anker P20i',
    summary: 'Budget true wireless earbuds with strong bass and all-day battery backup.',
    heroImageUrl: `${baseUrl}/assets/anker-p20i.jpg`,
    listDescription: 'True wireless earbuds, big bass, 30H playtime',
    valueLine: 'Best for customers who want a budget wireless everyday audio pick.',
    benefits: ['Big bass tuning', 'Long battery backup', 'Clear everyday calls'],
    specs: [
      '10mm drivers with bass-focused tuning',
      'Bluetooth 5.3 for stable pairing',
      'Up to 30 hours total playtime',
      'IPX5 splash resistance',
      '2 mics with AI clear calls',
      '22 preset EQs with app customization',
    ],
    priceRange: 'Ask for live stock pricing',
    examples: ['Daily music and calls', 'Value-focused wireless earbuds', 'Fast simple Bluetooth setup'],
    keywords: ['anker', 'p20i', 'soundcore'],
  }),
  bone_conduction_open_ear: buildProduct({
    id: 'bone_conduction_open_ear',
    category: 'audio',
    label: 'Open Ear Bone Conduction Headphones',
    shortLabel: 'Bone Conduction',
    summary: 'Open-ear sports headphones built for running, awareness, and lighter fit.',
    heroImageUrl: `${baseUrl}/assets/open-ear-bone-conduction.jpg`,
    listDescription: 'Open ear, bone conduction, 9H playtime',
    valueLine: 'Best for running, workouts, and people who want to stay aware outdoors.',
    benefits: ['Open-ear awareness', 'Workout-friendly fit', 'Light sports usage'],
    specs: [
      'Open-ear bone conduction design',
      'Built-in mic for calls',
      'IPX5 water resistance',
      'Up to 9 hours playtime',
      'Suited for running and outdoor workouts',
    ],
    priceRange: 'Ask for live stock pricing',
    examples: ['Running and cycling', 'Outdoor awareness', 'Lightweight sports audio option'],
    keywords: ['bone conduction', 'running headphone', 'sports headphone'],
  }),
  truefree_open_ear: buildProduct({
    id: 'truefree_open_ear',
    category: 'audio',
    label: 'Truefree Open Ear Bluetooth 5.3',
    shortLabel: 'Truefree Open Ear',
    summary: 'Open-ear earhook earbuds with long battery life and clear call performance.',
    heroImageUrl: `${baseUrl}/assets/truefree-open-ear.jpg`,
    listDescription: 'Open ear, 54H playtime, 4 mics, app control',
    valueLine: 'Best for long-use comfort, clearer calls, and extended battery life.',
    benefits: ['54-hour total playtime', '4-mic clearer calling', 'Comfortable earhook fit'],
    specs: [
      'Bluetooth 5.3 wireless connection',
      'Earhook fit with open-ear comfort',
      '16.2mm driver for stereo sound',
      'ENC noise reduction for calls',
      '4 mics for clearer voice pickup',
      'Up to 54 hours total playtime',
      'App control support',
    ],
    priceRange: 'Ask for live stock pricing',
    examples: ['Long-use comfort', 'Battery-first buyers', 'Clear calls plus ambient awareness'],
    keywords: ['truefree', 'earhook', '16.2mm', '54h'],
  }),
};

export const listPrimaryProducts = () =>
  Object.values(productCatalog).map((product) => product.label);

export const getProductById = (productId) => productCatalog[productId] || null;

export const getCategoryById = (categoryId) => categoryCatalog[categoryId] || null;

export const getProductsByCategory = (categoryId) =>
  Object.values(productCatalog).filter((product) => product.category === categoryId);

export const findProductByKeyword = (text) =>
  Object.values(productCatalog).find((product) =>
    product.keywords.some((keyword) => text.includes(keyword)),
  ) || null;

export const findCategoryByKeyword = (text) =>
  Object.values(categoryCatalog).find((category) =>
    category.keywords.some((keyword) => text.includes(keyword)),
  ) || null;
