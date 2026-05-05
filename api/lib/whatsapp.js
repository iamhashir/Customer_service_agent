export const button = (id, title) => ({
  type: 'reply',
  reply: {
    id,
    title,
  },
});

export const interactiveMessage = ({
  body,
  footer = 'Customer service',
  buttons,
}) => ({
  type: 'interactive',
  interactive: {
    type: 'button',
    body: {
      text: body,
    },
    footer: {
      text: footer,
    },
    action: {
      buttons,
    },
  },
});

export const textMessage = ({body, previewUrl = false}) => ({
  type: 'text',
  text: {
    preview_url: previewUrl,
    body,
  },
});

export const imageMessage = ({link, caption}) => ({
  type: 'image',
  image: {
    link,
    ...(caption ? {caption} : {}),
  },
});

export const urlButtonMessage = ({
  body,
  footer = 'Customer service',
  displayText,
  url,
}) => ({
  type: 'interactive',
  interactive: {
    type: 'cta_url',
    body: {
      text: body,
    },
    footer: {
      text: footer,
    },
    action: {
      name: 'cta_url',
      parameters: {
        display_text: displayText,
        url,
      },
    },
  },
});

export const listMessage = ({
  headerText,
  body,
  footer = 'Choose an option',
  buttonText,
  sections,
}) => ({
  type: 'interactive',
  interactive: {
    type: 'list',
    header: {
      type: 'text',
      text: headerText,
    },
    body: {
      text: body,
    },
    footer: {
      text: footer,
    },
    action: {
      button: buttonText,
      sections,
    },
  },
});

export const toOutboundPayload = ({to, message}) => ({
  messaging_product: 'whatsapp',
  recipient_type: 'individual',
  to,
  ...message,
});

const deliveryChains = new Map();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const queueWhatsAppMessage = ({
  accessToken,
  apiVersion,
  phoneNumberId,
  payload,
  queueKey,
  delayMs = 650,
}) => {
  const current = deliveryChains.get(queueKey) || Promise.resolve();

  const next = current
    .catch(() => undefined)
    .then(async () => {
      await sendWhatsAppMessage({
        accessToken,
        apiVersion,
        phoneNumberId,
        payload,
      });

      if (delayMs > 0) {
        await delay(delayMs);
      }
    });

  deliveryChains.set(queueKey, next);
  return next;
};

export const sendWhatsAppMessage = async ({
  accessToken,
  apiVersion,
  phoneNumberId,
  payload,
}) => {
  if (!accessToken) {
    console.error('Missing WHATSAPP_ACCESS_TOKEN env var. Cannot send reply.');
    return;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    const responseBody = await response.text();

    if (!response.ok) {
      console.error(
        `WhatsApp flow failed: ${response.status} ${response.statusText} ${responseBody}`,
      );
      return;
    }

    console.log(`WhatsApp flow sent: ${responseBody}`);
  } catch (error) {
    console.error('WhatsApp flow request failed:', error);
  }
};
