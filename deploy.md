# Deploy

Use these steps to deploy `meta-setup` to Vercel production.

## Folder

Run from:

```powershell
cd C:\Users\ihash\Desktop\automation\CSA-demo\meta-setup
```

## 1. Validate code

```powershell
node --check api\webhook.js
node --check api\lib\catalog.js
node --check api\lib\intent.js
node --check api\lib\session-store.js
node --check api\lib\flow-engine.js
node --check api\lib\whatsapp.js
```

## 2. Confirm Vercel env

If you changed the WhatsApp token locally in `api/.env`, update Vercel first:

```powershell
$token = (Get-Content api\.env -Raw).Trim()
vercel env rm WHATSAPP_ACCESS_TOKEN production --yes
vercel env add WHATSAPP_ACCESS_TOKEN production --value $token --yes
```

Then verify:

```powershell
vercel env ls
```

## 3. Deploy production

```powershell
vercel --prod --yes
```

## 4. Verify deployment

```powershell
vercel inspect https://meta-setup.vercel.app
vercel logs https://meta-setup.vercel.app --no-follow --since 10m --expand --no-branch
```

## 5. Test the webhook

- Send a WhatsApp message to the connected number.
- Confirm the bot replies with the product inquiry flow.
- Confirm logs show successful outbound requests.

## Notes

- `api/.env` is local-only and should not be committed.
- The current session store is in-memory only. A cold start can reset conversation state.
