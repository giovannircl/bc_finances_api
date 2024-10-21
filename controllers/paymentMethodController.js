const PaymentMethod = require('../models/paymentMethod');

const insertPaymentMethod = async (req, res) => {
    const { name, description } = req.body;
    try {
        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        const paymentMethodId = await PaymentMethod.insertPaymentMethod(name, description);
        res.status(201).json({ message: 'Payment method created', paymentMethodId });
    } catch (error) {
        console.error('Error inserting payment method:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.getAllPaymentMethods();
        res.status(200).json(paymentMethods);
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPaymentMethodByName = async (req, res) => {
    const { name } = req.params;
    try {
        const paymentMethod = await PaymentMethod.getPaymentMethodByName(name);
        if (!paymentMethod) {
            return res.status(404).json({ error: 'Payment method not found' });
        }
        res.status(200).json(paymentMethod);
    } catch (error) {
        console.error('Error fetching payment method:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePaymentMethod = async (req, res) => {
    const { id } = req.params;
    try {
        await PaymentMethod.deletePaymentMethod(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting payment method:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const editPaymentMethod = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedPaymentMethod = await PaymentMethod.editPaymentMethod(id, name, description);
        if (!updatedPaymentMethod) {
            return res.status(404).json({ error: 'Payment method not found' });
        }
        res.status(200).json(updatedPaymentMethod);
    } catch (error) {
        console.error('Error editing payment method:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    insertPaymentMethod,
    getAllPaymentMethods,
    getPaymentMethodByName,
    deletePaymentMethod,
    editPaymentMethod
};
