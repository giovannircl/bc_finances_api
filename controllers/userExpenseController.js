const UserExpense = require('../models/userExpense');

const insertUserExpense = async (req, res) => {
    const { id_user, id_payment_method, id_category, expense_amount, expense_desc } = req.body;

    try {
        if (!id_user || !id_payment_method || !id_category || !expense_amount || !expense_desc) {
            return res.status(400).json({ error: 'All fields are required: id_user, id_payment_method, id_category, expense_amount, and expense_desc' });
        }

        const userExpenseId = await UserExpense.insertUserExpense(id_user, id_payment_method, id_category, expense_amount, expense_desc);
        res.status(201).json({ message: 'User expense created', userExpenseId });
    } catch (error) {
        console.error('Error inserting user expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllUserExpenses = async (req, res) => {
    try {
        const userExpenses = await UserExpense.getAllUserExpenses();
        res.status(200).json(userExpenses);
    } catch (error) {
        console.error('Error fetching user expenses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserExpensesByUserId = async (req, res) => {
    const { userId } = req.params; 

    try {
        const userExpenses = await UserExpense.getUserExpensesByUserId(userId);
        if (userExpenses.length === 0) {
            return res.status(404).json({ error: 'No expenses found for this user' });
        }
        res.status(200).json(userExpenses);
    } catch (error) {
        console.error('Error fetching user expenses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUserExpense = async (req, res) => {
    const { id } = req.params;

    try {
        await UserExpense.deleteUserExpense(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const editUserExpense = async (req, res) => {
    const { id } = req.params;
    const { id_payment_method, id_category, expense_amount, expense_desc } = req.body;

    try {
        const updatedUserExpense = await UserExpense.editUserExpense(id, id_payment_method, id_category, expense_amount, expense_desc);
        if (!updatedUserExpense) {
            return res.status(404).json({ error: 'User expense not found' });
        }
        res.status(200).json(updatedUserExpense);
    } catch (error) {
        console.error('Error editing user expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getLastFiveUserExpenses = async (req, res) => {
    const { userId } = req.params;

    try {
        const lastFiveExpenses = await UserExpense.getLastFiveUserExpenses(userId);
        if (lastFiveExpenses.length === 0) {
            return res.status(404).json({ error: 'No expenses found for this user' });
        }
        res.status(200).json(lastFiveExpenses);
    } catch (error) {
        console.error('Error fetching last five user expenses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    insertUserExpense,
    getAllUserExpenses,
    getUserExpensesByUserId,
    deleteUserExpense,
    editUserExpense,
    getLastFiveUserExpenses
};