import {copyDeck, buttonLabels, footerCopy} from '../content/labels.js';
import {uiActionList, uiList, uiCard} from './ui-types.js';

const formatList = (items) => items.map((item) => `- ${item}`).join('\n');

export const renderMainMenu = ({categories}) => [
  uiCard({
    imageUrl: 'https://meta-setup.vercel.app/assets/al-mafnood-logo.png',
    body: `*${copyDeck.welcomeHeader}*\n\n${copyDeck.welcomeBody}`,
    footer: footerCopy.welcome,
    actions: [
      ...categories.slice(0, 2).map((category) => ({
        id: `category.view:${category.id}`,
        label: category.shortLabel,
      })),
      {id: 'handoff.start', label: buttonLabels.talkToSpecialist},
    ],
  }),
];

export const renderCategoryMenu = ({category, products, recommendationProfile, recommendationLines}) => {
  const recommendationBlock = recommendationProfile
    ? `\n\n💎 *Recommended For You*\n\n${recommendationProfile.intro}\n\n${formatList(
        recommendationLines,
      )}`
    : '';

  return [
    uiList({
      header: category.menuHeader,
      body: `${category.menuIntro}${recommendationBlock}`,
      footer: footerCopy.category,
      buttonLabel: buttonLabels.browseCatalog,
      sections: [
        {
          title: category.label,
          rows: products.map((product) => ({
            id: `product.view:${product.id}`,
            title: product.shortLabel,
            description: product.listDescription,
          })),
        },
        {
          title: 'Navigation',
          rows: [
            {
              id: 'navigation.main_menu',
              title: buttonLabels.mainMenu,
              description: 'Return to the full catalog',
            },
          ],
        },
      ],
    }),
  ];
};

export const renderFallbackMenu = ({product, category}) =>
  product
    ? [
        uiActionList({
          body: `✨ *${product.label}*\n\n${
            category?.fallbackText || 'Choose the next guided step below.'
          }`,
          footer: footerCopy.fallback,
          actions: [
            {id: 'product.specs', label: buttonLabels.technicalDetails},
            {
              id: category?.compareActionId || 'navigation.main_menu',
              label: category?.compareButtonLabel || buttonLabels.mainMenu,
            },
            {id: 'handoff.start', label: buttonLabels.talkToSpecialist},
          ],
        }),
      ]
    : [
        uiActionList({
          body:
            '✨ *Sales Assistant*\n\nIf you would like, I can take you back to the catalog or connect you with a specialist.',
          footer: footerCopy.fallback,
          actions: [
            {id: 'navigation.main_menu', label: buttonLabels.mainMenu},
            {id: 'handoff.start', label: buttonLabels.talkToSpecialist},
          ],
        }),
      ];
