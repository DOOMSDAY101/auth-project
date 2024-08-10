const express = require("express");
const { getAdminProfile, updateAdminProfile } = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const { body } = require("express-validator");

const adminRouter = express.Router()

adminRouter.get('/me', authMiddleware, getAdminProfile);

adminRouter.put('/profile', authMiddleware, [
    body('username').optional().notEmpty().withMessage('Username cannot be empty'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('date_of_birth').optional().isISO8601().withMessage('Invalid date format'),
    body('permanent_address').optional().notEmpty().withMessage('Address cannot be empty'),
    body('present_address').optional().notEmpty().withMessage('Address cannot be empty'),
    body('city').optional().notEmpty().withMessage('City cannot be empty'),
    body('postal_code').optional().notEmpty().withMessage('Postal code cannot be empty'),
    body('country').optional().notEmpty().withMessage('Country cannot be empty'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], updateAdminProfile)

module.exports = adminRouter;