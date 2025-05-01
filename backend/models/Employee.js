const mongoose = require('mongoose');
const TaskSchema = require('./Task'); // Import the Task schema

const EmployeeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Keep original ID for seeding
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In a real app, hash passwords!
  tasks: [TaskSchema], // Embed the Task schema
  taskNumbers: {
    active: { type: Number, default: 0 },
    newTask: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);