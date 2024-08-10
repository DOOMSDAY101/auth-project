const { AppDataSource } = require("../../ormconfig");
const Admin = require("../models/adminEntity");
const { validationResult } = require("express-validator");

const getAdminProfile = async (req, res) => {
    const AdminEmail = req.body.admin.email;
    try {
        const adminRepo = AppDataSource.getRepository(Admin);
        const profile = await adminRepo.findOne({ where: { email: AdminEmail } });

        if (profile) {
            delete profile.password;
            res.status(200).json(profile);
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve profile' });
    }
}

const updateAdminProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { admin: { id } } = req.body;
    const updateData = { ...req.body }

    delete updateData.admin;

    if (updateData.password) {
        const hashedPassword = await bcrypt.hash(updateData.password.toString(), 10);
        updateData.password = hashedPassword;
    }

    try {
        const adminRepo = AppDataSource.getRepository(Admin);
        await adminRepo.update(id, updateData);
        const updatedProfile = await adminRepo.findOne({ where: { id } });

        if (updatedProfile) {
            const { password, ...profileWithoutPassword } = updatedProfile;
            res.status(200).json(profileWithoutPassword);
        } else {
            res.status(404).json({ error: 'Profile update failed' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to update profile' });
    }
}
module.exports = {
    getAdminProfile,
    updateAdminProfile,
}