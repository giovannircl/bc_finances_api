const express = require('express');
const {
    insertUserExpense,
    getUserExpenses,
    deleteUserExpense,
    editUserExpense,
    getLastFiveUserExpenses
} = require('../controllers/userExpenseController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/user-expense', auth, insertUserExpense);
router.get('/user-expenses', auth, getUserExpenses);
router.delete('/user-expense/:id', auth, deleteUserExpense);
router.put('/user-expense/:id', auth, editUserExpense);
router.get('/user-expense/last-five', auth, getLastFiveUserExpenses);

module.exports = router;