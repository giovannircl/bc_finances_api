const PaymentMethod = require('../models/paymentMethod');
const UserExpense = require('../models/userExpense');

const insertUserExpense = async (req, res) => {
    const { id_user, id_user_payment_method, id_category, expense_amount, expense_desc } = req.body;

    try {
        if (!id_user || !id_user_payment_method || !id_category || !expense_amount) {
            return res.status(400).json({ error: 'This fields are required: id_user, id_payment_method, id_category and expense_amount' });
        }
        const paymentMethods = await PaymentMethod.getAllPaymentMethodsByUser(id_user);
        const paymentMethodExists = paymentMethods.some(method => method.id_payment_method === Number(id_user_payment_method));
        
        if (!paymentMethodExists) {
            return res.status(404).json({ error: 'Payment method not found for this user' });
        }

        const userExpenseId = await UserExpense.insertUserExpense(id_user, id_user_payment_method, id_category, expense_amount, expense_desc);
        res.status(201).json({ message: 'User expense created successfully', userExpenseId });
    } catch (error) {
        console.error('Error inserting user expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserExpenses = async (req, res) => {
    try {
        const userExpenses = await UserExpense.getUserExpenses(req.userId);
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
        res.status(200).json({ message: 'User expense updated successfully', updatedUserExpense });
    } catch (error) {
        console.error('Error editing user expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getLastFiveUserExpenses = async (req, res) => {
    try {
        const lastFiveExpenses = await UserExpense.getLastFiveUserExpenses(req.userId);
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
    getUserExpenses,
    deleteUserExpense,
    editUserExpense,
    getLastFiveUserExpenses
};