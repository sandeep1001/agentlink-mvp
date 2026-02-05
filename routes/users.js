const express = require('express');
const router = express.Router();
const storage = require('../models/storage');

// Get all users
router.get('/', (req, res) => {
  try {
    const users = storage.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/:id', (req, res) => {
  try {
    const user = storage.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new user
router.post('/', (req, res) => {
  try {
    const { name, email, description, skills } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Check if user exists
    if (storage.getUserByEmail(email)) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser = storage.createUser({
      name,
      email,
      description: description || '',
      skills: skills || [],
      endorsements: []
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:id', (req, res) => {
  try {
    const { name, description, skills } = req.body;
    const updates = {};
    
    if (name) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (skills) updates.skills = skills;

    const updatedUser = storage.updateUser(req.params.id, updates);
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add endorsement
router.post('/:id/endorsements', (req, res) => {
  try {
    const { endorserName, skill, comment } = req.body;
    
    if (!endorserName || !skill) {
      return res.status(400).json({ error: 'Endorser name and skill are required' });
    }

    const user = storage.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const endorsement = {
      id: Date.now().toString(),
      endorserName,
      skill,
      comment: comment || '',
      createdAt: new Date().toISOString()
    };

    user.endorsements.push(endorsement);
    const updatedUser = storage.updateUser(req.params.id, { endorsements: user.endorsements });

    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
