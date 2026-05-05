const normalizeText = (value) => value?.trim().toLowerCase() || '';

export const getMessageText = (message) =>
  normalizeText(message?.text?.body || message?.button?.text || '');

export const getInteractiveReplyId = (message) =>
  message?.interactive?.button_reply?.id || message?.interactive?.list_reply?.id || null;

export const detectIntent = (message) => {
  const replyId = getInteractiveReplyId(message);

  if (replyId) {
    return {type: 'button', value: replyId};
  }

  const text = getMessageText(message);

  if (!text) {
    return {type: 'unknown', value: ''};
  }

  if (text.includes('pc') || text.includes('computer') || text.includes('gaming')) {
    return {type: 'product', value: 'pc'};
  }

  if (text.includes('headphone') || text.includes('headset') || text.includes('earphone')) {
    return {type: 'product', value: 'headphones'};
  }

  if (text.includes('spec')) {
    return {type: 'product_action', value: 'specs'};
  }

  if (text.includes('price') || text.includes('cost') || text.includes('aed')) {
    return {type: 'product_action', value: 'pricing'};
  }

  if (text.includes('order') || text.includes('buy')) {
    return {type: 'decision', value: 'order'};
  }

  if (
    text.includes('human') ||
    text.includes('agent') ||
    text.includes('person') ||
    text.includes('sales')
  ) {
    return {type: 'decision', value: 'human'};
  }

  if (text.includes('menu') || text === 'hi' || text === 'hello' || text === 'start') {
    return {type: 'navigation', value: 'main_menu'};
  }

  return {type: 'free_text', value: text};
};
