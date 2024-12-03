const PaymentMethod = require('../models/paymentMethod');
const UserExpense = require('../models/userExpense');
const Category = require('../models/category');

const insertUserExpense = async (req, res) => {
    const { id_user_payment_method, id_category, expense_amount, expense_desc } = req.body;

    try {
        if (!id_user_payment_method || !id_category || !expense_amount) {
            return res.status(400).json({ error: 'This fields are required: id_user_payment_method, id_category and expense_amount' });
        }
        const paymentMethods = await PaymentMethod.getAllPaymentMethodsByUser(req.userId);
        const paymentMethodExists = paymentMethods.some(method => method.id_user_payment_method === Number(id_user_payment_method));
        
        if (!paymentMethodExists) {
            return res.status(404).json({ error: 'Payment method not found for this user' });
        }

        const isValidCategory = await Category.isValidCategory(id_category);
        if (!isValidCategory) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }

        const userExpenseId = await UserExpense.insertUserExpense(id_user_payment_method, id_category, expense_amount, expense_desc);
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
    const { id_user_payment_method, id_category, expense_amount, expense_desc } = req.body;

    try {
        const isValid = await UserExpense.isValidUserPaymentMethod(req.userId, id_user_payment_method);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid payment method for this user' });
        }

        const isValidCategory = await Category.isValidCategory(id_category);
        if (!isValidCategory) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }

        const updatedUserExpense = await UserExpense.editUserExpense(id, id_user_payment_method, id_category, expense_amount, expense_desc);

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

const getUserExpensesByCategory = async (req, res) => {
    const { year, month } = req.query;

    try {
        if (!year || !month) {
            return res.status(400).json({ error: 'Year and month are required' });
        }

        const startDate = new Date(`${year}-${month.padStart(2, '0')}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        const expenses = await UserExpense.getExpensesByCategory(req.userId, startDate, endDate);

        if (expenses.length === 0) {
            return res.status(404).json({ error: 'No expenses found for this period' });
        }

        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching user expenses by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    insertUserExpense,
    getUserExpenses,
    deleteUserExpense,
    editUserExpense,
    getLastFiveUserExpenses,
    getUserExpensesByCategory
};
