const PaymentMethod = require('../models/paymentMethod');

const insertPaymentMethod = async (req, res) => {
    const { method } = req.body;

    try {
        if (!method) {
            return res.status(400).json({ error: 'Method is required' });
        }

        const paymentMethodId = await PaymentMethod.insertPaymentMethod(method, req.userId);

        res.status(201).json({
            message: 'Payment method created and associated with user',
            paymentMethodId
        });
    } catch (error) {
        console.error('Error inserting payment method:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.getAllPaymentMethodsByUser(req.userId);

        res.status(200).json(paymentMethods);
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPaymentMethodsByName = async (req, res) => {
    const { method } = req.params;

    try {
        const paymentMethods = await PaymentMethod.getPaymentMethodsByNameAndUser(method, req.userId);

        if (!paymentMethods || paymentMethods.length === 0) {
            return res.status(404).json({ error: 'Payment method not found for this user' });
        }

        res.status(200).json(paymentMethod);
    } catch (error) {
        console.error('Error fetching payment method:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePaymentMethod = async (req, res) => {
    const { id_payment_method } = req.params;

    try {
        await PaymentMethod.deletePaymentMethod(id_payment_method, req.userId);

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting payment method:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const editPaymentMethod = async (req, res) => {
    const { id_payment_method } = req.params;
    const { method } = req.body;

    try {
        const updatedPaymentMethod = await PaymentMethod.editPaymentMethod(id_payment_method, method, req.userId);

        if (!updatedPaymentMethod) {
            return res.status(404).json({ error: 'Payment method not found for this user' });
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
    getPaymentMethodsByName,
    deletePaymentMethod,
    editPaymentMethod
};