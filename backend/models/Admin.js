const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Keep original ID for seeding
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In a real app, hash passwords!
});

module.exports = mongoose.model('Admin', AdminSchema);