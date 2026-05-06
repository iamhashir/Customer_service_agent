import {getProductById} from './products.js';

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
  gaming: {
    id: 'gaming',
    categoryId: 'computing',
    title: 'gaming',
    matchTerms: ['gaming', 'game', 'games', 'fps', 'gta', 'fortnite', 'valorant'],
    intro:
      'For gaming, we focus on GPU power, refresh rate, and fast storage.',
    recommendedProductIds: ['pc', 'gaming_laptop', 'gaming_monitor', 'gaming_keyboard_mouse'],
  },
  office: {
    id: 'office',
    categoryId: 'computing',
    title: 'office and business use',
    matchTerms: ['office', 'business', 'accounting', 'shop', 'work', 'typing'],
    intro:
      'For office use, reliability, quiet operation, and value matter most.',
    recommendedProductIds: ['office_laptop', 'budget_desktop'],
  },
  student: {
    id: 'student',
    categoryId: 'computing',
    title: 'students and university',
    matchTerms: ['student', 'university', 'college', 'school', 'study', 'uni'],
    intro:
      'For students, we recommend portability, battery life, and enough power for assignments and light gaming.',
    recommendedProductIds: ['office_laptop', 'gaming_laptop', 'anker_p20i'],
  },
  networking: {
    id: 'networking',
    categoryId: 'audio',
    title: 'networking and WiFi',
    matchTerms: ['wifi', 'router', 'internet', 'network', 'networking', 'signal', 'connection'],
    intro:
      'For networking, we recommend routers with strong coverage and modern WiFi 6 support.',
    recommendedProductIds: ['wifi_router'],
  },
};

export const getRecommendationProfile = (profileId) =>
  shoppingNeedProfiles[profileId] || null;

export const detectShoppingNeed = (text) =>
  Object.values(shoppingNeedProfiles).find((profile) =>
    profile.matchTerms.some((term) => text.includes(term)),
  ) || null;

export const buildNeedRecommendationLines = (profile) =>
  profile.recommendedProductIds
    .map((productId) => getProductById(productId))
    .filter(Boolean)
    .map((product) => `${product.shortLabel}: ${product.listDescription}`);
