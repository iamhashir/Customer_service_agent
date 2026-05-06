import {findCategoryByKeyword, findProductByKeyword} from './catalog.js';

const normalizeText = (value) => value?.trim().toLowerCase() || '';

export const getMessageText = (message) =>
  normalizeText(message?.text?.body || message?.button?.text || '');

export const getInteractiveReplyId = (message) =>
  message?.interactive?.button_reply?.id || message?.interactive?.list_reply?.id || null;

const includesAny = (text, terms) => terms.some((term) => text.includes(term));

export const detectIntent = (message) => {
  const replyId = getInteractiveReplyId(message);

  if (replyId) {
    return {type: 'button', value: replyId};
  }

  const text = getMessageText(message);

  if (!text) {
    return {type: 'unknown', value: ''};
  }

  const matchedProduct = findProductByKeyword(text);
  if (matchedProduct) {
    return {type: 'product', value: matchedProduct.id};
  }

  const matchedCategory = findCategoryByKeyword(text);
  if (matchedCategory) {
    return {type: 'category', value: matchedCategory.id};
  }

  if (text.includes('spec')) {
    return {type: 'product_action', value: 'specs'};
  }

  if (
    includesAny(text, ['price', 'cost', 'aed', 'quote', 'how much', 'pricing', 'stock price'])
  ) {
    return {type: 'product_action', value: 'pricing'};
  }

  if (includesAny(text, ['compare', 'another', 'other options', 'more options'])) {
    return {type: 'product_action', value: 'compare'};
  }

  if (includesAny(text, ['order', 'buy', 'purchase', 'take it', 'i want this'])) {
    return {type: 'decision', value: 'order'};
  }

  if (includesAny(text, ['human', 'agent', 'person', 'sales', 'representative'])) {
    return {type: 'decision', value: 'human'};
  }

  if (includesAny(text, ['menu', 'hi', 'hello', 'start', 'catalog'])) {
    return {type: 'navigation', value: 'main_menu'};
  }

  return {type: 'free_text', value: text};
};
