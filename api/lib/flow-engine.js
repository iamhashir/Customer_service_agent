import {categoryCatalog, getCategoryById, getProductById, getProductsByCategory} from './catalog.js';
import {
  buildNeedRecommendationLines,
  buttonLabels,
  copyDeck,
  detectShoppingNeed,
  footerCopy,
  shoppingNeedProfiles,
} from './experience.js';
import {detectIntent} from './intent.js';
import {getSession, resetSession, saveSession} from './session-store.js';
import {
  button,
  imageMessage,
  interactiveMessage,
  listMessage,
  textMessage,
  toOutboundPayload,
  urlButtonMessage,
} from './whatsapp.js';

const sessionBaseState = {
  flow: 'product_inquiry',
  handoffRequested: false,
  orderDraft: null,
};

const formatList = (items) => items.map((item) => `- ${item}`).join('\n');

const contactButton = () =>
  urlButtonMessage({
    body: copyDeck.specialistBody,
    footer: footerCopy.specialist,
    displayText: buttonLabels.connectSpecialist,
    url: 'https://magnotek.vercel.app',
  });

const buildCategoryRows = () =>
  Object.values(categoryCatalog).map((category) => ({
    id: `category_${category.id}`,
    title: category.label,
    description: category.menuDescription,
  }));

const buildProductRows = (categoryId) =>
  getProductsByCategory(categoryId).map((product) => ({
    id: `product_${product.id}`,
    title: product.shortLabel,
    description: product.listDescription,
  }));

const buildRecommendationBlock = (shopperNeedId) => {
  const profile = shopperNeedProfiles[shopperNeedId];

  if (!profile) {
    return '';
  }

  return [
    '',
    'Recommended for you',
    profile.intro,
    formatList(buildNeedRecommendationLines(profile)),
  ].join('\n');
};

const mainMenu = () =>
  listMessage({
    headerText: copyDeck.welcomeHeader,
    body: copyDeck.welcomeBody,
    footer: footerCopy.welcome,
    buttonText: buttonLabels.browseCatalog,
    sections: [
      {
        title: 'Categories',
        rows: buildCategoryRows(),
      },
      {
        title: 'Specialist Support',
        rows: [
          {
            id: 'decision_human',
            title: buttonLabels.talkToSpecialist,
            description: 'Private guidance for recommendations, pricing, and business enquiries',
          },
        ],
      },
    ],
  });

const categoryMenu = (category, shopperNeedId = null) =>
  listMessage({
    headerText: category.menuHeader,
    body: `${category.menuIntro}${buildRecommendationBlock(shopperNeedId)}`,
    footer: footerCopy.category,
    buttonText: buttonLabels.browseCatalog,
    sections: [
      {
        title: category.label,
        rows: buildProductRows(category.id),
      },
      {
        title: 'Navigation',
        rows: [
          {
            id: 'main_menu',
            title: buttonLabels.mainMenu,
            description: 'Return to the full catalog',
          },
        ],
      },
    ],
  });

const buildHeroImage = (product, shopperNeedId = null) => {
  const profile = shopperNeedProfiles[shopperNeedId];
  const recommendationLine = profile ? `Recommended for ${profile.title}.` : product.valueLine;

  return product.heroImageUrl
    ? imageMessage({
        link: product.heroImageUrl,
        caption: `${product.label}\n${product.summary}\n\n${recommendationLine}`,
      })
    : null;
};

const buildOverviewBody = (product, shopperNeedId = null) => {
  const profile = shopperNeedProfiles[shopperNeedId];
  const recommendationSection = profile
    ? [`Selected with ${profile.title} in mind.`, '']
    : [];

  return [
    product.label,
    '',
    product.summary,
    '',
    ...recommendationSection,
    'Ideal for',
    formatList(product.idealFor),
    '',
    'Key Features',
    formatList(product.benefits),
    '',
    'What customers usually like',
    formatList(product.customerLikes),
  ].join('\n');
};

const buildSpecsBody = (product) =>
  [
    product.label,
    '',
    'Technical Details',
    formatList(product.specs),
    '',
    'If you want pricing and live stock confirmation, use the next step below.',
  ].join('\n');

const buildPricingBody = (product) =>
  [
    product.label,
    '',
    `Current Price: ${product.priceRange}`,
    '',
    'Included',
    formatList(product.included),
    '',
    `Availability: ${product.availabilityNote}`,
    `Estimated delivery: ${product.deliveryEstimate}`,
  ].join('\n');

const buildOrderBody = (product) =>
  [
    'Ready to place your order?',
    '',
    `${product.label} is selected for this order request.`,
    '',
    'Please reply with:',
    '1. Full name',
    '2. Delivery location',
    '3. Preferred model or color',
    '4. Quantity if you need more than one unit',
    '',
    'A specialist can finalize the order, confirm stock, and arrange the next step.',
  ].join('\n');

const buildProductMessages = (product, shopperNeedId = null) => {
  const hero = buildHeroImage(product, shopperNeedId);
  const messages = [];

  if (hero) {
    messages.push(hero);
  }

  messages.push(
    interactiveMessage({
      body: buildOverviewBody(product, shopperNeedId),
      footer: footerCopy.product,
      buttons: [
        button('action_specs', buttonLabels.technicalDetails),
        button('action_price', buttonLabels.checkAvailability),
        button('decision_human', buttonLabels.talkToSpecialist),
      ],
    }),
  );

  return messages;
};

const buildSpecsMessages = (product) => {
  const category = getCategoryById(product.category);

  return [
    interactiveMessage({
      body: buildSpecsBody(product),
      footer: footerCopy.specs,
      buttons: [
        button('action_price', buttonLabels.checkAvailability),
        button(category?.compareButtonId || 'main_menu', category?.compareButtonLabel || buttonLabels.mainMenu),
        button('decision_human', buttonLabels.talkToSpecialist),
      ],
    }),
  ];
};

const buildPricingMessages = (product) => {
  const category = getCategoryById(product.category);

  return [
    interactiveMessage({
      body: buildPricingBody(product),
      footer: footerCopy.pricing,
      buttons: [
        button('decision_order', buttonLabels.orderNow),
        button(category?.compareButtonId || 'main_menu', category?.compareButtonLabel || buttonLabels.mainMenu),
        button('decision_human', buttonLabels.talkToSpecialist),
      ],
    }),
  ];
};

const buildOrderMessages = (product) => [
  interactiveMessage({
    body: buildOrderBody(product),
    footer: footerCopy.order,
    buttons: [
      button('decision_human', buttonLabels.talkToSpecialist),
      button('main_menu', buttonLabels.mainMenu),
    ],
  }),
];

const buildHumanMessages = (product) => [
  textMessage({
    body: product
      ? `You are now being connected to a product specialist for ${product.label}.\n\nThey can help with comparisons, live availability, business purchases, and final order support.`
      : 'You are now being connected to a product specialist.\n\nThey can help with comparisons, live availability, business purchases, and final order support.',
  }),
  contactButton(),
];

const buildFallbackMessages = (product) => {
  const category = product ? getCategoryById(product.category) : null;

  return [
    interactiveMessage({
      body: product
        ? `I can keep helping with ${product.label}.\n${category?.fallbackText || 'Choose the next guided step below.'}`
        : 'If you would like, I can take you back to the catalog or connect you with a specialist.',
      footer: footerCopy.fallback,
      buttons: product
        ? [
            button('action_specs', buttonLabels.technicalDetails),
            button(category?.compareButtonId || 'main_menu', category?.compareButtonLabel || buttonLabels.mainMenu),
            button('decision_human', buttonLabels.talkToSpecialist),
          ]
        : [
            button('main_menu', buttonLabels.mainMenu),
            button('decision_human', buttonLabels.talkToSpecialist),
          ],
    }),
  ];
};

const mapButtonIntent = (value) => {
  if (value.startsWith('product_')) {
    return {type: 'product', value: value.replace('product_', '')};
  }

  if (value.startsWith('category_')) {
    return {type: 'category', value: value.replace('category_', '')};
  }

  if (value === 'action_specs') {
    return {type: 'product_action', value: 'specs'};
  }

  if (value === 'action_price') {
    return {type: 'product_action', value: 'pricing'};
  }

  if (value === 'decision_order') {
    return {type: 'decision', value: 'order'};
  }

  if (value === 'decision_human') {
    return {type: 'decision', value: 'human'};
  }

  if (value === 'main_menu') {
    return {type: 'navigation', value: 'main_menu'};
  }

  return {type: 'button', value};
};

const normalizeIntent = (intent) =>
  intent.type === 'button' ? mapButtonIntent(intent.value) : intent;

const toPayloads = (to, items) =>
  items.map((item) =>
    toOutboundPayload({
      to,
      message: item,
    }),
  );

const saveCategorySession = (to, categoryId, shopperNeedId = null) =>
  saveSession(to, {
    ...sessionBaseState,
    step: `category_${categoryId}`,
    category: categoryId,
    product: null,
    shopperNeed: shopperNeedId,
  });

const saveProductSession = (to, product, shopperNeedId = null) =>
  saveSession(to, {
    ...sessionBaseState,
    step: 'product_selected',
    category: product.category,
    product: product.id,
    shopperNeed: shopperNeedId,
  });

export const runFlow = ({to, message}) => {
  const baseSession = getSession(to);
  const detectedIntent = normalizeIntent(detectIntent(message));

  if (detectedIntent.type === 'navigation' && detectedIntent.value === 'main_menu') {
    resetSession(to);
    return toPayloads(to, [mainMenu()]);
  }

  if (detectedIntent.type === 'shopping_need') {
    const profile = shoppingNeedProfiles[detectedIntent.value];
    const category = profile ? getCategoryById(profile.categoryId) : null;

    if (!profile || !category) {
      resetSession(to);
      return toPayloads(to, [mainMenu()]);
    }

    saveCategorySession(to, category.id, profile.id);
    return toPayloads(to, [categoryMenu(category, profile.id)]);
  }

  if (detectedIntent.type === 'category') {
    const category = getCategoryById(detectedIntent.value);

    if (!category) {
      resetSession(to);
      return toPayloads(to, [mainMenu()]);
    }

    const inferredNeed = detectShoppingNeed(message?.text?.body?.toLowerCase?.() || '');
    const shopperNeedId = inferredNeed?.categoryId === category.id ? inferredNeed.id : baseSession.shopperNeed;

    saveCategorySession(to, category.id, shopperNeedId);
    return toPayloads(to, [categoryMenu(category, shopperNeedId)]);
  }

  if (detectedIntent.type === 'product') {
    const product = getProductById(detectedIntent.value);

    if (!product) {
      resetSession(to);
      return toPayloads(to, [mainMenu()]);
    }

    const session = saveProductSession(to, product, baseSession.shopperNeed);

    console.log(
      JSON.stringify({
        type: 'flow_session',
        phone: to,
        flow: session.flow,
        step: session.step,
        category: session.category,
        product: session.product,
        shopperNeed: session.shopperNeed,
      }),
    );

    return toPayloads(to, buildProductMessages(product, session.shopperNeed));
  }

  if (detectedIntent.type === 'decision' && detectedIntent.value === 'human' && !baseSession.product) {
    saveSession(to, {
      ...sessionBaseState,
      step: 'human_handoff',
      category: baseSession.category || null,
      product: null,
      shopperNeed: baseSession.shopperNeed || null,
      handoffRequested: true,
    });

    return toPayloads(to, buildHumanMessages(null));
  }

  const activeProduct = baseSession.product ? getProductById(baseSession.product) : null;

  if (!activeProduct) {
    resetSession(to);
    return toPayloads(to, [mainMenu()]);
  }

  if (detectedIntent.type === 'product_action' && detectedIntent.value === 'specs') {
    saveSession(to, {step: 'specs'});
    return toPayloads(to, buildSpecsMessages(activeProduct));
  }

  if (detectedIntent.type === 'product_action' && detectedIntent.value === 'pricing') {
    saveSession(to, {step: 'pricing'});
    return toPayloads(to, buildPricingMessages(activeProduct));
  }

  if (detectedIntent.type === 'product_action' && detectedIntent.value === 'compare') {
    const category = getCategoryById(activeProduct.category);
    return toPayloads(to, [categoryMenu(category, baseSession.shopperNeed)]);
  }

  if (detectedIntent.type === 'decision' && detectedIntent.value === 'order') {
    saveSession(to, {
      step: 'order_capture',
      orderDraft: {
        product: activeProduct.id,
      },
    });

    return toPayloads(to, buildOrderMessages(activeProduct));
  }

  if (detectedIntent.type === 'decision' && detectedIntent.value === 'human') {
    saveSession(to, {
      step: 'human_handoff',
      handoffRequested: true,
    });

    return toPayloads(to, buildHumanMessages(activeProduct));
  }

  return toPayloads(to, buildFallbackMessages(activeProduct));
};
