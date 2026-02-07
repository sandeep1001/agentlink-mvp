const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: String }], // Array of user IDs
  creatorId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Create indexes
groupSchema.index({ id: 1 });
groupSchema.index({ name: 1 });

module.exports = mongoose.model('Group', groupSchema);
