import {buttonLabels, footerCopy} from '../content/labels.js';
import {uiCard} from './ui-types.js';

const section = (emoji, title, body) =>
  [`${emoji} *${title.toUpperCase()}*`, '', body, ''].join('\n');

const formatList = (items) => items.map((item) => `🔹 ${item}`).join('\n');

export const renderProductPricing = ({product, category}) => [
  uiCard({
    title: `💰💰 *${product.label.toUpperCase()}*`,
    body: [
      `*Current Price:* ${product.priceRange}`,
      '',
      section('1️⃣', 'Included', formatList(product.included)),
      section(
        '2️⃣',
        'Availability',
        `${product.availabilityNote}\n\n*Estimated delivery:* ${product.deliveryEstimate}`,
      ),
    ].join('\n'),
    footer: footerCopy.pricing,
    actions: [
      {id: 'order.start', label: buttonLabels.orderNow},
      {
        id: category?.compareActionId || 'navigation.main_menu',
        label: category?.compareButtonLabel || buttonLabels.mainMenu,
      },
      {id: 'handoff.start', label: buttonLabels.talkToSpecialist},
    ],
  }),
];
