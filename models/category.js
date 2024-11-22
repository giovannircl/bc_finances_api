const pool = require('../config/db');

const Category = {
    isValidCategory: async (id_category) => {
        const result = await pool.query(
            'SELECT * FROM category WHERE id_category = $1',
            [id_category]
        );
        return result.rowCount > 0; 
    },

    getAllCategories: async () => {
        const result = await pool.query(
            'SELECT * FROM category ORDER BY category_name ASC'
        );
        return result.rows;
    }
};

module.exports = Category;