import {WHATSAPP_LIMITS, clampText} from './limits.js';

const mapAction = (action) => ({
  type: 'reply',
  reply: {
    id: action.id,
    title: clampText(action.label, WHATSAPP_LIMITS.buttonLabel),
  },
});

const sanitizeSections = (sections = []) =>
  sections.slice(0, WHATSAPP_LIMITS.listRows).map((section) => ({
    title: clampText(section.title, WHATSAPP_LIMITS.listSectionTitle),
    rows: (section.rows || []).slice(0, WHATSAPP_LIMITS.listRows).map((row) => ({
      id: row.id,
      title: clampText(row.title, WHATSAPP_LIMITS.listRowTitle),
      description: clampText(row.description || '', WHATSAPP_LIMITS.listRowDescription),
    })),
  }));

export const mapUiNodeToWhatsAppMessage = (node) => {
  if (node.type === 'text') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: clampText(node.body, WHATSAPP_LIMITS.body),
      },
    };
  }

  if (node.type === 'image') {
    return {
      type: 'image',
      image: {
        link: node.url,
        caption: clampText(node.caption || '', WHATSAPP_LIMITS.caption),
      },
    };
  }

  if (node.type === 'card') {
    const body = node.title ? `${node.title}\n\n${node.body}` : node.body;

    return {
      type: 'interactive',
      interactive: {
        type: 'button',
        ...(node.imageUrl
          ? {
              header: {
                type: 'image',
                image: {link: node.imageUrl},
              },
            }
          : {}),
        body: {
          text: clampText(body, WHATSAPP_LIMITS.body),
        },
        ...(node.footer
          ? {
              footer: {
                text: clampText(node.footer, WHATSAPP_LIMITS.buttonLabel + 20),
              },
            }
          : {}),
        action: {
          buttons: (node.actions || [])
            .slice(0, WHATSAPP_LIMITS.buttons)
            .map(mapAction),
        },
      },
    };
  }

  if (node.type === 'action_list') {
    return {
      type: 'interactive',
      interactive: {
        type: 'button',
        body: {
          text: clampText(node.body, WHATSAPP_LIMITS.body),
        },
        ...(node.footer
          ? {
              footer: {
                text: clampText(node.footer, WHATSAPP_LIMITS.buttonLabel + 20),
              },
            }
          : {}),
        action: {
          buttons: (node.actions || [])
            .slice(0, WHATSAPP_LIMITS.buttons)
            .map(mapAction),
        },
      },
    };
  }

  if (node.type === 'list') {
    return {
      type: 'interactive',
      interactive: {
        type: 'list',
        ...(node.header
          ? {
              header: {
                type: 'text',
                text: clampText(node.header, WHATSAPP_LIMITS.body),
              },
            }
          : {}),
        body: {
          text: clampText(node.body, WHATSAPP_LIMITS.body),
        },
        ...(node.footer
          ? {
              footer: {
                text: clampText(node.footer, WHATSAPP_LIMITS.buttonLabel + 20),
              },
            }
          : {}),
        action: {
          button: clampText(node.buttonLabel, WHATSAPP_LIMITS.buttonLabel),
          sections: sanitizeSections(node.sections),
        },
      },
    };
  }

  if (node.type === 'link') {
    return {
      type: 'interactive',
      interactive: {
        type: 'cta_url',
        body: {
          text: clampText(node.body, WHATSAPP_LIMITS.body),
        },
        ...(node.footer
          ? {
              footer: {
                text: clampText(node.footer, WHATSAPP_LIMITS.buttonLabel + 20),
              },
            }
          : {}),
        action: {
          name: 'cta_url',
          parameters: {
            display_text: clampText(node.label, WHATSAPP_LIMITS.buttonLabel),
            url: node.url,
          },
        },
      },
    };
  }

  return {
    type: 'text',
    text: {
      preview_url: false,
      body: 'Sorry, I could not render that response.',
    },
  };
};

export const toOutboundPayload = ({to, message}) => ({
  messaging_product: 'whatsapp',
  recipient_type: 'individual',
  to,
  ...message,
});

export const mapUiToWhatsAppMessages = (uiNodes = []) =>
  uiNodes.map(mapUiNodeToWhatsAppMessage);

export const mapUiToOutboundPayloads = ({to, uiNodes = []}) =>
  mapUiToWhatsAppMessages(uiNodes).map((message) =>
    toOutboundPayload({
      to,
      message,
    }),
  );
