import {findCategoryByKeyword} from '../content/categories.js';
import {findProductByKeyword} from '../content/products.js';
import {detectShoppingNeed} from '../content/recommendations.js';

const normalizeText = (value) => value?.trim().toLowerCase() || '';

export const getMessageText = (message) =>
  normalizeText(message?.text?.body || message?.button?.text || '');

export const getInteractiveReplyId = (message) =>
  message?.interactive?.button_reply?.id || message?.interactive?.list_reply?.id || null;

const includesAny = (text, terms) => terms.some((term) => text.includes(term));

const parseButtonIntent = (replyId) => {
  if (replyId.startsWith('product.view:')) {
    return {type: 'product.view', productId: replyId.replace('product.view:', '')};
  }

  if (replyId.startsWith('category.view:')) {
    return {
      type: 'category.view',
      categoryId: replyId.replace('category.view:', ''),
    };
  }

  if (replyId === 'product.specs') {
    return {type: 'product.specs'};
  }

  if (replyId === 'product.pricing') {
    return {type: 'product.pricing'};
  }

  if (replyId === 'order.start') {
    return {type: 'order.start'};
  }

  if (replyId === 'handoff.start') {
    return {type: 'handoff.start'};
  }

  if (replyId === 'navigation.main_menu') {
    return {type: 'navigation.main_menu'};
  }

  return {type: 'button.unknown', value: replyId};
};

export const detectIntent = (message) => {
  const replyId = getInteractiveReplyId(message);

  if (replyId) {
    return parseButtonIntent(replyId);
  }

  const text = getMessageText(message);

  if (!text) {
    return {type: 'unknown', value: ''};
  }

  const matchedProduct = findProductByKeyword(text);
  if (matchedProduct) {
    return {type: 'product.view', productId: matchedProduct.id};
  }

  const matchedNeed = detectShoppingNeed(text);
  if (matchedNeed) {
    return {type: 'recommendation.view', profileId: matchedNeed.id};
  }

  const matchedCategory = findCategoryByKeyword(text);
  if (matchedCategory) {
    return {type: 'category.view', categoryId: matchedCategory.id};
  }

  if (includesAny(text, ['spec', 'details', 'technical'])) {
    return {type: 'product.specs'};
  }

  if (
    includesAny(text, [
      'price',
      'cost',
      'aed',
      'quote',
      'how much',
      'pricing',
      'stock price',
      'availability',
      'available',
    ])
  ) {
    return {type: 'product.pricing'};
  }

  if (includesAny(text, ['compare', 'another', 'other options', 'more options'])) {
    return {type: 'product.compare'};
  }

  if (includesAny(text, ['order', 'buy', 'purchase', 'take it', 'i want this'])) {
    return {type: 'order.start'};
  }

  if (
    includesAny(text, [
      'human',
      'agent',
      'person',
      'sales',
      'representative',
      'specialist',
    ])
  ) {
    return {type: 'handoff.start'};
  }

  if (includesAny(text, ['menu', 'hi', 'hello', 'start', 'catalog'])) {
    return {type: 'navigation.main_menu'};
  }

  return {type: 'unknown', value: text};
};
