# Architecture Pipeline

## Request Flow

```text
WhatsApp user
-> Meta WhatsApp Cloud API
-> Meta webhook subscription: messages
-> Vercel production deployment
-> /api/webhook
-> Meta Graph API send-message endpoint
-> WhatsApp user receives the next step in the button flow
```

## Webhook Verification

Meta sends a `GET /api/webhook` request with these query parameters:

```text
hub.mode
hub.verify_token
hub.challenge
```

The function compares `hub.verify_token` with `WHATSAPP_VERIFY_TOKEN`, falling back to `mytoken`. If it matches, the function returns `hub.challenge`.

## Incoming Message Handling

Meta sends incoming WhatsApp messages as:

```text
entry[].changes[].value.messages[]
```

For each message, the function reads:

```text
value.metadata.phone_number_id
message.from
```

The first unknown or plain-text message sends the main menu:

```json
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "<message.from>",
  "type": "interactive",
  "interactive": {
    "type": "button",
    "body": {
      "text": "haya\nWhat do you want to do?"
    },
    "footer": {
      "text": "Customer service"
    },
    "action": {
      "buttons": [
        {"type": "reply", "reply": {"id": "pricing", "title": "Pricing"}},
        {"type": "reply", "reply": {"id": "support", "title": "Support"}},
        {"type": "reply", "reply": {"id": "catalog", "title": "Catalog"}}
      ]
    }
  }
}
```

to:

```text
https://graph.facebook.com/v25.0/<phone_number_id>/messages
```

## Status Event Handling

Delivery events arrive through the same subscribed Meta field, `messages`, but appear as:

```text
entry[].changes[].value.statuses[]
```

Examples:

```text
sent
delivered
read
failed
```

The webhook currently logs these payloads but does not reply to them.

## Button Flow

Button replies arrive as:

```text
message.type = interactive
message.interactive.button_reply.id
```

The webhook maps those IDs into a deterministic flow:

```text
main_menu
-> pricing
   -> pricing_basic
      -> start_basic
   -> pricing_pro
      -> start_pro
   -> pricing_custom
      -> book_call
-> contact_us
-> support
   -> support_tech
      -> upload_issue
   -> support_sales
      -> book_call
-> catalog
   -> catalog_shoes
   -> catalog_demo
```

Plain text shortcuts are also supported:

```text
pricing
support
help
catalog
products
menu
contact
contact us
magnotek
```

Follow-up screens include a `Main menu` route so the user can return to the start of the flow.

## Contact URL Button

The default main menu also sends a second interactive CTA URL message:

```json
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "<message.from>",
  "type": "interactive",
  "interactive": {
    "type": "cta_url",
    "body": {
      "text": "Need a human or want the full site?"
    },
    "footer": {
      "text": "Magnotek"
    },
    "action": {
      "name": "cta_url",
      "parameters": {
        "display_text": "Contact us",
        "url": "https://magnotek.vercel.app"
      }
    }
  }
}
```

## Runtime Configuration

Production secrets live in Vercel environment variables:

```text
WHATSAPP_ACCESS_TOKEN
```

The local `api/.env` file is only a private source for setup and must stay ignored.

## Operational Checks

1. Send a WhatsApp message to the connected number.
2. Check Vercel logs.
3. Confirm the incoming payload contains `value.messages`.
4. Confirm logs include `WhatsApp flow sent`.
5. Confirm the WhatsApp user receives the next flow step.
