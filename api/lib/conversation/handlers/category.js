import {getCategoryById} from '../../content/categories.js';
import {buttonLabels} from '../../content/labels.js';
import {
  buildNeedRecommendationLines,
  getRecommendationProfile,
} from '../../content/recommendations.js';
import {getProductById, getProductsByCategory} from '../../content/products.js';
import {
  renderCategoryMenu,
  renderFallbackMenu,
  renderMainMenu,
} from '../../renderers/category.js';

export const handleCategory = async ({intent, session, mode}) => {
  if (mode === 'main_menu') {
    session.step = 'start';
    session.category = null;
    session.product = null;
    session.shopperNeed = null;

    return renderMainMenu({
      categories: Object.values({
        computing: getCategoryById('computing'),
        audio: getCategoryById('audio'),
      }).filter(Boolean),
      buttonLabels,
    });
  }

  if (mode === 'recommendation') {
    const profile = getRecommendationProfile(intent.profileId);
    const category = profile ? getCategoryById(profile.categoryId) : null;

    if (!profile || !category) {
      return renderMainMenu({
        categories: Object.values({
          computing: getCategoryById('computing'),
          audio: getCategoryById('audio'),
        }).filter(Boolean),
        buttonLabels,
      });
    }

    session.step = `category_${category.id}`;
    session.category = category.id;
    session.product = null;
    session.shopperNeed = profile.id;

    return renderCategoryMenu({
      category,
      products: getProductsByCategory(category.id),
      recommendationProfile: profile,
      recommendationLines: buildNeedRecommendationLines(profile),
    });
  }

  if (mode === 'category') {
    const category = getCategoryById(intent.categoryId);

    if (!category) {
      return renderMainMenu({
        categories: Object.values({
          computing: getCategoryById('computing'),
          audio: getCategoryById('audio'),
        }).filter(Boolean),
        buttonLabels,
      });
    }

    const profile = session.shopperNeed
      ? getRecommendationProfile(session.shopperNeed)
      : null;
    const recommendationProfile =
      profile?.categoryId === category.id ? profile : null;

    session.step = `category_${category.id}`;
    session.category = category.id;
    session.product = null;
    session.shopperNeed = recommendationProfile?.id || null;

    return renderCategoryMenu({
      category,
      products: getProductsByCategory(category.id),
      recommendationProfile,
      recommendationLines: recommendationProfile
        ? buildNeedRecommendationLines(recommendationProfile)
        : [],
    });
  }

  if (mode === 'compare') {
    const currentProduct = session.product ? getProductById(session.product) : null;
    const category = currentProduct ? getCategoryById(currentProduct.category) : null;
    const profile = session.shopperNeed
      ? getRecommendationProfile(session.shopperNeed)
      : null;

    if (!category) {
      return renderMainMenu({
        categories: Object.values({
          computing: getCategoryById('computing'),
          audio: getCategoryById('audio'),
        }).filter(Boolean),
        buttonLabels,
      });
    }

    session.step = `category_${category.id}`;
    session.category = category.id;
    session.product = null;

    return renderCategoryMenu({
      category,
      products: getProductsByCategory(category.id),
      recommendationProfile:
        profile?.categoryId === category.id ? profile : null,
      recommendationLines:
        profile?.categoryId === category.id
          ? buildNeedRecommendationLines(profile)
          : [],
    });
  }

  const activeProduct = session.product ? getProductById(session.product) : null;
  const category = activeProduct ? getCategoryById(activeProduct.category) : null;

  return renderFallbackMenu({
    product: activeProduct,
    category,
  });
};
