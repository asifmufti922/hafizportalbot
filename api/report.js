export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { chat_id, latitude, longitude } = req.body;

  if (!chat_id || !latitude || !longitude) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const BOT_TOKEN = '7737650968:AAHsvAEaKL5kOCcgQ4RPtyVjeN3-Hl5Aw1k'; // <-- Replace with your bot token
  const googleMapLink = `https://maps.google.com/?q=${latitude},${longitude}`;
  const message = `📍 Location Received:\nLat: ${latitude}\nLon: ${longitude}\n\n[View on Google Maps](${googleMapLink})`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json();

    if (!result.ok) {
      console.error('Telegram error:', result);
      return res.status(500).json({ error: 'Telegram API failed', result });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
