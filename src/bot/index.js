const { Telegraf } = require('telegraf');
const User = require('../models/User');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  const userId = ctx.startPayload;
  
  if (!userId) {
    return ctx.reply(`👋 Assalomu alaykum!

QR-kodni skanerlang va foydalanuvchi malumotlarini koring.`);
  }
  
  const user = await User.findById(userId);
  if (!user) return ctx.reply('❌ Foydalanuvchi topilmadi.');
  
  ctx.reply(`👤 Foydalanuvchi malumotlari

📛 Ism: ${user.name}
📞 Telefon: ${user.phone}
🏢 Shaxobcha: ${user.branch}
🧾 Jami cheklar: ${user.checkCount} ta
📅 Royxatdan otgan: ${user.createdAt.toLocaleDateString('uz-UZ')}`);
});

bot.command('info', (ctx) => {
  ctx.reply(`📋 Bot haqida

Bu bot QR-kod orqali foydalanuvchi malumotlarini korish uchun yaratilgan.`);
});

bot.help((ctx) => {
  ctx.reply(`🆘 Yordam

/start - Botni boshlash
/info - Bot haqida malumot
/help - Yordam`);
});

bot.launch().then(() => console.log('🤖 Telegram bot ishga tushdi'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
