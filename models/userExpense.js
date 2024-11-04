const pool = require('../config/db');

const UserExpense = {
    insertUserExpense: async (id_user, id_payment_method, id_category, expense_amount, expense_desc) => {
        const result = await pool.query(
            `INSERT INTO user_expense (id_user, id_payment_method, id_category, expense_amount, expense_desc)
             VALUES ($1, $2, $3, $4, $5) RETURNING id_user_expense`,
            [id_user, id_payment_method, id_category, expense_amount, expense_desc]
        );
        return result.rows[0].id_user_expense;
    },

    getAllUserExpenses: async () => {
        const result = await pool.query('SELECT * FROM user_expense');
        return result.rows;
    },

    getUserExpensesByUserId: async (userId) => {
        const result = await pool.query(
            'SELECT * FROM user_expense WHERE id_user = $1',
            [userId]
        );
        return result.rows;
    },

    deleteUserExpense: async (id_user_expense) => {
        await pool.query('DELETE FROM user_expense WHERE id_user_expense = $1', [id_user_expense]);
    },

    editUserExpense: async (id_user_expense, id_payment_method, id_category, expense_amount, expense_desc) => {
        const result = await pool.query(
            `UPDATE user_expense 
             SET id_payment_method = $1, id_category = $2, expense_amount = $3, expense_desc = $4 
             WHERE id_user_expense = $5 RETURNING *`,
            [id_payment_method, id_category, expense_amount, expense_desc, id_user_expense]
        );
        return result.rows[0];
    },

    getLastFiveUserExpenses: async (userId) => {
        const result = await pool.query(
            `SELECT * FROM user_expense WHERE id_user = $1 ORDER BY dt_purchase DESC LIMIT 5`,
            [userId]
        );
        return result.rows;
    }
};

module.exports = UserExpense;