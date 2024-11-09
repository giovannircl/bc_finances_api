const PaymentMethod = require('../models/paymentMethod');

const insertPaymentMethod = async (req, res) => {
    const { method } = req.body;
    try {
        if (!method) {
            return res.status(400).json({ error: 'Method and details are required' });
        }

        const existingMethod = await PaymentMethod.getPaymentMethodByNameAnddetails(method);
        if (existingMethod) {
            return res.status(400).json({ error: 'This payment method already exists with the same name and details.' });
        }

        const paymentMethodId = await PaymentMethod.insertPaymentMethod(method);
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
    const { method } = req.params;
    try {
        const paymentMethod = await PaymentMethod.getPaymentMethodByName(method);
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
    const { method, details } = req.body;
    try {
        const updatedPaymentMethod = await PaymentMethod.editPaymentMethod(id, method, details);
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
