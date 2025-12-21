require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ['https://qr-code-frontend-five.vercel.app', 'http://localhost:5173'], credentials: true }));
app.use(express.json());
app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400000, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' }
}));

app.use('/api', authRoutes);
app.use('/api/users', userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server ${PORT} portda ishlamoqda`));
  require('./bot/index');
});
