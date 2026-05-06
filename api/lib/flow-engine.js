import {dispatch} from './conversation/dispatcher.js';
import {detectIntent} from './intent/detect.js';
import {getSession, resetSession, saveSession} from './session/store.js';
import {mapUiToOutboundPayloads} from './transport/whatsapp/mapper.js';

export const handleIncomingMessage = async (message) => {
  const userId = message.from;
  const session = await getSession(userId);
  const intent = detectIntent(message, session);

  if (intent.type === 'navigation.main_menu') {
    const reset = await resetSession(userId);
    const uiNodes = await dispatch({
      intent,
      session: reset,
      message,
    });

    await saveSession(userId, reset);
    return mapUiToOutboundPayloads({
      to: userId,
      uiNodes,
    });
  }

  const uiNodes = await dispatch({
    intent,
    session,
    message,
  });

  await saveSession(userId, session);

  return mapUiToOutboundPayloads({
    to: userId,
    uiNodes,
  });
};

export const runFlow = ({to, message}) => handleIncomingMessage({from: to, ...message});
