const mongoose = require('mongoose');

const endorsementSchema = new mongoose.Schema({
  id: { type: String, required: true },
  endorserName: { type: String, required: true },
  skill: { type: String, required: true },
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  skills: [{ type: String }],
  endorsements: [endorsementSchema],
  createdAt: { type: Date, default: Date.now }
});

// Create indexes
userSchema.index({ email: 1 });
userSchema.index({ id: 1 });

module.exports = mongoose.model('User', userSchema);
