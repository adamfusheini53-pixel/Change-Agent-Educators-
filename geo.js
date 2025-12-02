export default async function handler(req, res) {
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  try {
    const url = `https://ipapi.co/${ip}/json/`;
    const r = await fetch(url);
    if (!r.ok) return res.status(500).json({ error: 'ipapi error' });
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    return res.json({ ip, geo: data });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}