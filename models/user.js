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

  updateResetToken: async (userId, resetToken) => {
    try {
      await pool.query(
        'UPDATE app_user SET reset_token = $1 WHERE id_user = $2',
        [resetToken, userId]
      );
    } catch (error) {
      console.error('Error updating reset token:', error);
      throw error;
    }
  },

  findUserByResetToken: async (token) => {
    const result = await pool.query(
      'SELECT * FROM app_user WHERE email = $1',
      [token]
    );
    return result.rows[0];
  },

  updatePassword: async (userId, hashedPassword) => {
    await pool.query(
      'UPDATE app_user SET password = $1 WHERE id_user = $2',
      [hashedPassword, userId]
    );
  },
  updatePasswordByEmail: async (email, hashedPassword) => {
    await pool.query(
      'UPDATE app_user SET password = $1 WHERE email = $2',
      [hashedPassword, email]
    );
  },
  clearResetToken: async (userId) => {
    await pool.query(
      'UPDATE app_user SET reset_token = NULL WHERE id_user = $1',
      [userId]
    );
  },
};

module.exports = User;