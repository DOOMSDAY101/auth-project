const express = require("express");
const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");

const authRouter = express.Router();

authRouter.post('/register', [
    body('username')
        .notEmpty().withMessage('Username is required').bail(),
    body('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], register);

authRouter.post('/login', [
    body('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], login)

module.exports = authRouter