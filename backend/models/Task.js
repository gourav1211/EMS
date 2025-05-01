const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  active: { type: Boolean, default: false },
  newTask: { type: Boolean, default: true },
  completed: { type: Boolean, default: false },
  failed: { type: Boolean, default: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }, // Consider using Date type
  category: { type: String, required: true },
});

module.exports = TaskSchema; // Export schema directly, not as a model yet
