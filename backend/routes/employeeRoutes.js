const express = require('express');
const { getEmployees, getEmployeeById } = require('../controllers/employeeController');
// Add auth middleware import here later

const router = express.Router();

// GET /api/employees - Get all employees (Admin)
// Add auth middleware here later: router.get('/', authMiddleware(['admin']), getEmployees);
router.get('/', getEmployees);

// GET /api/employees/:id - Get employee by ID (Admin/Employee)
// Add auth middleware here later: router.get('/:id', authMiddleware(['admin', 'employee']), getEmployeeById);
router.get('/:id', getEmployeeById);

// Add other employee routes (POST, PUT, DELETE) if needed

module.exports = router;
