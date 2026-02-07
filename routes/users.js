const express = require('express');
const router = express.Router();
const storage = require('../models/storage');

// Helper to handle both sync and async storage
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get all users
router.get('/', asyncHandler(async (req, res) => {
  const users = await storage.getUsers();
  res.json(users);
}));

// Get user by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const user = await storage.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
}));

// Create new user
router.post('/', asyncHandler(async (req, res) => {
  const { name, email, description, skills } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Check if user exists
  const existingUser = await storage.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const newUser = await storage.createUser({
    name,
    email,
    description: description || '',
    skills: skills || [],
    endorsements: []
  });

  res.status(201).json(newUser);
}));

// Update user
router.put('/:id', asyncHandler(async (req, res) => {
  const { name, description, skills } = req.body;
  const updates = {};
  
  if (name) updates.name = name;
  if (description !== undefined) updates.description = description;
  if (skills) updates.skills = skills;

  const updatedUser = await storage.updateUser(req.params.id, updates);
  
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(updatedUser);
}));

// Add endorsement
router.post('/:id/endorsements', asyncHandler(async (req, res) => {
  const { endorserName, skill, comment } = req.body;
  
  if (!endorserName || !skill) {
    return res.status(400).json({ error: 'Endorser name and skill are required' });
  }

  const user = await storage.getUserById(req.params.id);
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
  const updatedUser = await storage.updateUser(req.params.id, { endorsements: user.endorsements });

  res.status(201).json(updatedUser);
}));

module.exports = router;
