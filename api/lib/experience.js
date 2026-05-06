import {getProductById} from './catalog.js';

export const buttonLabels = {
  browseCatalog: 'Explore Models',
  technicalDetails: 'Technical Details',
  checkAvailability: 'Check Availability',
  orderNow: 'Order Now',
  compareModels: 'Compare Models',
  talkToSpecialist: 'Talk to Specialist',
  connectSpecialist: 'Connect Specialist',
  mainMenu: 'Main Menu',
  exploreAudio: 'Explore Audio',
};

export const footerCopy = {
  welcome: 'Premium guidance',
  category: 'Curated collection',
  product: 'Guided shopping',
  specs: 'Technical details',
  pricing: 'Availability and pricing',
  order: 'Ordering support',
  fallback: 'Sales assistant',
  specialist: 'Personal assistance',
};

export const copyDeck = {
  welcomeHeader: 'CSA Store',
  welcomeBody:
    'Welcome to CSA Store.\nPremium tech products with guided recommendations.\n\nSelect a category to continue.',
  specialistBody:
    'Need personal assistance?\n\nOur product specialist can help with:\n- Product comparisons\n- Availability checks\n- Bulk orders\n- Business purchases\n- Faster recommendations',
};

export const shoppingNeedProfiles = {
  gym: {
    id: 'gym',
    categoryId: 'audio',
    title: 'gym use',
    matchTerms: ['gym', 'workout', 'exercise', 'training'],
    intro:
      'For gym use, we usually prioritize fit, water resistance, and battery stability.',
    recommendedProductIds: ['bone_conduction_open_ear', 'anker_p20i'],
  },
  running: {
    id: 'running',
    categoryId: 'audio',
    title: 'running and outdoor use',
    matchTerms: ['running', 'jogging', 'sports', 'outdoor'],
    intro:
      'For running and outdoor use, open-ear comfort and awareness usually matter most.',
    recommendedProductIds: ['bone_conduction_open_ear', 'truefree_open_ear'],
  },
  calls: {
    id: 'calls',
    categoryId: 'audio',
    title: 'calls and daily work',
    matchTerms: ['call', 'calls', 'meeting', 'meetings', 'office', 'work'],
    intro:
      'For calls and daily work, microphone clarity, comfort, and stable battery are the main priorities.',
    recommendedProductIds: ['truefree_open_ear', 'anker_p20i'],
  },
  travel: {
    id: 'travel',
    categoryId: 'audio',
    title: 'travel and long battery use',
    matchTerms: ['travel', 'battery', 'long battery', 'trip'],
    intro:
      'For travel, we normally recommend models with stronger battery backup and comfortable long wear.',
    recommendedProductIds: ['truefree_open_ear', 'anker_p20i'],
  },
  bass: {
    id: 'bass',
    categoryId: 'audio',
    title: 'bass-focused listening',
    matchTerms: ['bass', 'music', 'deep bass'],
    intro:
      'For bass-focused listening, we usually start with drivers tuned for stronger low-end response.',
    recommendedProductIds: ['anker_p20i'],
  },
};

export const detectShoppingNeed = (text) =>
  Object.values(shoppingNeedProfiles).find((profile) =>
    profile.matchTerms.some((term) => text.includes(term)),
  ) || null;

export const buildNeedRecommendationLines = (profile) =>
  profile.recommendedProductIds
    .map((productId) => getProductById(productId))
    .filter(Boolean)
    .map((product) => `${product.shortLabel}: ${product.listDescription}`);
