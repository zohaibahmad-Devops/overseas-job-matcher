# 🌍 Overseas Job Matcher

A single-file web app that matches your résumé to **live, visa-sponsored software / IT job listings** abroad (Gulf, Netherlands/UK, Germany, Australia/NZ, Canada, Ireland), scores each for fit, flags gaps, tailors your résumé per role, and tracks your applications.

Powered by **Groq (Llama)** — completely free, **no credit card**. The AI matches you to visa-sponsoring employers and scores fit; each card has **LinkedIn / Google** buttons that open the live openings for that role.

## Features
- 🎯 **Real, live job postings** from free job boards, scored 0–100 against your résumé by AI (matching skills + honest gaps)
- 🔗 Direct **Apply ↗** link on every card (real opening), plus a LinkedIn search fallback
- 🛂 Visa-sponsorship indicator (Arbeitnow flag)
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
1. The browser asks a Netlify Function (`/.netlify/functions/jobs`) for **real, live postings** from free public job boards (Arbeitnow — EU roles with a visa-sponsorship flag — and Remotive — remote software). No API key needed; fetched server-side to avoid CORS.
2. Those real postings + your résumé go to a second Netlify Function (`/.netlify/functions/ai`) which calls the Groq API (free Llama model) to **score each posting for fit** and return JSON.
3. The page renders the real jobs with their **direct Apply links**, the fit score, matching skills, and gaps.

The Groq key stays server-side, so links are real and friends never need a key.

## Cost
**Free.** Free static/serverless hosting (Netlify) + Groq's free API tier — no credit card.

## Privacy
Your key and tracked applications live only in your browser's `localStorage` (or, if you set the Netlify env var, server-side). Résumé text is sent only to Groq for matching.

## Tech
Plain HTML + Tailwind (CDN) + vanilla JavaScript. No build step, no backend, no framework.
