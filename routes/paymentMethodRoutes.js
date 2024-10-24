const express = require('express');
const {
    insertPaymentMethod,
    getAllPaymentMethods,
    getPaymentMethodByName,
    deletePaymentMethod,
    editPaymentMethod
} = require('../controllers/paymentMethodController');

const router = express.Router();

router.post('/payment-methods', insertPaymentMethod);
router.get('/payment-methods', getAllPaymentMethods);
router.get('/payment-methods/:method', getPaymentMethodByName);
router.delete('/payment-methods/:id', deletePaymentMethod);
router.put('/payment-methods/:id', editPaymentMethod);

module.exports = router;
