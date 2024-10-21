const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) {
    return console.error('Error connecting to the database:', err.stack);
  }
  console.log('Database connection successful!');
});

module.exports = pool;