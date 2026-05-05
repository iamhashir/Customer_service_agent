# Env Change Deploy

This app is linked to the Vercel project `meta-setup`.

## When `api/.env` changes

The local file `api/.env` is not deployed automatically. For this project it is used as a private source for the `WHATSAPP_ACCESS_TOKEN` value, so production must be updated in Vercel first and then redeployed.

## Steps

Run from:

```powershell
cd C:\Users\ihash\Desktop\automation\CSA-demo\meta-setup
```

1. Validate the serverless file:

```powershell
node --check api\webhook.js
```

2. Replace the production token in Vercel from the local file:

```powershell
$token = (Get-Content api\.env -Raw).Trim()
vercel env rm WHATSAPP_ACCESS_TOKEN production --yes
vercel env add WHATSAPP_ACCESS_TOKEN production --value $token --yes
```

3. Confirm the environment variable exists:

```powershell
vercel env ls
```

4. Deploy production:

```powershell
vercel --prod --yes
```

5. Check recent runtime logs:

```powershell
vercel logs https://meta-setup.vercel.app --no-follow --since 10m --expand --no-branch
```

6. Send a WhatsApp test message and confirm the flow responds.

## Notes

- Do not commit `api/.env`.
- If `WHATSAPP_VERIFY_TOKEN` or `WHATSAPP_GRAPH_VERSION` ever need to be pinned in production, add them explicitly with `vercel env add`.
- `WHATSAPP_VERIFY_TOKEN` currently falls back to `mytoken` and `WHATSAPP_GRAPH_VERSION` falls back to `v25.0` in `api/webhook.js`.
