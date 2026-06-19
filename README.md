# 🌍 Overseas Job Matcher

A single-file web app that matches your résumé to **live, visa-sponsored software / IT job listings** abroad (Gulf, Netherlands/UK, Germany, Australia/NZ, Canada, Ireland), scores each for fit, flags gaps, tailors your résumé per role, and tracks your applications.

Everything runs in your browser. The only network call is directly to the **Google Gemini API** (with Google Search grounding) using **your own free API key** — no credit card, no server.

## Features
- 🔎 Live job search via Google Gemini's Google Search grounding
- 🎯 0–100 fit score, matching skills, and honest gap analysis per role
- 🛂 Visa-sponsorship indicator and recency
- ✍️ One-click "tailor my résumé" suggestions per job
- 📌 Application tracker (Applied / Interview / Offer / Rejected) + notes, saved in `localStorage`
- 📤 Export tracked jobs to CSV
- ⚙️ Model switch — **Gemini 2.5 Flash** (best, default) and **Gemini 2.0 Flash** (fast) — both free

## Use it
1. Open the live site or double-click `index.html` locally.
2. Click **🔑 API key** and paste a **free** key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey) (sign in with Google → Create API key → no credit card).
3. Paste your résumé, pick target locations, hit **Find matching jobs**.

## How it works
The browser sends your résumé + locations to the Gemini API (`generativelanguage.googleapis.com`) with the `google_search` tool enabled. Gemini searches current postings, ranks them by fit, and returns structured JSON that the page renders as cards.

## Cost
**Free.** Free static hosting + Google Gemini's free API tier (generous per-day limits for personal use, no credit card required).

## Privacy
Your API key and tracked applications live only in your browser's `localStorage`. The résumé text is sent only to Google to perform the search.

## Tech
Plain HTML + Tailwind (CDN) + vanilla JavaScript. No build step, no backend, no framework.
