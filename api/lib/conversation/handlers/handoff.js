import {getProductById} from '../../content/products.js';
import {renderHandoff} from '../../renderers/handoff.js';

export const handleHandoff = async ({session}) => {
  const product = session.product ? getProductById(session.product) : null;

  session.step = 'human_handoff';
  session.handoffRequested = true;

  return renderHandoff({product});
};
