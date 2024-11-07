const UserPaymentMethod = require('../models/userPaymentMethod');

const insertUserPaymentMethod = async (req, res) => {
    const { idUser, idPaymentMethod } = req.body;
    try {
        if (!idUser || !idPaymentMethod) {
            return res.status(400).json({ error: 'User ID and Payment Method ID are required' });
        }

        const insertedId = await UserPaymentMethod.insertUserPaymentMethod(idUser, idPaymentMethod);
        res.status(201).json({ message: 'User Payment Method relationship created', insertedId });
    } catch (error) {
        console.error('Error inserting User Payment Method relationship:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllUserPaymentMethods = async (req, res) => {
    try {
        const userPaymentMethods = await UserPaymentMethod.getAllUserPaymentMethods();
        res.status(200).json(userPaymentMethods);
    } catch (error) {
        console.error('Error fetching User Payment Method relationships:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserPaymentMethodByUser = async (req, res) => {
    const { idUser } = req.params;
    try {
        const userPaymentMethods = await UserPaymentMethod.getUserPaymentMethodByUser(idUser);
        if (!userPaymentMethods.length) {
            return res.status(404).json({ error: 'No Payment Methods found for this user' });
        }
        res.status(200).json(userPaymentMethods);
    } catch (error) {
        console.error('Error fetching User Payment Method relationships by user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUserPaymentMethod = async (req, res) => {
    const { id } = req.params;
    try {
        await UserPaymentMethod.deleteUserPaymentMethod(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting User Payment Method relationship:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    insertUserPaymentMethod,
    getAllUserPaymentMethods,
    getUserPaymentMethodByUser,
    deleteUserPaymentMethod
};
