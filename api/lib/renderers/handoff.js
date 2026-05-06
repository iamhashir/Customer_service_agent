import {buttonLabels, copyDeck, footerCopy} from '../content/labels.js';
import {uiLink, uiText} from './ui-types.js';

export const renderHandoff = ({product}) => [
  uiText({
    body: product
      ? `👨‍💼 *You’re Being Connected To A Product Specialist*\n\nFor: *${product.label}*\n\nThey can help with:\n- Comparisons\n- Live availability\n- Business purchases\n- Final order support`
      : '👨‍💼 *You’re Being Connected To A Product Specialist*\n\nThey can help with:\n- Comparisons\n- Live availability\n- Business purchases\n- Final order support',
  }),
  uiLink({
    body: copyDeck.specialistBody,
    label: buttonLabels.connectSpecialist,
    url: 'https://magnotek.vercel.app',
    footer: footerCopy.specialist,
  }),
];
