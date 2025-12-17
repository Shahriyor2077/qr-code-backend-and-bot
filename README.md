# QR Check System

Moderator panel va Telegram bot - foydalanuvchilar uchun QR kod va chek tizimi.

## O'rnatish

1. **Backend paketlarni o'rnatish:**
```bash
npm install
```

2. **Frontend paketlarni o'rnatish:**
```bash
cd client
npm install
```

3. **`.env` faylini sozlash:**
```bash
copy .env.example .env
```

`.env` faylini tahrirlang:
```
MONGODB_URI=mongodb://localhost:27017/qr-check-system
BOT_TOKEN=your_telegram_bot_token
BOT_USERNAME=your_bot_username
SESSION_SECRET=your_secret_key
PORT=3000
DEFAULT_MODERATOR_USERNAME=admin
DEFAULT_MODERATOR_PASSWORD=admin123
```

4. **Telegram bot yaratish:**
   - @BotFather ga boring
   - `/newbot` buyrug'ini yuboring
   - Bot nomini va username ni kiriting
   - Olingan tokenni `.env` faylga qo'shing

## Ishga tushirish (Development)

**Backend server:**
```bash
npm start
```

**Frontend (alohida terminalda):**
```bash
cd client
npm run dev
```

**Telegram bot (alohida terminalda):**
```bash
npm run bot
```

## Foydalanish

1. `http://localhost:5173` ga kiring (development)
2. Login: `admin`, Parol: `admin123`
3. Yangi foydalanuvchi qo'shing
4. QR kodni yuklab oling yoki chop eting
5. Foydalanuvchi QR ni skanerlasa, Telegram botga yo'naltiriladi

## Texnologiyalar

- Backend: Node.js + Express
- Frontend: React + Vite
- Database: MongoDB + Mongoose
- Bot: Telegraf (Telegram bot)
- QRCode generatsiya
