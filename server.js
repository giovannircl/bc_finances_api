const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const pool = require('./config/db');

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});