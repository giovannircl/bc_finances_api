const pool = require('../config/db');

const PaymentMethod = {
    insertPaymentMethod: async (method, id_user) => {
        const result = await pool.query(
            'INSERT INTO payment_method (method) VALUES ($1) RETURNING id_payment_method',
            [method]
        );

        // More accurate name.
        const id_user_payment_method = result.rows[0].id_payment_method;

        await pool.query(
            'INSERT INTO user_payment_method (id_user, id_user_payment_method) VALUES ($1, $2)',
            [id_user, id_user_payment_method]
        );

        return id_user_payment_method;
    },

    getAllPaymentMethodsByUser: async (id_user) => {
        const result = await pool.query(
            `SELECT pm.id_payment_method, pm.method
             FROM payment_method pm
             JOIN user_payment_method upm ON pm.id_payment_method = upm.id_user_payment_method
             WHERE upm.id_user = $1`,
            [id_user]
        );
        return result.rows;
    },

    getPaymentMethodsByNameAndUser: async (method, id_user) => {
        console.log(id_user, method);
        const result = await pool.query(
            `SELECT pm.id_payment_method, pm.method
             FROM payment_method pm
             JOIN user_payment_method upm ON pm.id_payment_method = upm.id_user_payment_method
             WHERE upper(pm.method) LIKE upper($1) AND upm.id_user = $2`,
            [`%${method}%`, id_user]
        );
        return result.rows;
    },

    deletePaymentMethod: async (id_payment_method, id_user) => {
        await pool.query(
            'DELETE FROM user_payment_method WHERE id_payment_method = $1 AND id_user = $2',
            [id_payment_method, id_user]
        );

        const result = await pool.query(
            'SELECT COUNT(*) FROM user_payment_method WHERE id_payment_method = $1',
            [id_payment_method]
        );

        if (parseInt(result.rows[0].count, 10) === 0) {
            await pool.query('DELETE FROM payment_method WHERE id_payment_method = $1', [id_payment_method]);
        }
    },

    editPaymentMethod: async (id_payment_method, method, id_user) => {
        const result = await pool.query(
            `UPDATE payment_method pm
             SET method = $1
             FROM user_payment_method upm
             WHERE pm.id_payment_method = upm.id_payment_method
             AND pm.id_payment_method = $2
             AND upm.id_user = $3
             RETURNING pm.*`,
            [method, id_payment_method, id_user]
        );
        return result.rows[0];
    }
};

module.exports = PaymentMethod;