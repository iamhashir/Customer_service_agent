# Architecture Pipeline

![System Architecture Flow](system-architecture.png)

This document explains the end-to-end runtime pipeline.

## Request Lifecycle

```mermaid
flowchart TD
    User([WhatsApp User]) -- Message --> Meta[Meta Cloud API]
    Meta -- Webhook Event --> Vercel{Vercel /api/webhook}
    
    subgraph Brain [Internal Logic]
        Vercel --> Engine[Flow Engine]
        Engine --> Intent[Intent Detection]
        Intent --> Handler[Conversation Handler]
        Handler --> Renderer[UI Node Renderer]
    end
    
    subgraph Delivery [Transport Layer]
        Renderer --> Mapper[WhatsApp Payload Mapper]
        Mapper --> Sender[WhatsApp Sender]
    end
    
    Sender -- Graph API --> Meta
    Meta -- Push --> User
```

## Component Roles

| Component | Responsibility |
| --- | --- |
| **api/webhook.js** | Receives and verifies Meta Graph API events. |
| **flow-engine.js** | The orchestrator. Manages sessions and dispatches logic. |
| **api/lib/intent/** | Detects user intent (Category, Product, Navigation). |
| **api/lib/renderers/** | Converts logical responses into platform-agnostic UI nodes. |
| **api/lib/transport/** | Maps UI nodes to WhatsApp payloads and sends them. |

## Webhook Verification

Meta sends a `GET /api/webhook` request to verify the server. The function compares `hub.verify_token` with your environment variables and returns `hub.challenge`.

## Payload Mapping & Guardrails

The system building UI nodes first ensures that business logic remains independent of platform limits. The **WhatsApp Mapper** then enforces:
- **Body/Caption**: 1024 chars
- **List Row Description**: 72 chars
- **Button Labels**: 20 chars

## Guided Flow Structure

1. **Main Menu**
2. **Category Intro** (Gaming PCs, Audio)
3. **Product Selection**
4. **Guided Detail** (Specs, Availability, Specialist Handoff)
