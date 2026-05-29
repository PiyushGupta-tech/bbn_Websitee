/**
 * Optional Vercel relay when UrbanRupee blocks your VPS IP.
 * Deploy: cd deploy/urban-relay && npx vercel --prod
 * Then set URBAN_RELAY_URL + URBAN_RELAY_SECRET in payin-secrets.php
 */
const URBAN_URL = 'https://merchant.urbanrupee.in/api/pg/urbanpay/initiate';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ status: false, message: 'Method not allowed' });
    return;
  }

  const secret = process.env.RELAY_SECRET || '';
  if (secret && req.headers['x-relay-secret'] !== secret) {
    res.status(401).json({ status: false, message: 'Unauthorized relay' });
    return;
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : req.body && typeof req.body === 'object'
          ? req.body
          : JSON.parse(String(req.body || '{}'));

    const upstream = await fetch(URBAN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    const text = await upstream.text();
    res.status(upstream.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (err) {
    res.status(500).json({ status: false, message: String(err?.message || err) });
  }
}
