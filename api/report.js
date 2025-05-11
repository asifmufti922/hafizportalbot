// api/report.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, lat, lon } = req.body;

    // Telegram Bot Token (set this in Vercel environment variables)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;

    // Location URL for Google Maps
    const locationUrl = `https://www.google.com/maps?q=${lat},${lon}`;

    // Send message to the user via Telegram bot
    const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: user_id,
        text: `User's Location: \n${locationUrl}`,
      })
    });

    const data = await response.json();

    // Return success response
    if (data.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
