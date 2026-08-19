# Customer Service Agent — WhatsApp Sales Automation

A production-oriented WhatsApp Cloud API integration that handles guided product discovery, intent routing, conversational state, and human handoff.

The project demonstrates **API integration, stateful conversation design, serverless deployment, modular backend architecture, and operational debugging**.

---

## What It Does

Incoming WhatsApp messages are processed through a guided sales flow:

```text
Customer message
→ intent detection
→ conversation router
→ product/category flow
→ structured WhatsApp response
→ optional human handoff
```

Current product flows include:

- Gaming PCs
- Audio products
- Product specifications
- Pricing and ordering
- Human specialist handoff

---

## Architecture

```text
api/
  webhook.js
  lib/
    content/
    conversation/
    intent/
    renderers/
    session/
    transport/whatsapp/
    flow-engine.js
```

### Main responsibilities

- **Webhook layer** — verifies Meta webhook requests and receives WhatsApp events
- **Intent layer** — identifies user intent from messages and shortcuts
- **Conversation layer** — routes the current flow and step
- **Renderers** — build platform-agnostic response nodes
- **WhatsApp transport** — maps response nodes to Meta payloads and sends them
- **Session store** — tracks conversational state per contact
- **Flow engine** — coordinates the interaction without owning presentation details

---

## Conversation State

The current state model tracks:

```text
flow
step
category
product
shopperNeed
```

Example flow:

```text
product_inquiry
→ category_audio
→ product_selected
→ specs
→ pricing
→ order_capture
→ human_handoff
```

This keeps routing explicit and makes the conversation easier to extend without turning the webhook into one large conditional block.

---

## Engineering Decisions

### Structured response pipeline

Responses are generated in two stages:

```text
handlers
→ UI nodes
→ WhatsApp mapper
→ Meta payloads
```

This separates business logic from platform-specific payload construction.

### Ordered outbound messages

Outbound sends are serialized per contact so multi-part responses arrive in the intended order.

### Modular content

Product data, labels, categories, and recommendations are kept outside the webhook handler so conversation logic does not duplicate content.

---

## Current Production Limitation

Session state is currently stored in memory.

That works for a lightweight demo, but serverless cold starts or multiple instances can reset or split conversational state. A production version should move session storage to a shared service such as **Redis or PostgreSQL**.

Documenting this limitation is intentional: the current architecture is suitable for demonstrating the flow, while the next production step is clear.

---

## Deployment

The webhook is designed for Vercel serverless deployment and the Meta WhatsApp Cloud API.

Required environment variable:

```text
WHATSAPP_ACCESS_TOKEN
```

Optional configuration includes the webhook verification token and Meta Graph API version.

Secrets are expected to remain in environment configuration and are not committed to the repository.

---

## Local Validation

Check the main webhook and backend modules before deployment:

```bash
node --check api/webhook.js
```

Then validate files under `api/lib/` and deploy through the configured Vercel project.

---

## What This Project Demonstrates

- Third-party API integration
- Webhook design
- Conversation state machines
- Intent routing
- Modular Node.js architecture
- Serverless deployment
- Production trade-off awareness
- Human-in-the-loop automation

---

## Author

**Malik Hashir** — Software Engineer, Full-Stack / AI Automation / Systems

- [GitHub](https://github.com/iamhashir)
- [Portfolio](https://cv-portfolio-five.vercel.app)
- [LinkedIn](https://linkedin.com/in/malikhashir)
