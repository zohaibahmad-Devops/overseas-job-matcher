# 🌍 Overseas Job Matcher

A single-file web app that matches your résumé to **live, visa-sponsored software / IT job listings** abroad (Gulf, Netherlands/UK, Germany, Australia/NZ, Canada, Ireland), scores each for fit, flags gaps, tailors your résumé per role, and tracks your applications.

Powered by **Groq (Llama)** — completely free, **no credit card**. The AI matches you to visa-sponsoring employers and scores fit; each card has **LinkedIn / Google** buttons that open the live openings for that role.

## Features
- 🎯 AI matches you to named visa-sponsoring employers, with a 0–100 fit score, matching skills, and honest gaps
- 🔎 **LinkedIn / Google** buttons per card → open the live openings for that role
- 🛂 Visa-sponsorship indicator
- ✍️ One-click "tailor my résumé" suggestions per job
- 📌 Application tracker (Applied / Interview / Offer / Rejected) + notes, saved in `localStorage`
- 📤 Export tracked jobs to CSV
- ⚙️ Model switch — **Llama 3.3 70B** (best, default) and **Llama 3.1 8B** (fast) — both free

## Use it
1. Open the live **Netlify** site.
2. Get a free Groq key at [console.groq.com/keys](https://console.groq.com/keys) (sign in, Create API Key — **no credit card**). Click **🔑 API key** in the app and paste it.
3. Paste your résumé, pick target locations, hit **Find matching jobs**, then use the 🔎 buttons on a card to open live openings.

## Let friends use it without a key
Set `GROQ_API_KEY` in **Netlify → Site configuration → Environment variables** (your free Groq key). The site's serverless function (`netlify/functions/ai.js`) then uses it for everyone, so visitors need nothing.

## How it works
The browser posts your résumé + locations to a Netlify Function (`/.netlify/functions/ai`) which calls the Groq API (`api.groq.com`, OpenAI-compatible) with a free Llama model and returns matched employers as JSON. The key stays server-side; nothing is crawled live, so each card links out to LinkedIn/Google job search for the real-time postings.

## Cost
**Free.** Free static/serverless hosting (Netlify) + Groq's free API tier — no credit card.

## Privacy
Your key and tracked applications live only in your browser's `localStorage` (or, if you set the Netlify env var, server-side). Résumé text is sent only to Groq for matching.

## Tech
Plain HTML + Tailwind (CDN) + vanilla JavaScript. No build step, no backend, no framework.
