const pool = require('../config/db');

const PaymentMethod = {
    insertPaymentMethod: async (name, details) => {
        const result = await pool.query(
            'INSERT INTO payment_method (method, details) VALUES ($1, $2) RETURNING id_payment_method',
            [name, details]
        );
        return result.rows[0].id;
    },

    getAllPaymentMethods: async () => {
        const result = await pool.query('SELECT * FROM payment_method');
        return result.rows;
    },

    getPaymentMethodByName: async (name) => {
        const result = await pool.query('SELECT * FROM payment_method WHERE method = $1', [name]);
        return result.rows;
    },

    getPaymentMethodByNameAnddetails: async (method, details) => {
        const result = await pool.query(
            'SELECT * FROM payment_method WHERE method = $1 AND details = $2',
            [method, details]
        );
        return result.rows[0];
    },

    deletePaymentMethod: async (id) => {
        await pool.query('DELETE FROM payment_method WHERE id_payment_method = $1', [id]);
    },

    editPaymentMethod: async (id, name, details) => {
        const result = await pool.query(
            'UPDATE payment_method SET method = $1, details = $2 WHERE id_payment_method = $3 RETURNING *',
            [name, details, id]
        );
        return result.rows[0];
    }
};

module.exports = PaymentMethod;
