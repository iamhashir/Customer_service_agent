import {getProductById} from '../../content/products.js';
import {renderOrderCapture} from '../../renderers/order.js';

export const handleOrder = async ({session}) => {
  const product = session.product ? getProductById(session.product) : null;

  if (!product) {
    return [];
  }

  session.step = 'order_capture';
  session.orderDraft = {
    product: product.id,
  };

  return renderOrderCapture({product});
};
