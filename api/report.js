// api/report.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, lat, lon } = req.body;

    // Telegram Bot Token ko hardcode karen
    const telegramToken = "8188550519:AAHcTC1dZzvyYl4saUi5RPXmQDIU7ZNpWqI";  // Apna bot token yahan daalain

    // Location ko Google Maps link ke format mein convert karen
    const locationUrl = `https://www.google.com/maps?q=${lat},${lon}`;

    try {
      // Telegram API ko call karen
      const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: user_id,
          text: `User's Location: \n${locationUrl}`,
        }),
      });

      const data = await response.json();

      // Check if the message was sent successfully
      if (data.ok) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: 'Failed to send message' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
