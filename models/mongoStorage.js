const mongoose = require('mongoose');
const User = require('./User');
const Group = require('./Group');

const mongoStorage = {
  /**
   * Initialize MongoDB connection
   */
  init: async () => {
    try {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) {
        throw new Error('MONGODB_URI environment variable is not set');
      }
      
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log('📦 Connected to MongoDB');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      throw error;
    }
  },

  // ==================== USER OPERATIONS ====================

  /**
   * Get all users
   */
  getUsers: async () => {
    try {
      return await User.find({}).sort({ createdAt: -1 }).lean();
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (id) => {
    try {
      return await User.findOne({ id }).lean();
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  },

  /**
   * Get user by email
   */
  getUserByEmail: async (email) => {
    try {
      return await User.findOne({ email }).lean();
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  },

  /**
   * Create a new user
   */
  createUser: async (userData) => {
    try {
      const newUser = new User({
        id: Date.now().toString(),
        createdAt: new Date(),
        ...userData,
        skills: userData.skills || [],
        endorsements: userData.endorsements || []
      });
      
      const savedUser = await newUser.save();
      return savedUser.toObject();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Update user
   */
  updateUser: async (id, updates) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { id },
        { $set: updates },
        { new: true, runValidators: true }
      ).lean();
      
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // ==================== GROUP OPERATIONS ====================

  /**
   * Get all groups
   */
  getGroups: async () => {
    try {
      return await Group.find({}).sort({ createdAt: -1 }).lean();
    } catch (error) {
      console.error('Error getting groups:', error);
      throw error;
    }
  },

  /**
   * Get group by ID
   */
  getGroupById: async (id) => {
    try {
      return await Group.findOne({ id }).lean();
    } catch (error) {
      console.error('Error getting group by ID:', error);
      throw error;
    }
  },

  /**
   * Create a new group
   */
  createGroup: async (groupData) => {
    try {
      const newGroup = new Group({
        id: Date.now().toString(),
        createdAt: new Date(),
        members: [],
        ...groupData
      });
      
      const savedGroup = await newGroup.save();
      return savedGroup.toObject();
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  },

  /**
   * Add user to group
   */
  joinGroup: async (groupId, userId) => {
    try {
      const group = await Group.findOne({ id: groupId });
      
      if (!group) {
        return null;
      }
      
      // Check if user is already a member
      if (group.members.includes(userId)) {
        return group.toObject();
      }
      
      group.members.push(userId);
      await group.save();
      
      return group.toObject();
    } catch (error) {
      console.error('Error joining group:', error);
      throw error;
    }
  },

  /**
   * Remove user from group
   */
  leaveGroup: async (groupId, userId) => {
    try {
      const group = await Group.findOne({ id: groupId });
      
      if (!group) {
        return null;
      }
      
      group.members = group.members.filter(m => m !== userId);
      await group.save();
      
      return group.toObject();
    } catch (error) {
      console.error('Error leaving group:', error);
      throw error;
    }
  }
};

module.exports = mongoStorage;
