const pool = require('../config/db');

const PaymentMethod = {
    insertPaymentMethod: async (name, description) => {
        const result = await pool.query(
            'INSERT INTO payment_method (method, description) VALUES ($1, $2) RETURNING id_payment_method',
            [name, description]
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

    getPaymentMethodByNameAndDescription: async (method, description) => {
        const result = await pool.query(
            'SELECT * FROM payment_method WHERE method = $1 AND description = $2',
            [method, description]
        );
        return result.rows[0];
    },

    deletePaymentMethod: async (id) => {
        await pool.query('DELETE FROM payment_method WHERE id_payment_method = $1', [id]);
    },

    editPaymentMethod: async (id, name, description) => {
        const result = await pool.query(
            'UPDATE payment_method SET method = $1, description = $2 WHERE id_payment_method = $3 RETURNING *',
            [name, description, id]
        );
        return result.rows[0];
    }
};

module.exports = PaymentMethod;
