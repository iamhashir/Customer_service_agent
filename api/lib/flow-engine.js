import {
  categoryCatalog,
  getCategoryById,
  getProductById,
  getProductsByCategory,
  productCatalog,
} from './catalog.js';
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

const contactButton = () =>
  urlButtonMessage({
    body: 'Need a sales specialist, the full catalog, or a custom quote?',
    footer: 'Magnotek',
    displayText: 'Contact us',
    url: 'https://magnotek.vercel.app',
  });

const formatList = (items) => items.map((item) => `- ${item}`).join('\n');

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

const mainMenu = () =>
  listMessage({
    headerText: 'CSA Store',
    body: 'Choose a category and I will guide you to the right product, specs, pricing, and next step.',
    footer: 'Fast product inquiry',
    buttonText: 'Browse catalog',
    sections: [
      {
        title: 'Featured categories',
        rows: buildCategoryRows(),
      },
      {
        title: 'Support',
        rows: [
          {
            id: 'decision_human',
            title: 'Talk to sales',
            description: 'Request a human handoff',
          },
        ],
      },
    ],
  });

const categoryMenu = (category) =>
  listMessage({
    headerText: category.label,
    body: category.menuIntro,
    footer: 'Guided category flow',
    buttonText: 'Choose product',
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
            title: 'Main menu',
            description: 'Go back to the top-level catalog',
          },
        ],
      },
    ],
  });

const buildHeroImage = (product) =>
  product.heroImageUrl
    ? imageMessage({
        link: product.heroImageUrl,
        caption: `${product.label}\n${product.summary}\n\nHighlights:\n${formatList(product.specs.slice(0, 4))}`,
      })
    : null;

const buildOverviewBody = (product) =>
  [
    product.label,
    product.summary,
    '',
    `Best for: ${product.valueLine}`,
    '',
    `Top benefits:\n${formatList(product.benefits)}`,
  ].join('\n');

const buildSpecsBody = (product) =>
  [
    `Here are the ${product.label.toLowerCase()} specs:`,
    '',
    formatList(product.specs),
    '',
    'Use the next step below to keep the conversation moving.',
  ].join('\n');

const buildPricingBody = (product) =>
  [
    product.label,
    `Price: ${product.priceRange}`,
    '',
    'Final pricing depends on stock, exact variant, and any bundled accessories.',
    '',
    'Would you like to order now or talk to sales?',
  ].join('\n');

const buildOrderBody = (product) =>
  [
    `Order flow started for ${product.label}.`,
    '',
    'Reply with:',
    '1. Full name',
    '2. Location',
    '3. Preferred model or color',
    '',
    'I will keep the summary ready for a sales handoff.',
  ].join('\n');

const buildProductMessages = (product) => {
  const category = getCategoryById(product.category);
  const messages = [];
  const hero = buildHeroImage(product);

  if (hero) {
    messages.push(hero);
  }

  messages.push(
    interactiveMessage({
      body: buildOverviewBody(product),
      footer: 'Guided product flow',
      buttons: [button('action_specs', 'View specs'), button('action_price', 'See price')],
    }),
  );

  if (category?.compareButtonId && category?.compareButtonLabel) {
    messages.push(
      interactiveMessage({
        body: category.productSelectionText,
        footer: 'Quick compare',
        buttons: [
          button(category.compareButtonId, category.compareButtonLabel),
          button('decision_human', 'Talk to sales'),
        ],
      }),
    );
  }

  return messages;
};

const buildSpecsMessages = (product) => {
  const category = getCategoryById(product.category);

  return [
    interactiveMessage({
      body: buildSpecsBody(product),
      footer: 'Spec summary',
      buttons: [
        button('action_price', 'See price'),
        button(category?.compareButtonId || 'main_menu', category?.compareButtonLabel || 'Main menu'),
      ],
    }),
  ];
};

const buildPricingMessages = (product) => [
  interactiveMessage({
    body: buildPricingBody(product),
    footer: 'Pricing and conversion',
    buttons: [button('decision_order', 'Order now'), button('decision_human', 'Talk to sales')],
  }),
];

const buildOrderMessages = (product) => [
  interactiveMessage({
    body: buildOrderBody(product),
    footer: 'Order capture',
    buttons: [button('decision_human', 'Talk to sales'), button('main_menu', 'Main menu')],
  }),
];

const buildHumanMessages = (product) => [
  textMessage({
    body: product
      ? `Human handoff requested for ${product.label}.\n\nA sales agent should now continue this conversation with the relevant product context.`
      : 'Human handoff requested.\n\nA sales agent should now continue this conversation and qualify the customer need directly.',
  }),
  contactButton(),
];

const buildFallbackMessages = (product) => {
  const category = product ? getCategoryById(product.category) : null;

  return [
    interactiveMessage({
      body: product
        ? `I can keep helping with ${product.label}.\n${category?.fallbackText || 'Choose the next guided step below.'}`
        : 'Choose a category and I will keep the flow clean and relevant.',
      footer: 'Guided reply',
      buttons: product
        ? [
            button('action_specs', 'View specs'),
            button(category?.compareButtonId || 'main_menu', category?.compareButtonLabel || 'Main menu'),
          ]
        : [button('main_menu', 'Main menu'), button('decision_human', 'Talk to sales')],
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

const saveCategorySession = (to, categoryId) =>
  saveSession(to, {
    ...sessionBaseState,
    step: `category_${categoryId}`,
    category: categoryId,
    product: null,
  });

const saveProductSession = (to, product) =>
  saveSession(to, {
    ...sessionBaseState,
    step: 'product_selected',
    category: product.category,
    product: product.id,
  });

export const runFlow = ({to, message}) => {
  const baseSession = getSession(to);
  const detectedIntent = normalizeIntent(detectIntent(message));

  if (detectedIntent.type === 'navigation' && detectedIntent.value === 'main_menu') {
    resetSession(to);
    return toPayloads(to, [mainMenu()]);
  }

  if (detectedIntent.type === 'category') {
    const category = getCategoryById(detectedIntent.value);

    if (!category) {
      resetSession(to);
      return toPayloads(to, [mainMenu()]);
    }

    saveCategorySession(to, category.id);
    return toPayloads(to, [categoryMenu(category)]);
  }

  if (detectedIntent.type === 'product') {
    const product = getProductById(detectedIntent.value);

    if (!product) {
      resetSession(to);
      return toPayloads(to, [mainMenu()]);
    }

    const session = saveProductSession(to, product);

    console.log(
      JSON.stringify({
        type: 'flow_session',
        phone: to,
        flow: session.flow,
        step: session.step,
        category: session.category,
        product: session.product,
      }),
    );

    return toPayloads(to, buildProductMessages(product));
  }

  if (detectedIntent.type === 'decision' && detectedIntent.value === 'human' && !baseSession.product) {
    saveSession(to, {
      ...sessionBaseState,
      step: 'human_handoff',
      category: baseSession.category || null,
      product: null,
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
    return toPayloads(to, [categoryMenu(category)]);
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
