const mongoose = require('mongoose');
const connectDB = require('./db');
const Employee = require('./models/Employee');
const Admin = require('./models/Admin');
require('dotenv').config(); // Ensure .env is loaded

// --- Copy the data from LocalStorage.jsx here ---
const employeesData = [
  {
    id: 1,
    firstName: "Aarav",
    email: "employee1@example.com",
    password: "123", // Remember to hash passwords in a real app
    tasks: [
      { active: true, newTask: false, completed: false, failed: false, title: "Submit Weekly Report", description: "Complete and submit the weekly project report.", date: "2024-12-20", category: "Reporting" },
      { active: false, newTask: true, completed: false, failed: false, title: "Prepare Meeting Agenda", description: "Draft and share the agenda for next week's meeting.", date: "2024-12-21", category: "Planning" },
    ],
    taskNumbers: { active: 1, newTask: 1, completed: 0, failed: 0 },
  },
  {
    id: 2,
    firstName: "Ananya",
    email: "employee2@example.com",
    password: "123",
    tasks: [
      { active: false, newTask: false, completed: true, failed: false, title: "Prepare Presentation", description: "Create slides for the upcoming team meeting.", date: "2024-12-18", category: "Presentation" },
      { active: false, newTask: true, completed: false, failed: false, title: "Coordinate with Vendors", description: "Communicate with vendors regarding the project requirements.", date: "2024-12-22", category: "Coordination" },
    ],
    taskNumbers: { active: 1, newTask: 1, completed: 1, failed: 0 }, // Note: Original data had active: 1, but only 1 non-new task. Assuming newTask counts towards active if not completed/failed. Adjust logic if needed.
  },
   {
    id: 3,
    firstName: "Vihaan",
    email: "employee3@example.com",
    password: "123",
    tasks: [
      { active: true, newTask: false, completed: false, failed: false, title: "Update Client Database", description: "Ensure the client contact information is up-to-date.", date: "2024-12-22", category: "Data Management" },
      { active: false, newTask: true, completed: false, failed: false, title: "Organize Documentation", description: "Categorize and store project-related documents.", date: "2024-12-23", category: "Organization" },
    ],
    taskNumbers: { active: 1, newTask: 1, completed: 0, failed: 0 }, // Adjusted active/newTask based on tasks array
  },
  {
    id: 4,
    firstName: "Ishita",
    email: "employee4@example.com",
    password: "123",
    tasks: [
      { active: false, newTask: false, completed: false, failed: true, title: "Fix Backend Bugs", description: "Resolve reported issues in the backend code.", date: "2024-12-19", category: "Development" },
      { active: false, newTask: true, completed: false, failed: false, title: "Code Review", description: "Review the recent pull requests submitted by team members.", date: "2024-12-21", category: "Quality Assurance" },
    ],
    taskNumbers: { active: 0, newTask: 1, completed: 0, failed: 1 }, // Adjusted active/newTask based on tasks array
  },
  {
    id: 5,
    firstName: "Kabir",
    email: "employee5@example.com",
    password: "123",
    tasks: [
       { active: false, newTask: true, completed: false, failed: false, title: "Organize Team Outing", description: "Plan the logistics for the team outing.", date: "2024-12-25", category: "Team Building" },
       { active: true, newTask: false, completed: false, failed: false, title: "Inventory Check", description: "Conduct a detailed check of office inventory.", date: "2024-12-24", category: "Logistics" },
    ],
    taskNumbers: { active: 1, newTask: 1, completed: 0, failed: 0 },
  },
];

const adminData = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123", // Remember to hash passwords in a real app
  },
];
// --- End of data ---


const seedDB = async () => {
  await connectDB(); // Ensure DB is connected

  try {
    // Clear existing data
    await Employee.deleteMany({});
    await Admin.deleteMany({});
    console.log('Existing data cleared...');

    // Insert new data
    await Employee.insertMany(employeesData);
    await Admin.insertMany(adminData);

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(`Error seeding database: ${err.message}`); // Added closing backtick
    process.exit(1);
  }
};

seedDB();