const express = require('express');
const {
    insertUserExpense,
    getUserExpenses,
    deleteUserExpense,
    editUserExpense,
    getLastFiveUserExpenses,
    getUserExpensesByCategory
} = require('../controllers/userExpenseController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/user-expense', auth, insertUserExpense);
router.get('/user-expenses', auth, getUserExpenses);
router.delete('/user-expense/:id', auth, deleteUserExpense);
router.put('/user-expense/:id', auth, editUserExpense);
router.get('/user-expense/last-five', auth, getLastFiveUserExpenses);
router.get('/user-expense/by-category', auth, getUserExpensesByCategory);

module.exports = router;
