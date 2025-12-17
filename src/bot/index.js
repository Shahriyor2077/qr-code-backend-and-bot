require('dotenv').config();
const { Telegraf } = require('telegraf');
const mongoose = require('mongoose');
const User = require('../models/User');

const bot = new Telegraf(process.env.BOT_TOKEN);

// MongoDB ulanish
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Bot: MongoDB ga ulandi'))
  .catch(err => console.error('MongoDB xatosi:', err));

// /start komandasi
bot.start(async (ctx) => {
  const userId = ctx.startPayload;
  
  if (!userId) {
    return ctx.reply(
      '👋 Assalomu alaykum!\n\n' +
      '📱 QR-kodni skanerlang va foydalanuvchi ma\'lumotlarini ko\'ring.\n\n' +
      'QR-kod orqali kirganingizda sizning ma\'lumotlaringiz ko\'rsatiladi.'
    );
  }
  
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return ctx.reply('❌ Foydalanuvchi topilmadi. QR-kod noto\'g\'ri bo\'lishi mumkin.');
    }
    
    const message = 
      `👤 *Foydalanuvchi ma'lumotlari*\n\n` +
      `📛 *Ism:* ${user.name}\n` +
      `📞 *Telefon:* ${user.phone}\n` +
      `🏢 *Shaxobcha:* ${user.branch}\n\n` +
      `🎫 *Jami cheklar soni:* ${user.checkCount} ta\n\n` +
      `📅 *Ro'yxatdan o'tgan:* ${user.createdAt.toLocaleDateString('uz-UZ')}`;
    
    await ctx.replyWithMarkdown(message);
    
  } catch (error) {
    console.error('Xatolik:', error);
    ctx.reply('❌ Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.');
  }
});

// /info komandasi
bot.command('info', (ctx) => {
  ctx.reply(
    '📋 *Bot haqida*\n\n' +
    'Bu bot QR-kod orqali foydalanuvchi ma\'lumotlarini ko\'rish uchun yaratilgan.\n\n' +
    '🔹 QR-kodni skanerlang\n' +
    '🔹 Bot avtomatik ma\'lumotlarni ko\'rsatadi\n' +
    '🔹 Cheklar soni yangilanib turadi',
    { parse_mode: 'Markdown' }
  );
});

// /help komandasi
bot.help((ctx) => {
  ctx.reply(
    '🆘 *Yordam*\n\n' +
    '/start - Botni boshlash\n' +
    '/info - Bot haqida ma\'lumot\n' +
    '/help - Yordam\n\n' +
    'QR-kodni skanerlang va ma\'lumotlaringizni ko\'ring!',
    { parse_mode: 'Markdown' }
  );
});

// Botni ishga tushirish
bot.launch()
  .then(() => console.log('🤖 Telegram bot ishga tushdi'))
  .catch(err => console.error('Bot xatosi:', err));

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
