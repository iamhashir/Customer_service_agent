export const uiText = ({body}) => ({
  type: 'text',
  body,
});

export const uiImage = ({url, caption = ''}) => ({
  type: 'image',
  url,
  caption,
});

export const uiCard = ({title, body, actions = [], footer = '', imageUrl = null}) => ({
  type: 'card',
  title,
  body,
  actions,
  footer,
  imageUrl,
});

export const uiActionList = ({body, actions = [], footer = ''}) => ({
  type: 'action_list',
  body,
  actions,
  footer,
});

export const uiList = ({
  header,
  body,
  buttonLabel,
  sections = [],
  footer = '',
}) => ({
  type: 'list',
  header,
  body,
  buttonLabel,
  sections,
  footer,
});

export const uiLink = ({body, label, url, footer = ''}) => ({
  type: 'link',
  body,
  label,
  url,
  footer,
});
