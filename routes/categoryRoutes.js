const express = require('express');
const { getAllCategories } = require('../controllers/categoryController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/categories', auth, getAllCategories);

module.exports = router;