const express = require('express');
const router = express.Router();
const storage = require('../models/storage');

// Helper to handle both sync and async storage
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get all groups
router.get('/', asyncHandler(async (req, res) => {
  const groups = await storage.getGroups();
  res.json(groups);
}));

// Get group by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const group = await storage.getGroupById(req.params.id);
  if (!group) {
    return res.status(404).json({ error: 'Group not found' });
  }
  res.json(group);
}));

// Create new group
router.post('/', asyncHandler(async (req, res) => {
  const { name, description, creatorId } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Group name is required' });
  }

  const newGroup = await storage.createGroup({
    name,
    description: description || '',
    creatorId: creatorId || null,
    members: creatorId ? [creatorId] : []
  });

  res.status(201).json(newGroup);
}));

// Join group
router.post('/:id/join', asyncHandler(async (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const group = await storage.joinGroup(req.params.id, userId);
  
  if (!group) {
    return res.status(404).json({ error: 'Group not found or user already a member' });
  }

  res.json(group);
}));

// Leave group
router.post('/:id/leave', asyncHandler(async (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const group = await storage.leaveGroup(req.params.id, userId);
  
  if (!group) {
    return res.status(404).json({ error: 'Group not found' });
  }

  res.json(group);
}));

module.exports = router;
