const { AppDataSource } = require("../../ormconfig")
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtil");
const Admin = require("../models/adminEntity");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { username, email, password } = req.body;

    try {
        const adminRepo = AppDataSource.getRepository(Admin);
        const existingAdmin = await adminRepo.findOne({ where: { email } });

        if (existingAdmin) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password.toString(), 10);
        const admin = adminRepo.create({ username, email, password: hashedPassword });
        adminRepo.save(admin);
        res.status(201).json({ message: 'Account created successfully' })
    } catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
}


const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        const adminRepo = AppDataSource.getRepository(Admin);
        const adminUser = await adminRepo.findOne({ where: { email } });

        if (adminUser && await bcrypt.compare(password.toString(), adminUser.password)) {
            const token = generateToken({ id: adminUser.id, email: adminUser.email });
            res.status(200).json({ status: 200, message: "Logged in successfully", token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}


module.exports = {
    register,
    login
}