const express = require('express');
const {
    insertPaymentMethod,
    getAllPaymentMethods,
    getPaymentMethodByName,
    deletePaymentMethod,
    editPaymentMethod
} = require('../controllers/paymentMethodController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/payment-methods', auth, insertPaymentMethod);
router.get('/payment-methods', auth, getAllPaymentMethods);
router.get('/payment-methods/:method', auth, getPaymentMethodByName);
router.delete('/payment-methods/:id', auth, deletePaymentMethod);
router.put('/payment-methods/:id', auth, editPaymentMethod);

module.exports = router;
