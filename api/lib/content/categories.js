export const categoryCatalog = {
  computing: {
    id: 'computing',
    label: 'PCs & Laptops',
    shortLabel: 'PCs & Laptops',
    menuHeader: 'Computers & Laptops',
    menuDescription:
      'Custom gaming builds, office laptops, and workstations in stock',
    menuIntro:
      'We build, sell, and repair all types of computers.\nChoose a category to view live stock, pricing, and specs.',
    compareActionId: 'category.view:audio',
    compareButtonLabel: 'Shop Accessories',
    fallbackText:
      'You can review full specs, check live stock, or explore another category.',
    keywords: ['pc', 'computer', 'gaming pc', 'gaming desktop', 'laptop', 'build', 'workstation'],
  },
  audio: {
    id: 'audio',
    label: 'Accessories & Networking',
    shortLabel: 'Accessories',
    menuHeader: 'Tech Accessories',
    menuDescription:
      'Headphones, routers, cables, and CCTV equipment',
    menuIntro:
      'From gaming headsets to office networking gear.\nChoose what you need for your setup.',
    compareActionId: 'category.view:audio',
    compareButtonLabel: 'Compare Models',
    fallbackText:
      'You can review full specs, check live stock, or compare other accessories.',
    keywords: [
      'headphone',
      'headphones',
      'headset',
      'router',
      'cctv',
      'cable',
      'networking',
      'wifi',
      'mouse',
      'keyboard',
      'audio',
    ],
  },
};

export const getCategoryById = (categoryId) => categoryCatalog[categoryId] || null;

export const findCategoryByKeyword = (text) =>
  Object.values(categoryCatalog).find((category) =>
    category.keywords.some((keyword) => text.includes(keyword)),
  ) || null;
