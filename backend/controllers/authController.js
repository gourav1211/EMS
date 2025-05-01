const Employee = require('../models/Employee');
const Admin = require('../models/Admin');

// In a real app, use bcrypt to compare hashed passwords
const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user = null;
    if (role === 'employee') {
      user = await Employee.findOne({ email });
    } else if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else {
      return res.status(400).json({ msg: 'Invalid role specified' });
    }

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // !! IMPORTANT: Plain text password comparison is insecure. Use bcrypt in production. !!
    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Don't send password back
    const userResponse = { ...user.toObject() };
    delete userResponse.password;


    res.json({ user: userResponse, role });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add other controllers as needed (e.g., getEmployeeData, updateTask, etc.)

module.exports = {
  login,
};