# Intellivora AI — Deployment Guide

This project has two parts:
- `index.html` — the full website (hero, services, ROI calculator, chatbot UI, footer)
- `api/chat.js` — a serverless function that securely talks to the Anthropic API so the chatbot works on the live, public site (Urdu + English supported)

## Deploy to Vercel (free, ~5 minutes)

1. **Get an Anthropic API key**
   - Go to https://console.anthropic.com → API Keys → Create Key
   - Copy the key (starts with `sk-ant-...`)

2. **Push this folder to GitHub**
   - Create a new repo (e.g. `intellivora-ai`) and upload/push these 3 files (`index.html`, `api/chat.js`, `vercel.json`)

3. **Import into Vercel**
   - Go to https://vercel.com → "Add New Project" → import your GitHub repo
   - Framework preset: **Other** (it will auto-detect the static file + serverless function)

4. **Add your API key as an environment variable**
   - In the Vercel project → Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = `sk-ant-...your key...`
   - Redeploy after adding it

5. **Done** — Vercel gives you a live URL like `https://intellivora-ai.vercel.app`
   - The chatbot will call `/api/chat` on the same domain, which securely forwards to Anthropic using your server-side key. Your key is never exposed to visitors.

## Custom domain
In Vercel → Settings → Domains, add `intellivora.ai` (or whatever you own) and follow the DNS instructions shown.

## Alternative hosts
The same pattern works on Netlify (Netlify Functions) or any Node.js host (Express) — just keep the API key server-side and never put it in `index.html`.
