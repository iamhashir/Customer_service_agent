# State Machine

![State Machine Diagram](state-machine.png)

This document explains the conversational state model used by the WhatsApp assistant.

## State Graph

```mermaid
stateDiagram-v2
    direction TB

    [*] --> START
    
    state "Initial State" as START
    state "Browsing Catalog" as CATEGORY_SELECTION
    state "Consulting Product" as PRODUCT_VIEW
    state "Deep Dive" as TECHNICAL_DETAILS
    state "Transactional" as PRICING
    state "Checkout" as ORDER_CAPTURE
    state "Human Support" as HUMAN_HANDOFF

    START --> CATEGORY_SELECTION: Intent (menu/need)
    START --> PRODUCT_VIEW: Intent (direct product)

    CATEGORY_SELECTION --> PRODUCT_VIEW: selection
    CATEGORY_SELECTION --> HUMAN_HANDOFF: "specialist"

    PRODUCT_VIEW --> TECHNICAL_DETAILS: "details"
    PRODUCT_VIEW --> PRICING: "availability"
    PRODUCT_VIEW --> HUMAN_HANDOFF: "specialist"

    TECHNICAL_DETAILS --> PRICING: "availability"
    TECHNICAL_DETAILS --> CATEGORY_SELECTION: "compare"
    TECHNICAL_DETAILS --> HUMAN_HANDOFF: "specialist"

    PRICING --> ORDER_CAPTURE: "order now"
    PRICING --> CATEGORY_SELECTION: "compare"
    PRICING --> HUMAN_HANDOFF: "specialist"

    ORDER_CAPTURE --> HUMAN_HANDOFF: "specialist"
    ORDER_CAPTURE --> START: "main menu"

    HUMAN_HANDOFF --> START: "restart"
```

## Session Context

The state is maintained in the session object (stored in `api/lib/session/store.js`):

| Field | Description |
| --- | --- |
| `flow` | Current conversation family (e.g., `product_inquiry`). |
| `step` | Specific point in the flow (e.g., `start`, `pricing`). |
| `category` | The active product category. |
| `product` | The active product ID. |
| `shopperNeed` | Recommendation context (e.g., `gym`, `bass`). |

## Decision Hierarchy

The system resolves user intent in this order:
1. Navigation -> 2. Shopping Need -> 3. Category -> 4. Product -> 5. Action -> 6. Fallback.
