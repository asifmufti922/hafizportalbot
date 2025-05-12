export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { chat_id, latitude, longitude } = req.body;

  if (!chat_id || !latitude || !longitude) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const BOT_TOKEN = '7737650968:AAHsvAEaKL5kOCcgQ4RPtyVjeN3-Hl5Aw1k'; // Yahan apna bot token direct likhen
  const message = `📍 New Location:\nLat: ${latitude}\nLon: ${longitude}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const telegramRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id,
        text: message
      })
    });

    const data = await telegramRes.json();

    if (!data.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ error: 'Telegram send failed', telegram: data });
    }

    res.status(200).json({ success: true, sent: true });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
