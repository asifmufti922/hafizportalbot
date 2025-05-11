export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  const { user_id, lat, lon } = req.body;

  const text = `Live Location:\nLatitude: ${lat}\nLongitude: ${lon}\n[Google Maps](https://maps.google.com/?q=${lat},${lon})`;

  await fetch(`https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: user_id,
      text: text,
      parse_mode: "Markdown",
    }),
  });

  res.status(200).json({ ok: true });
}
