const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const crypto = require('crypto');
require('dotenv').config();

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are mandatory' });
    }

    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use!' });
    } 

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.createUser(firstName, lastName, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully!', userId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Wrong password!' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login error' });
  }
};

const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findUserByEmail(email); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateResetToken();
    await User.updateResetToken(user.id_user, resetToken); 

    res.status(200).json({ message: 'Reset password request received', resetToken });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ error: 'Error processing forgot password' });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findUserByResetToken(token);

    if (!user) {
      return res.status(400).json({ error: 'Invalid reset token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(user.id_user, hashedPassword);
    await User.clearResetToken(user.id_user); 

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error in reset password:', error);
    res.status(500).json({ error: 'Error processing reset password' });
  }
};


module.exports = { register, login, forgotPassword, resetPassword };