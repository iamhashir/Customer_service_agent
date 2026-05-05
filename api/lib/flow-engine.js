import {productCatalog} from './catalog.js';
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

const contactButton = () =>
  urlButtonMessage({
    body: 'Need a sales specialist, full catalog, or a custom quote?',
    footer: 'Magnotek',
    displayText: 'Contact us',
    url: 'https://magnotek.vercel.app',
  });

const mainMenu = () =>
  listMessage({
    headerText: 'CSA Store',
    body: 'Choose what you want to explore. We will guide you to specs, price, and the next step.',
    footer: 'Fast product inquiry',
    buttonText: 'Browse products',
    sections: [
      {
        title: 'Products',
        rows: Object.values(productCatalog).map((product) => ({
          id: `product_${product.id}`,
          title: product.shortLabel,
          description: product.listDescription,
        })),
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

const formatProductExamples = (product) =>
  product.examples.map((item) => `- ${item}`).join('\n');

const formatProductSpecs = (product) =>
  product.specs.map((item) => `- ${item}`).join('\n');

const maybeBuildHeroImage = (product) =>
  product.heroImageUrl
    ? imageMessage({
        link: product.heroImageUrl,
        caption: `${product.label}\n${product.summary}`,
      })
    : null;

const buildProductSelectedMessages = (product) => {
  const messages = [];
  const heroImage = maybeBuildHeroImage(product);

  if (heroImage) {
    messages.push(heroImage);
  }

  messages.push(
    interactiveMessage({
      body:
        `${product.label}\n` +
        `${product.summary}\n\n` +
        `Popular picks:\n${formatProductExamples(product)}\n\n` +
        'Choose the next step.',
      footer: 'Guided product flow',
      buttons: [button('action_specs', 'View specs'), button('action_price', 'See price')],
    }),
  );

  return messages;
};

const buildSpecsMessages = (product) => {
  const body =
    `Here are the ${product.label.toLowerCase()} specs:\n\n` +
    `${formatProductSpecs(product)}\n\n` +
    'Built for smooth performance, fast loading, and straightforward buying decisions.';

  return [
    interactiveMessage({
      body:
        product.id === 'pc'
          ? `${body}\n\nWant pricing now or explore headphones as an add-on?`
          : `${body}\n\nWant pricing now or speak to sales?`,
      footer: 'Spec summary',
      buttons:
        product.id === 'pc'
          ? [button('action_price', 'See price'), button('product_headphones', 'Headphones')]
          : [button('action_price', 'See price'), button('decision_human', 'Talk to sales')],
    }),
  ];
};

const buildPricingMessages = (product) => [
  interactiveMessage({
    body:
      `${product.label}\n` +
      `Price range: ${product.priceRange}\n\n` +
      'Final price depends on the exact model, stock, and bundled accessories.\n\n' +
      'Would you like to order now or talk to a human?',
    footer: 'Pricing and conversion',
    buttons: [button('decision_order', 'Order now'), button('decision_human', 'Talk to sales')],
  }),
];

const buildOrderMessages = (product) => [
  interactiveMessage({
    body:
      `Order flow started for ${product.label}.\n\n` +
      'Reply with:\n' +
      '1. Full name\n' +
      '2. Location\n' +
      '3. Preferred model\n\n' +
      'We will prepare the order summary and payment step.',
    footer: 'Order capture',
    buttons: [button('decision_human', 'Talk to sales'), button('main_menu', 'Main menu')],
  }),
];

const buildHumanMessages = (product) => [
  textMessage({
    body:
      `Human handoff requested for ${product.label}.\n\n` +
      'A sales agent should now be assigned. The bot should pause automation for this contact until the handoff is resolved.',
  }),
  contactButton(),
];

const buildFallbackMessages = (session) => [
  interactiveMessage({
    body:
      `I can help with ${session.product ? productCatalog[session.product].label : 'products'}.\n` +
      'Use one of the guided options so I can keep the flow clean and relevant.',
    footer: 'Guided reply',
    buttons: [button('action_specs', 'View specs'), button('action_price', 'See price')],
  }),
];

const mapButtonIntent = (value) => {
  if (value === 'product_pc') {
    return {type: 'product', value: 'pc'};
  }

  if (value === 'product_headphones' || value === 'show_headphones') {
    return {type: 'product', value: 'headphones'};
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

export const runFlow = ({to, message}) => {
  const baseSession = getSession(to);
  const detectedIntent = normalizeIntent(detectIntent(message));

  if (detectedIntent.type === 'navigation' && detectedIntent.value === 'main_menu') {
    resetSession(to);

    return [mainMenu()].map((item) =>
      toOutboundPayload({
        to,
        message: item,
      }),
    );
  }

  if (detectedIntent.type === 'product') {
    const product = productCatalog[detectedIntent.value];
    const session = saveSession(to, {
      flow: 'product_inquiry',
      step: 'product_selected',
      product: product.id,
      handoffRequested: false,
      orderDraft: null,
    });

    console.log(
      JSON.stringify({
        type: 'flow_session',
        phone: to,
        flow: session.flow,
        step: session.step,
        product: session.product,
      }),
    );

    return buildProductSelectedMessages(product).map((item) =>
      toOutboundPayload({
        to,
        message: item,
      }),
    );
  }

  const activeProduct = baseSession.product ? productCatalog[baseSession.product] : null;

  if (!activeProduct) {
    resetSession(to);

    return [mainMenu()].map((item) =>
      toOutboundPayload({
        to,
        message: item,
      }),
    );
  }

  if (detectedIntent.type === 'product_action' && detectedIntent.value === 'specs') {
    saveSession(to, {step: 'specs'});

    return buildSpecsMessages(activeProduct).map((item) =>
      toOutboundPayload({
        to,
        message: item,
      }),
    );
  }

  if (detectedIntent.type === 'product_action' && detectedIntent.value === 'pricing') {
    saveSession(to, {step: 'pricing'});

    return buildPricingMessages(activeProduct).map((item) =>
      toOutboundPayload({
        to,
        message: item,
      }),
    );
  }

  if (detectedIntent.type === 'decision' && detectedIntent.value === 'order') {
    saveSession(to, {
      step: 'order_capture',
      orderDraft: {
        product: activeProduct.id,
      },
    });

    return buildOrderMessages(activeProduct).map((item) =>
      toOutboundPayload({
        to,
        message: item,
      }),
    );
  }

  if (detectedIntent.type === 'decision' && detectedIntent.value === 'human') {
    saveSession(to, {
      step: 'human_handoff',
      handoffRequested: true,
    });

    return buildHumanMessages(activeProduct).map((item) =>
      toOutboundPayload({
        to,
        message: item,
      }),
    );
  }

  return buildFallbackMessages(baseSession).map((item) =>
    toOutboundPayload({
      to,
      message: item,
    }),
  );
};
