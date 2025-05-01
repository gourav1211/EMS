// backend/testConnection.js
require('dotenv').config();
const mongoose = require('mongoose');
console.log('Seeding DB with connection string:', process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Connection error:', err));