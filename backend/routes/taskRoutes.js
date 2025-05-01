const express = require('express');
const { createTask, updateTask } = require('../controllers/taskController');
// Add auth middleware import here later

const router = express.Router({ mergeParams: true }); // mergeParams allows access to :employeeId from parent router

// POST /api/employees/:employeeId/tasks - Create a task for an employee (Admin)
// Add auth middleware here later: router.post('/', authMiddleware(['admin']), createTask);
router.post('/', createTask);

// PUT /api/employees/:employeeId/tasks/:taskId - Update task status (Admin/Employee)
// Add auth middleware here later: router.put('/:taskId', authMiddleware(['admin', 'employee']), updateTask);
router.put('/:taskId', updateTask);


// Add other task routes (DELETE) if needed

module.exports = router;
