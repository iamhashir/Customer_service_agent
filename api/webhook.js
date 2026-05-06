import {runFlow} from './lib/flow-engine.js';
import {queueWhatsAppMessage} from './lib/transport/whatsapp/sender.js';

const GRAPH_API_VERSION = process.env.WHATSAPP_GRAPH_VERSION || 'v25.0';
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'mytoken';

const replyToIncomingMessages = async (body) => {
  const entries = body?.entry || [];
  const replies = [];

  for (const entry of entries) {
    for (const change of entry?.changes || []) {
      const value = change?.value;
      const phoneNumberId = value?.metadata?.phone_number_id;

      if (!phoneNumberId || !Array.isArray(value?.messages)) {
        continue;
      }

      for (const message of value.messages) {
        if (!message?.from) {
          continue;
        }

        const payloads = await runFlow({
          to: message.from,
          message,
        });

        replies.push(
          ...payloads.map((payload) =>
            queueWhatsAppMessage({
              accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
              apiVersion: GRAPH_API_VERSION,
              phoneNumberId,
              payload,
              queueKey: `${phoneNumberId}:${message.from}`,
            }),
          ),
        );
      }
    }
  }

  await Promise.all(replies);
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.status(403).send('Forbidden');
  }

  if (req.method === 'POST') {
    console.log(JSON.stringify(req.body));
    await replyToIncomingMessages(req.body);
    return res.status(200).send('OK');
  }

  return res.status(405).send('Method Not Allowed');
}
