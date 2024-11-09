const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({origin: true, credentials: true}));
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const paymentMethodRoutes = require('./routes/paymentMethodRoutes');
app.use('/api', paymentMethodRoutes);

const userExpenseRoutes = require('./routes/userExpenseRoutes');
app.use('/api', userExpenseRoutes);

const pool = require('./config/db');

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});