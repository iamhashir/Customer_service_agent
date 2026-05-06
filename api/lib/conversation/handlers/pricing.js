import {getCategoryById} from '../../content/categories.js';
import {getProductById} from '../../content/products.js';
import {renderProductPricing} from '../../renderers/pricing.js';

export const handlePricing = async ({session}) => {
  const product = session.product ? getProductById(session.product) : null;

  if (!product) {
    return [];
  }

  session.step = 'pricing';

  return renderProductPricing({
    product,
    category: getCategoryById(product.category),
  });
};
