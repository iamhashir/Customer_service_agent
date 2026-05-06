import {getCategoryById} from '../../content/categories.js';
import {getRecommendationProfile} from '../../content/recommendations.js';
import {getProductById} from '../../content/products.js';
import {
  renderProductIntro,
  renderProductSpecs,
} from '../../renderers/product.js';

export const handleProduct = async ({intent, session, mode}) => {
  const resolvedProduct =
    (intent.productId && getProductById(intent.productId)) ||
    (session.product && getProductById(session.product)) ||
    null;

  if (!resolvedProduct) {
    return [];
  }

  session.step = mode === 'specs' ? 'specs' : 'product_selected';
  session.category = resolvedProduct.category;
  session.product = resolvedProduct.id;

  if (mode === 'specs') {
    return renderProductSpecs({
      product: resolvedProduct,
      category: getCategoryById(resolvedProduct.category),
    });
  }

  return renderProductIntro({
    product: resolvedProduct,
    recommendationProfile: session.shopperNeed
      ? getRecommendationProfile(session.shopperNeed)
      : null,
  });
};
