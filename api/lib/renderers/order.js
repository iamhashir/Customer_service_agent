import {buttonLabels, footerCopy} from '../content/labels.js';
import {uiCard} from './ui-types.js';

export const renderOrderCapture = ({product}) => [
  uiCard({
    title: '🛒🛒 *READY TO PLACE YOUR ORDER?*',
    body: [
      `${product.label.toUpperCase()} is selected for this order request.`,
      '',
      'Please reply with:',
      '  1️⃣ Full name',
      '  2️⃣ Delivery location',
      '  3️⃣ Preferred model or color',
      '  4️⃣ Quantity if you need more than one unit',
      '',
      'A specialist can finalize the order, confirm stock, and arrange the next step.',
      '',
    ].join('\n'),
    footer: footerCopy.order,
    actions: [
      {id: 'handoff.start', label: buttonLabels.talkToSpecialist},
      {id: 'navigation.main_menu', label: buttonLabels.mainMenu},
    ],
  }),
];
