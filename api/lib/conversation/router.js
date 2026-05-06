export const routeIntent = (intent, session) => {
  switch (intent.type) {
    case 'navigation.main_menu':
      return {handler: 'category', mode: 'main_menu'};
    case 'category.view':
      return {handler: 'category', mode: 'category'};
    case 'recommendation.view':
      return {handler: 'category', mode: 'recommendation'};
    case 'product.view':
      return {handler: 'product', mode: 'intro'};
    case 'product.specs':
      return {handler: 'product', mode: 'specs'};
    case 'product.pricing':
      return {handler: 'pricing', mode: 'pricing'};
    case 'product.compare':
      return {handler: 'category', mode: 'compare'};
    case 'order.start':
      return {handler: 'order', mode: 'order'};
    case 'handoff.start':
      return {handler: 'handoff', mode: 'handoff'};
    default:
      return session?.product
        ? {handler: 'category', mode: 'fallback'}
        : {handler: 'category', mode: 'main_menu'};
  }
};
