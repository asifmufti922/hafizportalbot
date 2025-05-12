// Referral logic for entry into second bot (hafizportalbot) const BOT_TOKEN = '7737650968:AAHsvAEaKL5kOCcgQ4RPtyVjeN3-Hl5Aw1k'; const SECOND_BOT_USERNAME = 'hafizportalbot'; const REQUIRED_REFERRALS = 10;

let referrals = {}; // Use a proper DB in production

export default async function handler(req, res) { if (req.method !== 'POST') return res.status(405).end();

const body = req.body; const message = body.message;

if (!message || !message.chat || !message.chat.id) { return res.status(200).end(); }

const chat_id = message.chat.id; const text = message.text || ''; const userId = chat_id.toString();

referrals[userId] = referrals[userId] || 0;

if (text === '/refer') { const referLink = https://t.me/YOUR_MAIN_BOT_USERNAME?start=${chat_id}; const reply = `📢 Share this link with friends: ${referLink}

Each successful join counts as a referral!`; await sendMessage(chat_id, reply); }

else if (text.startsWith('/start ') && text.split(' ').length === 2) { const referrerId = text.split(' ')[1]; if (referrerId !== chat_id.toString()) { referrals[referrerId] = (referrals[referrerId] || 0) + 1; } await sendMessage(chat_id, 👋 Welcome! Your referral has been recorded.); }

// Default reply for all commands const remaining = REQUIRED_REFERRALS - referrals[userId]; const reply = `🔐 Access Locked!

🔸 Apko @${SECOND_BOT_USERNAME} par access chahiye? Pehle ${remaining} logon ko refer karein.

🧠 Yeh hack use karne ke liye 10 referral complete karein aur admin se rabta karein.
!`; await sendMessage(chat_id, reply);

return res.status(200).end(); }

async function sendMessage(chat_id, text) { const url = https://api.telegram.org/bot${BOT_TOKEN}/sendMessage; await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id, text, parse_mode: 'Markdown' }) }); }

