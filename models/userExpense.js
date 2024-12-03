const pool = require('../config/db');

const UserExpense = {
    insertUserExpense: async (id_user_payment_method, id_category, expense_amount, expense_desc) => {
        const result = await pool.query(
            `INSERT INTO user_expense (id_user_payment_method, id_category, expense_amount, expense_desc)
             VALUES ($1, $2, $3, $4) RETURNING id_user_expense`,
            [id_user_payment_method, id_category, expense_amount, expense_desc]
        );
        return result.rows[0].id_user_expense;
    },

    getUserExpenses: async (userId) => {
        const result = await pool.query(
            `SELECT ue.* 
             FROM user_expense ue
             INNER JOIN user_payment_method upm ON upm.id_user_payment_method = ue.id_user_payment_method
             WHERE upm.id_user = $1`,
            [userId]
        );
        return result.rows;
    },

    deleteUserExpense: async (id_user_expense) => {
        await pool.query('DELETE FROM user_expense WHERE id_user_expense = $1', [id_user_expense]);
    },

    isValidUserPaymentMethod: async (userId, id_user_payment_method) => {
        const result = await pool.query(
            `SELECT 1 FROM user_payment_method 
             WHERE id_user = $1 AND id_user_payment_method = $2`,
            [userId, id_user_payment_method]
        );
        return result.rowCount > 0;
    },

    editUserExpense: async (id_user_expense, id_user_payment_method, id_category, expense_amount, expense_desc) => {
        const result = await pool.query(
            `UPDATE user_expense 
             SET id_user_payment_method = $1, id_category = $2, expense_amount = $3, expense_desc = $4
             WHERE id_user_expense = $5 RETURNING *`,
            [id_user_payment_method, id_category, expense_amount, expense_desc, id_user_expense]
        );
        return result.rows[0];
    },

    getLastFiveUserExpenses: async (userId) => {
        const result = await pool.query(
            `SELECT ue.* 
             FROM user_expense ue
             JOIN user_payment_method upm ON upm.id_user_payment_method = ue.id_user_payment_method
             WHERE upm.id_user = $1
             ORDER BY ue.dt_purchase DESC 
             LIMIT 5`,
            [userId]
        );
        return result.rows;
    },

    getExpensesByCategory: async (userId, startDate, endDate) => {
        const result = await pool.query(
            `SELECT c.category_name AS category, SUM(ue.expense_amount) AS total_amount
             FROM user_expense ue
             JOIN user_payment_method upm ON upm.id_user_payment_method = ue.id_user_payment_method
             JOIN category c ON c.id_category = ue.id_category
             WHERE upm.id_user = $1 AND ue.dt_purchase BETWEEN $2 AND $3
             GROUP BY c.category_name
             ORDER BY total_amount DESC`,
            [userId, startDate, endDate]
        );
        return result.rows;
    }
};

module.exports = UserExpense;
