const express = require('express');
const {
    insertUserExpense,
    getAllUserExpenses,
    getUserExpensesByUserId,
    deleteUserExpense,
    editUserExpense,
    getLastFiveUserExpenses
} = require('../controllers/userExpenseController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/user-expense', auth, insertUserExpense);
router.get('/user-expense', auth, getAllUserExpenses);
router.get('/user-expense/:userId', auth, getUserExpensesByUserId);
router.delete('/user-expense/:id', auth, deleteUserExpense);
router.put('/user-expense/:id', auth, editUserExpense);
router.get('/user-expense/last-five/:userId', auth, getLastFiveUserExpenses);

module.exports = router;