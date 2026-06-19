# 🌍 Overseas Job Matcher

A single-file web app that matches your résumé to **live, visa-sponsored software / IT job listings** abroad (Gulf, Netherlands/UK, Germany, Australia/NZ, Canada, Ireland), scores each for fit, flags gaps, tailors your résumé per role, and tracks your applications.

Everything runs in your browser. The only network call is directly to the **Anthropic API** (with the web-search tool) using **your own API key**.

## Features
- 🔎 Live job search via Anthropic's `web_search` tool
- 🎯 0–100 fit score, matching skills, and honest gap analysis per role
- 🛂 Visa-sponsorship indicator and recency
- ✍️ One-click "tailor my résumé" suggestions per job
- 📌 Application tracker (Applied / Interview / Offer / Rejected) + notes, saved in `localStorage`
- 📤 Export tracked jobs to CSV
- ⚙️ Model switch — **Sonnet 4.6** (balanced, default), **Haiku 4.5** (cheapest), **Opus 4.8** (best)

## Use it
1. Open the live site (GitHub Pages) or double-click `index.html` locally.
2. Click **🔑 API key** and paste a key from [console.anthropic.com](https://console.anthropic.com/settings/keys) (add a few dollars of credit).
3. Paste your résumé, pick target locations, hit **Find matching jobs**.

## How it works
The browser sends your résumé + locations to `POST https://api.anthropic.com/v1/messages` with the `web_search` server tool enabled (using the `anthropic-dangerous-direct-browser-access` header for CORS). The model searches current postings, ranks them by fit, and returns structured JSON that the page renders as cards.

## Cost
Free hosting. AI usage is pay-as-you-go — typically a few cents per search (it includes a live web search). Haiku is the cheapest/fastest option in the model dropdown.

## Privacy
Your API key and tracked applications live only in your browser's `localStorage`. The résumé text is sent only to Anthropic to perform the search.

## Tech
Plain HTML + Tailwind (CDN) + vanilla JavaScript. No build step, no backend, no framework.
