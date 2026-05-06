import {routeIntent} from './router.js';
import {handleCategory} from './handlers/category.js';
import {handleHandoff} from './handlers/handoff.js';
import {handleOrder} from './handlers/order.js';
import {handlePricing} from './handlers/pricing.js';
import {handleProduct} from './handlers/product.js';

export const dispatch = async ({intent, session, message}) => {
  const route = routeIntent(intent, session);

  switch (route.handler) {
    case 'category':
      return handleCategory({intent, session, message, mode: route.mode});
    case 'product':
      return handleProduct({intent, session, message, mode: route.mode});
    case 'pricing':
      return handlePricing({intent, session, message, mode: route.mode});
    case 'order':
      return handleOrder({intent, session, message, mode: route.mode});
    case 'handoff':
      return handleHandoff({intent, session, message, mode: route.mode});
    default:
      return handleCategory({
        intent: {type: 'navigation.main_menu'},
        session,
        message,
        mode: 'main_menu',
      });
  }
};
