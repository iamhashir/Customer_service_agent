export const categoryCatalog = {
  computing: {
    id: 'computing',
    label: 'Gaming PCs',
    shortLabel: 'Gaming PCs',
    menuHeader: 'Performance Systems',
    menuDescription:
      'High-performance desktop systems for gaming, streaming, and demanding daily use',
    menuIntro:
      'Curated desktop systems built for performance, thermal stability, and long-term usability.\nChoose a model path to review configuration details, pricing, and ordering support.',
    compareActionId: 'category.view:audio',
    compareButtonLabel: 'Explore Audio',
    fallbackText:
      'You can review technical details, check availability, or explore another category.',
    keywords: ['pc', 'computer', 'gaming pc', 'gaming desktop'],
  },
  audio: {
    id: 'audio',
    label: 'Audio Collection',
    shortLabel: 'Audio',
    menuHeader: 'Audio Collection',
    menuDescription:
      'Wireless earbuds, bone conduction, and open-ear models selected for daily performance',
    menuIntro:
      'From daily-use earbuds to performance-focused open-ear models.\nChoose the type of listening experience you want to explore.',
    compareActionId: 'category.view:audio',
    compareButtonLabel: 'Compare Models',
    fallbackText:
      'You can review technical details, check availability, or compare other models in the collection.',
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

export const getCategoryById = (categoryId) => categoryCatalog[categoryId] || null;

export const findCategoryByKeyword = (text) =>
  Object.values(categoryCatalog).find((category) =>
    category.keywords.some((keyword) => text.includes(keyword)),
  ) || null;
