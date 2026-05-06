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
  pc: buildProduct({
    id: 'pc',
    category: 'computing',
    label: 'TRUE NORT HyperVault Obsidian Gaming PC',
    shortLabel: 'HyperVault White PC',
    summary:
      'Premium white RGB gaming desktop built around Ryzen 5 7600X and RTX 5060 graphics for high-refresh 1080p and strong 1440p play.',
    heroImageUrl: `${baseUrl}/assets/true-nort-hypervault-obsidian-white-pc.jpg`,
    listDescription:
      'Ryzen 5 7600X, RTX 5060, 16GB RAM, 1TB NVMe SSD, white RGB case',
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
  anker_p20i: buildProduct({
    id: 'anker_p20i',
    category: 'audio',
    label: 'soundcore Anker P20i',
    shortLabel: 'Anker P20i',
    summary:
      'Powerful everyday wireless earbuds designed for deep bass, stable connectivity, and long battery life.',
    heroImageUrl: `${baseUrl}/assets/anker-p20i.jpg`,
    listDescription:
      'Deep bass earbuds with compact case and strong daily battery performance',
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
    keywords: ['anker', 'p20i', 'soundcore'],
  }),
  bone_conduction_open_ear: buildProduct({
    id: 'bone_conduction_open_ear',
    category: 'audio',
    label: 'Open Ear Bone Conduction Headphones',
    shortLabel: 'Bone Conduction',
    summary:
      'Open-ear sports headphones built for running, outdoor awareness, and lighter all-day wear.',
    heroImageUrl: `${baseUrl}/assets/open-ear-bone-conduction.jpg`,
    listDescription: 'Workout-focused open-ear model with awareness-friendly fit',
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
    listDescription: 'Open-ear earhook model with extended battery and clearer calling',
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
