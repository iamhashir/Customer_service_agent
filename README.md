# Meta WhatsApp Webhook

Vercel webhook for the Meta WhatsApp Cloud API.

It receives WhatsApp messages, detects guided sales intents, and sends the next step in a product inquiry funnel.

## Live Webhook

Use this in Meta Developers:

```text
Callback URL: https://meta-setup.vercel.app/api/webhook
Verify token: mytoken
Subscribed field: messages
```

## Current Flow

Any normal user message opens a guided premium catalog menu.

```text
Catalog menu
-> Gaming PCs
-> Audio Collection
-> Talk to Specialist
```

The webhook keeps a lightweight in-memory session per phone number so the next reply can be routed by `flow`, `step`, and `product`.
It also serializes outbound sends per contact so multi-part replies arrive in the intended order.

## Contact Button

Product steps are designed to avoid message spam:

```text
1. Optional hero image for the selected product
2. One structured product card with premium action labels
```

Human handoff keeps a separate CTA URL button to `https://magnotek.vercel.app`.

## Text Shortcuts

Users can type these instead of clicking buttons:

```text
pc
gaming pc
headphones
earbuds
open ear
anker
p20i
bone conduction
truefree
specs
price
order
human
agent
menu
hi
```

## Runtime Files

```text
api/webhook.js
```

Main serverless function:

- `GET /api/webhook` verifies Meta webhook setup.
- `POST /api/webhook` receives WhatsApp events.
- `value.messages` triggers the flow engine.
- `value.statuses` is logged but ignored.

```text
api/lib/
```

Backend modules:

- `content/` centralized categories, products, labels, and recommendation data
- `conversation/` router, dispatcher, and focused handlers
- `intent/detect.js` domain intent detection
- `renderers/` platform-agnostic UI node builders
- `session/store.js` session state per phone number
- `transport/whatsapp/` mapper, limits, and sender
- `flow-engine.js` orchestration only

```text
api/.env
```

Local secret file. It is ignored by git and must not be committed.

## Project Structure

```text
api/
  webhook.js
  lib/
    content/
    conversation/
    intent/
    renderers/
    session/
    transport/
    flow-engine.js
assets/
  anker-p20i.jpg
  headphones.jpg
  open-ear-bone-conduction.jpg
  true-nort-hypervault-obsidian-white-pc.jpg
  truefree-open-ear.jpg
docs/
  ARCHITECTURE_PIPELINE.md
  architecture.md
  state-machine.md
  deploy.md
  env_change_deploy.md
README.md
```

Use `docs/` for deployment notes and operational runbooks. Keep the root limited to core folders and top-level project metadata.

Architecture reading order:

- `docs/architecture.md`
- `docs/state-machine.md`
- `docs/CURRENT_MESSAGE_FLOW.md`
- `docs/deploy.md`

## Environment Variables

Required in Vercel production:

```text
WHATSAPP_ACCESS_TOKEN
```

Optional:

```text
WHATSAPP_VERIFY_TOKEN=mytoken
WHATSAPP_GRAPH_VERSION=v25.0
```

## State Model

The v1 backend stores:

```text
flow = product_inquiry
step = start | category_* | product_selected | specs | pricing | order_capture | human_handoff
category = computing | audio
product = pc | anker_p20i | bone_conduction_open_ear | truefree_open_ear
shopperNeed = null | gym | running | calls | travel | bass
```

Conversation output is now built in two stages:

```text
handlers -> UI nodes -> WhatsApp mapper -> payloads
```

Current limitation:

- Session storage is in-memory only.
- On a cold start or scale-out instance, session state can reset.
- Production should move this to Redis, Postgres, or another shared store.

Check Vercel env:

```powershell
vercel env ls
```

## Deploy

Run from this folder:

```powershell
cd C:\Users\ihash\Desktop\automation\CSA-demo\meta-setup
vercel --prod --yes
```

Production URL:

```text
https://meta-setup.vercel.app/api/webhook
```

## Logs

```powershell
vercel logs https://meta-setup.vercel.app --no-follow --since 10m --expand --no-branch
```

Successful outbound messages show:

```text
WhatsApp flow sent
```

Send failures show:

```text
WhatsApp flow failed
```

## Update Workflow

1. Edit `api/webhook.js`.
2. Check syntax:

```powershell
node --check api\webhook.js
```

3. Deploy:

```powershell
vercel --prod --yes
```

4. Send a WhatsApp test message and check logs.
