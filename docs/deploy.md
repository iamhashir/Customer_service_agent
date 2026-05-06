# Deploy to Vercel

This project deploys a WhatsApp webhook to the Vercel project `meta-setup`.

Production URL:

```text
https://meta-setup.vercel.app
```

Webhook URL:

```text
https://meta-setup.vercel.app/api/webhook
```

## Run from repo root

```powershell
cd C:\Users\ihash\Desktop\CSA-Demo
```

## Standard deploy

Use this when you changed code only.

### 1. Validate the API files

```powershell
node --check api\webhook.js
node --check api\lib\catalog.js
node --check api\lib\intent.js
node --check api\lib\session-store.js
node --check api\lib\flow-engine.js
node --check api\lib\whatsapp.js
```

### 2. Deploy production

```powershell
vercel --prod --yes
```

### 3. Verify the deployment

```powershell
vercel inspect https://meta-setup.vercel.app
vercel logs https://meta-setup.vercel.app --no-follow --since 10m --expand --no-branch
```

### 4. Test the bot

- Send a WhatsApp message to the connected business number.
- Confirm the bot replies from the latest flow.
- Confirm logs do not show Graph API errors.

## If the WhatsApp access token changed

`api/.env` is local only. Updating it does not update Vercel automatically.

### 1. Load the token from `api/.env`

```powershell
$token = (Get-Content api\.env -Raw).Trim()
```

### 2. Replace the production env var

```powershell
vercel env rm WHATSAPP_ACCESS_TOKEN production --yes
vercel env add WHATSAPP_ACCESS_TOKEN production --value $token --yes
```

### 3. Redeploy production

```powershell
vercel --prod --yes
```

## Current env used by the webhook

- `WHATSAPP_ACCESS_TOKEN` must exist in Vercel production.
- `WHATSAPP_VERIFY_TOKEN` falls back to `mytoken` if unset.
- `WHATSAPP_GRAPH_VERSION` falls back to `v25.0` if unset.

## Notes

- `.vercel/project.json` already links this repo to the correct Vercel project.
- The session store is in memory, so conversation state can reset on cold starts.
- If deploy succeeds but replies fail, check `vercel logs` first for WhatsApp API errors.
