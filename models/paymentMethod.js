const pool = require('../config/db');

const PaymentMethod = {
    insertPaymentMethod: async (name, description) => {
        const result = await pool.query(
            'INSERT INTO payment_method (name, description) VALUES ($1, $2) RETURNING id',
            [name, description]
        );
        return result.rows[0].id;
    },

    getAllPaymentMethods: async () => {
        const result = await pool.query('SELECT * FROM payment_method');
        return result.rows;
    },

    getPaymentMethodByName: async (name) => {
        const result = await pool.query('SELECT * FROM payment_method WHERE name = $1', [name]);
        return result.rows[0];
    },

    deletePaymentMethod: async (id) => {
        await pool.query('DELETE FROM payment_method WHERE id = $1', [id]);
    },

    editPaymentMethod: async (id, name, description) => {
        const result = await pool.query(
            'UPDATE payment_method SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            [name, description, id]
        );
        return result.rows[0];
    }
};

module.exports = PaymentMethod;
