const Employee = require('../models/Employee');
const mongoose = require('mongoose');

// Helper function to recalculate task numbers
const recalculateTaskNumbers = (tasks) => {
  return tasks.reduce((acc, task) => {
    if (task.completed) acc.completed++;
    else if (task.failed) acc.failed++;
    else if (task.active) acc.active++; // Task is active but not new
    else if (task.newTask) acc.newTask++; // Task is new
    return acc;
  }, { active: 0, newTask: 0, completed: 0, failed: 0 });
};


// @desc    Create a new task for an employee (Admin only - add auth middleware later)
// @route   POST /api/employees/:employeeId/tasks
const createTask = async (req, res) => {
  const { title, description, date, category } = req.body;
  const { employeeId } = req.params;

  // Basic validation
  if (!title || !description || !date || !category) {
    return res.status(400).json({ msg: 'Please include all task fields' });
  }

  try {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    const newTask = {
      // Mongoose will generate a unique _id for the subdocument
      title,
      description,
      date,
      category,
      active: false, // Starts as inactive until accepted
      newTask: true, // Starts as new
      completed: false,
      failed: false,
    };

    employee.tasks.push(newTask);

    // Recalculate task numbers
    employee.taskNumbers = recalculateTaskNumbers(employee.tasks);

    await employee.save();

    // Return the updated employee or just the new task
    res.status(201).json(employee.tasks[employee.tasks.length - 1]); // Return the newly created task

  } catch (err) {
    console.error(err.message);
     if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Update a task status (e.g., accept, complete, fail)
// @route   PUT /api/employees/:employeeId/tasks/:taskId
const updateTask = async (req, res) => {
  const { employeeId, taskId } = req.params;
  const { status } = req.body; // Expecting status: 'active', 'completed', 'failed'

  if (!status || !['active', 'completed', 'failed'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid or missing status' });
  }

  try {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    // Find the task within the employee's tasks array
    const task = employee.tasks.id(taskId);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Update task status based on the input
    task.newTask = false; // No longer new once updated
    task.active = status === 'active';
    task.completed = status === 'completed';
    task.failed = status === 'failed';

    // Recalculate task numbers
    employee.taskNumbers = recalculateTaskNumbers(employee.tasks);

    await employee.save();

    res.json(task); // Return the updated task

  } catch (err) {
    console.error(err.message);
     if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Employee or Task not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Add deleteTask controller if needed

module.exports = {
  createTask,
  updateTask,
};