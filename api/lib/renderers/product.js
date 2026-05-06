import {buttonLabels, footerCopy} from '../content/labels.js';
import {uiCard, uiImage} from './ui-types.js';

const section = (emoji, title, body) =>
  [`${emoji} *${title.toUpperCase()}*`, '', body, ''].join('\n');

const formatList = (items) => items.map((item) => `🔹 ${item}`).join('\n');

export const renderProductIntro = ({product, recommendationProfile}) => {
  const captionLines = [
    `🖥️ *${product.label}*`,
    '',
    product.listDescription,
    recommendationProfile ? `Recommended for ${recommendationProfile.title}.` : null,
  ].filter(Boolean);

  const introduction = recommendationProfile
    ? `*Selected with ${recommendationProfile.title} in mind.*`
    : '*A strong match based on performance, usability, and overall buying confidence.*';

  return [
    uiImage({
      url: product.heroImageUrl,
      caption: captionLines.join('\n'),
    }),
    uiCard({
      title: `🖥️🖥️ *${product.label.toUpperCase()}*`,
      body: [
        introduction,
        '',
        section('1️⃣', 'Why This Model Stands Out', product.valueLine),
        section('2️⃣', 'Ideal For', formatList(product.idealFor)),
        section('3️⃣', 'Key Features', formatList(product.benefits)),
        section(
          '4️⃣',
          'What Customers Usually Like',
          formatList(product.customerLikes),
        ),
      ].join('\n'),
      footer: footerCopy.product,
      actions: [
        {id: 'product.specs', label: buttonLabels.technicalDetails},
        {id: 'product.pricing', label: buttonLabels.checkAvailability},
        {id: 'handoff.start', label: buttonLabels.talkToSpecialist},
      ],
    }),
  ];
};

export const renderProductSpecs = ({product, category}) => {
  const formatSpecs = formatList(product.specs);

  return [
    uiCard({
      title: `📋📋 *${product.label.toUpperCase()}*`,
      body: [
        section('1️⃣', 'Technical Details', formatSpecs),
        'If you want pricing and live stock confirmation, use the next step below.',
        '',
      ].join('\n'),
      footer: footerCopy.specs,
      actions: [
        {id: 'product.pricing', label: buttonLabels.checkAvailability},
        {
          id: category?.compareActionId || 'navigation.main_menu',
          label: category?.compareButtonLabel || buttonLabels.mainMenu,
        },
        {id: 'handoff.start', label: buttonLabels.talkToSpecialist},
      ],
    }),
  ];
};
