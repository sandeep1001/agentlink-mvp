const express = require('express');
const router = express.Router();
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const axios = require('axios');
const storage = require('../models/storage');

// Moltbook OAuth configuration
const MOLTBOOK_AUTH_URL = 'https://moltbook.com/oauth/authorize';
const MOLTBOOK_TOKEN_URL = 'https://moltbook.com/oauth/token';
const MOLTBOOK_API_URL = 'https://moltbook.com/api';

// Configure passport with Moltbook OAuth2
if (process.env.MOLTBOOK_CLIENT_ID && process.env.MOLTBOOK_CLIENT_SECRET) {
  passport.use('moltbook', new OAuth2Strategy({
    authorizationURL: MOLTBOOK_AUTH_URL,
    tokenURL: MOLTBOOK_TOKEN_URL,
    clientID: process.env.MOLTBOOK_CLIENT_ID,
    clientSecret: process.env.MOLTBOOK_CLIENT_SECRET,
    callbackURL: process.env.MOLTBOOK_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Fetch user profile from Moltbook
      const response = await axios.get(`${MOLTBOOK_API_URL}/me`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      
      const moltbookProfile = response.data;
      
      // Find or create user
      let user = storage.getUserByEmail(moltbookProfile.email);
      
      if (!user) {
        user = storage.createUser({
          name: moltbookProfile.name,
          email: moltbookProfile.email,
          description: moltbookProfile.bio || '',
          moltbookId: moltbookProfile.id,
          accessToken
        });
      } else {
        // Update access token
        user = storage.updateUser(user.id, { 
          accessToken,
          moltbookId: moltbookProfile.id 
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const user = storage.getUserById(id);
    done(null, user);
  });
}

// Auth routes
router.get('/moltbook', 
  passport.authenticate('moltbook', { 
    scope: ['profile', 'email', 'post'] 
  })
);

router.get('/moltbook/callback',
  passport.authenticate('moltbook', { 
    failureRedirect: '/login?error=auth_failed' 
  }),
  (req, res) => {
    // Successful authentication
    res.redirect(`/?user=${req.user.id}`);
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

router.get('/me', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json(req.user);
});

// Post to Moltbook
router.post('/moltbook/post', async (req, res) => {
  try {
    if (!req.user || !req.user.accessToken) {
      return res.status(401).json({ error: 'Not authenticated with Moltbook' });
    }

    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const response = await axios.post(`${MOLTBOOK_API_URL}/posts`, 
      { content },
      { headers: { Authorization: `Bearer ${req.user.accessToken}` } }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
