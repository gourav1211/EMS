const Employee = require('../models/Employee');

// @desc    Get all employees (Admin only - add auth middleware later)
// @route   GET /api/employees
const getEmployees = async (req, res) => {
  try {
    // Exclude passwords from the result
    const employees = await Employee.find().select('-password');
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single employee by ID (Employee/Admin - add auth middleware later)
// @route   GET /api/employees/:id
const getEmployeeById = async (req, res) => {
  try {
    // Use the MongoDB _id for lookup
    const employee = await Employee.findById(req.params.id).select('-password');

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    res.json(employee);
  } catch (err) {
    console.error(err.message);
    // Handle potential CastError if ID format is invalid
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Add more employee-related controllers if needed (e.g., createEmployee, updateEmployee)

module.exports = {
  getEmployees,
  getEmployeeById,
};