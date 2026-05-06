export const productCatalog = {
  pc: {
    id: 'pc',
    label: 'Gaming PC',
    shortLabel: 'Gaming PCs',
    summary: 'Prebuilt gaming desktops tuned for smooth 1080p and 1440p play.',
    heroImageUrl:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
    listDescription: 'RTX builds, fast SSD, ready to order',
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
  },
  headphones: {
    id: 'headphones',
    label: 'Headphones',
    shortLabel: 'Headphones',
    summary: 'Headphones lineup from budget wireless to premium noise cancelling.',
    heroImageUrl: 'https://meta-setup.vercel.app/headphones.jpg',
    listDescription: 'Wireless, ANC, and budget picks',
    specs: [
      'Premium: Sony WH-1000XM5',
      'Mid-range: JBL Tune 670NC',
      'Budget: Sony WH-CH520',
    ],
    priceRange: 'AED 190.00 to AED 734.58',
    examples: [
      'Sony WH-1000XM5 - AED 734.58',
      'JBL Tune 670NC - AED 349.00',
      'Sony WH-CH520 - AED 190.00',
    ],
  },
};

export const listPrimaryProducts = () =>
  Object.values(productCatalog).map((product) => product.label);
