const pool = require('../config/db');

const User = {
  findUserByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM app_user WHERE email = $1', [email]);
    return result.rows[0];
  },

  createUser: async (firstName, lastName, email, password) => {
    const result = await pool.query(
      'INSERT INTO app_user (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id_user',
      [firstName, lastName, email, password]
    );
    return result.rows[0].id_user; 
  },
};

module.exports = User;