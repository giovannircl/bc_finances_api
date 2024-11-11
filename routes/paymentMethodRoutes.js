const express = require('express');
const {
    insertPaymentMethod,
    getAllPaymentMethods,
    getPaymentMethodsByName,
    deletePaymentMethod,
    editPaymentMethod
} = require('../controllers/paymentMethodController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/payment-method', auth, insertPaymentMethod);
router.get('/payment-methods', auth, getAllPaymentMethods);
router.get('/payment-methods/:method', auth, getPaymentMethodsByName);
router.delete('/payment-method/:id_payment_method', auth, deletePaymentMethod);
router.put('/payment-method/:id_payment_method', auth, editPaymentMethod);

module.exports = router;
