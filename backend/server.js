const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes'); // Import employee routes
const taskRoutes = require('./routes/taskRoutes'); // Import task routes

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json({ extended: false })); // Body parser

// Define Routes
app.get('/', (req, res) => res.send('API Running')); // Simple test route
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes); // Use employee routes
// Use task routes nested under employees
app.use('/api/employees/:employeeId/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));