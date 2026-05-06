const contactSessions = new Map();

const buildDefaultSession = (phone) => ({
  phone,
  flow: 'product_inquiry',
  step: 'start',
  category: null,
  product: null,
  shopperNeed: null,
  handoffRequested: false,
  orderDraft: null,
  lastUpdatedAt: Date.now(),
});

export const getSession = (phone) => {
  const existing = contactSessions.get(phone);

  if (existing) {
    return existing;
  }

  const session = buildDefaultSession(phone);
  contactSessions.set(phone, session);
  return session;
};

export const saveSession = (phone, updates) => {
  const session = {
    ...getSession(phone),
    ...updates,
    lastUpdatedAt: Date.now(),
  };

  contactSessions.set(phone, session);
  return session;
};

export const resetSession = (phone) => {
  const session = buildDefaultSession(phone);
  contactSessions.set(phone, session);
  return session;
};
