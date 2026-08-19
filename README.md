# Customer Service Agent — WhatsApp Conversation Automation

A Node.js integration for the **Meta WhatsApp Cloud API** that routes incoming customer messages through explicit conversation state, structured product flows, response rendering, and optional human handoff.

The project is intentionally small at the transport layer: the webhook receives Meta events, then delegates intent detection, session state, conversation dispatch, UI-node rendering, and outbound message delivery to separate modules.

## Request flow

```text
WhatsApp webhook event
        ↓
api/webhook.js
        ↓
flow engine
        ↓
load contact session
        ↓
intent detection
        ↓
conversation dispatcher
        ↓
UI response nodes
        ↓
WhatsApp payload mapper
        ↓
per-contact delivery queue
        ↓
Meta Graph API
```

## What is implemented

- Meta webhook verification through `hub.mode`, `hub.verify_token`, and `hub.challenge`
- Incoming WhatsApp message extraction from webhook events
- Explicit conversation session state per contact
- Intent detection before route dispatch
- Main-menu/session reset handling
- Product/category conversation flows
- Product specifications and pricing paths
- Order-draft / handoff-oriented session fields
- Platform-independent UI response nodes before WhatsApp payload conversion
- Per-contact serialized outbound delivery so multi-part responses retain order
- Configurable Meta Graph API version
- Environment-based WhatsApp access token

## Architecture

```text
api/
├─ webhook.js
└─ lib/
   ├─ content/                  product/category content
   ├─ conversation/             routing + conversation handlers
   ├─ intent/                   message intent detection
   ├─ renderers/                response-node construction
   ├─ session/                  contact state
   ├─ transport/whatsapp/       payload mapping + Graph API sender
   └─ flow-engine.js            orchestration
```

### Webhook layer

`api/webhook.js` handles the Meta subscription handshake and incoming POST events. For each message it calls the flow engine and queues the resulting outbound payloads.

### Flow engine

`api/lib/flow-engine.js` coordinates the application flow:

```text
message
  → getSession(contact)
  → detectIntent(message, session)
  → dispatch(intent, session, message)
  → mapUiToOutboundPayloads(...)
```

A navigation-to-main-menu intent resets the session before redispatching.

### Session model

The current in-memory session tracks fields including:

```text
flow
step
category
product
shopperNeed
handoffRequested
orderDraft
lastUpdatedAt
```

This makes conversation state explicit rather than inferring it from the latest message alone.

### Ordered outbound delivery

The WhatsApp sender maintains a promise chain per `phoneNumberId:contact` key. Multiple response payloads for the same contact are therefore sent sequentially instead of racing each other.

That matters for guided flows where a text explanation, list/button payload, and follow-up message must arrive in a predictable order.

## Current limitation

Session persistence is currently an in-process JavaScript `Map`.

That is fine for demonstrating and testing the conversation engine, but it is **not durable across serverless cold starts or multiple instances**. A deployed multi-instance version should move session state to a shared store such as Redis or PostgreSQL.

The delivery queue is likewise process-local.

## Configuration

Required for outbound messages:

```text
WHATSAPP_ACCESS_TOKEN
```

Optional:

```text
WHATSAPP_VERIFY_TOKEN
WHATSAPP_GRAPH_VERSION
```

The Graph API version defaults in code when no override is supplied.

## Engineering focus

This repository demonstrates:

- third-party webhook/API integration
- explicit conversational state machines
- separation between business flow and transport payloads
- modular intent + dispatcher architecture
- ordered asynchronous message delivery
- human-handoff-ready session state
- clear identification of serverless persistence boundaries

It is a conversation-engine / API integration project, not an LLM chatbot wrapper.
