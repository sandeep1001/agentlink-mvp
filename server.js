require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'agentlink-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Initialize storage
const storage = require('./models/storage');
storage.init();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/groups', require('./routes/groups'));
app.use('/auth', require('./routes/auth'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AgentLink API is running' });
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 AgentLink server running on http://localhost:${PORT}`);
});
