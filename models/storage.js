const fs = require('fs');
const path = require('path');

const USE_LOCAL = process.env.USE_LOCAL_STORAGE === 'true';
const DATA_FILE = path.join(__dirname, '../data/local-storage.json');

let data = {
  users: [],
  groups: []
};

// Local storage implementation
const localStorage = {
  init: () => {
    if (!fs.existsSync(path.dirname(DATA_FILE))) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      try {
        const fileData = fs.readFileSync(DATA_FILE, 'utf8');
        data = JSON.parse(fileData);
      } catch (error) {
        console.error('Error reading local storage:', error);
      }
    }
  },
  
  save: () => {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing to local storage:', error);
    }
  },

  // User operations
  getUsers: () => data.users,
  
  getUserById: (id) => data.users.find(u => u.id === id),
  
  getUserByEmail: (email) => data.users.find(u => u.email === email),
  
  createUser: (userData) => {
    const newUser = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...userData,
      skills: userData.skills || [],
      endorsements: userData.endorsements || []
    };
    data.users.push(newUser);
    localStorage.save();
    return newUser;
  },
  
  updateUser: (id, updates) => {
    const index = data.users.findIndex(u => u.id === id);
    if (index !== -1) {
      data.users[index] = { ...data.users[index], ...updates };
      localStorage.save();
      return data.users[index];
    }
    return null;
  },

  // Group operations
  getGroups: () => data.groups,
  
  getGroupById: (id) => data.groups.find(g => g.id === id),
  
  createGroup: (groupData) => {
    const newGroup = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      members: [],
      ...groupData
    };
    data.groups.push(newGroup);
    localStorage.save();
    return newGroup;
  },
  
  joinGroup: (groupId, userId) => {
    const group = data.groups.find(g => g.id === groupId);
    if (group && !group.members.includes(userId)) {
      group.members.push(userId);
      localStorage.save();
      return group;
    }
    return null;
  },

  leaveGroup: (groupId, userId) => {
    const group = data.groups.find(g => g.id === groupId);
    if (group) {
      group.members = group.members.filter(m => m !== userId);
      localStorage.save();
      return group;
    }
    return null;
  }
};

// MongoDB implementation (placeholder for future)
const mongoStorage = {
  init: async () => {
    const mongoose = require('mongoose');
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('📦 Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  },
  // ... implement MongoDB methods when needed
};

module.exports = USE_LOCAL ? localStorage : mongoStorage;
