export const WHATSAPP_LIMITS = {
  body: 1024,
  caption: 1024,
  buttonLabel: 20,
  buttons: 3,
  listRows: 10,
  listSectionTitle: 24,
  listRowTitle: 24,
  listRowDescription: 72,
};

export const clampText = (text = '', limit = 1024) => {
  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit - 1).trimEnd()}…`;
};
