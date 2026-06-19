// Netlify Function: server-side Groq proxy (free, no credit card).
// Prefers the owner's GROQ_API_KEY env var so visitors/friends need NO key.
// If the env var isn't set, it relays a key sent from the client (owner's own browser).
// The key is never exposed to other visitors and is never logged.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const ALLOWED_MODELS = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: { message: 'Method not allowed' } }) };
  }

  let p;
  try { p = JSON.parse(event.body || '{}'); }
  catch { return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: { message: 'Bad JSON body' } }) }; }

  const apiKey = process.env.GROQ_API_KEY || p.key;
  if (!apiKey) {
    return {
      statusCode: 501,
      headers: { ...CORS, 'content-type': 'application/json' },
      body: JSON.stringify({ error: { message: 'No Groq key. Enter your free key with the 🔑 button, or (for friends) set GROQ_API_KEY in Netlify env vars.' } })
    };
  }

  const model = ALLOWED_MODELS.includes(p.model) ? p.model : 'llama-3.3-70b-versatile';
  const payload = {
    model,
    messages: [
      { role: 'system', content: String(p.system || '') },
      { role: 'user', content: String(p.user || '') }
    ],
    temperature: 0.5,
    max_tokens: Math.min(Number(p.maxTokens) || 8000, 8000)
  };
  if (p.json) payload.response_format = { type: 'json_object' };

  try {
    const r = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + apiKey },
      body: JSON.stringify(payload)
    });
    const text = await r.text();
    return { statusCode: r.status, headers: { ...CORS, 'content-type': 'application/json' }, body: text };
  } catch (e) {
    return { statusCode: 502, headers: { ...CORS, 'content-type': 'application/json' }, body: JSON.stringify({ error: { message: 'Upstream error: ' + e.message } }) };
  }
};
