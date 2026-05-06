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
