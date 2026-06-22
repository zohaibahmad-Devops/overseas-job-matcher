// Netlify Function: fetch REAL, live job postings from free public job boards
// (no API key needed) — server-side so there are no CORS issues in the browser.
// Sources: Arbeitnow (EU roles, has visa-sponsorship flag) + Remotive (remote software).

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

function stripHtml(s){ return String(s||'').replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi,' ').replace(/\s+/g, ' ').trim(); }

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };

  const params = event.queryStringParameters || {};
  const q = (params.q || 'software developer').toLowerCase();
  const terms = q.split(/[^a-z0-9.+#]+/).filter(t => t.length > 1);
  const out = [];

  // --- Arbeitnow (Europe; includes a visa_sponsorship flag) ---
  for (let page = 1; page <= 2; page++) {
    try {
      const r = await fetch('https://www.arbeitnow.com/api/job-board-api?page=' + page);
      const j = await r.json();
      (j.data || []).forEach(job => {
        const hay = (job.title + ' ' + (job.tags || []).join(' ') + ' ' + (job.description || '')).toLowerCase();
        if (!terms.some(t => hay.includes(t))) return;
        out.push({
          title: job.title,
          company: job.company_name,
          location: job.location || (job.remote ? 'Remote' : ''),
          url: job.url,
          remote: !!job.remote,
          visa: job.visa_sponsorship === true ? 'Yes' : 'Unclear',
          posted: job.created_at ? new Date(job.created_at * 1000).toISOString().slice(0, 10) : '',
          source: 'Arbeitnow',
          snippet: stripHtml(job.description).slice(0, 240)
        });
      });
    } catch (e) { /* ignore page errors */ }
  }

  // --- Remotive (remote software jobs) ---
  try {
    const r = await fetch('https://remotive.com/api/remote-jobs?limit=50&search=' + encodeURIComponent(q));
    const j = await r.json();
    (j.jobs || []).forEach(job => {
      out.push({
        title: job.title,
        company: job.company_name,
        location: job.candidate_required_location || 'Remote',
        url: job.url,
        remote: true,
        visa: 'Unclear',
        posted: (job.publication_date || '').slice(0, 10),
        source: 'Remotive',
        snippet: stripHtml(job.description).slice(0, 240)
      });
    });
  } catch (e) { /* ignore */ }

  // dedupe by url, cap
  const seen = new Set();
  const dedup = [];
  for (const j of out) {
    if (!j.url || seen.has(j.url)) continue;
    seen.add(j.url);
    dedup.push(j);
    if (dedup.length >= 40) break;
  }

  return { statusCode: 200, headers: { ...CORS, 'content-type': 'application/json' }, body: JSON.stringify({ jobs: dedup }) };
};
