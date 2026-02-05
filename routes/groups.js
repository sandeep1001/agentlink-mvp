const express = require('express');
const router = express.Router();
const storage = require('../models/storage');

// Get all groups
router.get('/', (req, res) => {
  try {
    const groups = storage.getGroups();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get group by ID
router.get('/:id', (req, res) => {
  try {
    const group = storage.getGroupById(req.params.id);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new group
router.post('/', (req, res) => {
  try {
    const { name, description, creatorId } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Group name is required' });
    }

    const newGroup = storage.createGroup({
      name,
      description: description || '',
      creatorId: creatorId || null,
      members: creatorId ? [creatorId] : []
    });

    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Join group
router.post('/:id/join', (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const group = storage.joinGroup(req.params.id, userId);
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found or user already a member' });
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leave group
router.post('/:id/leave', (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const group = storage.leaveGroup(req.params.id, userId);
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
