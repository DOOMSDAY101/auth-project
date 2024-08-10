const request = require('supertest');
const { app, AppDataSource } = require('../../index');
const { generateToken } = require("../utils/jwtUtil");
const bcrypt = require('bcrypt');
const Admin = require('../models/adminEntity');


describe('Admin Controller', () => {
    let token;

    beforeAll(async () => {
        // Initialize the database connection
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const adminRepo = AppDataSource.getRepository(Admin);


        const admin = adminRepo.create({
            username: 'admin',
            email: 'admin2@example.com',
            password: await bcrypt.hash('password123', 10)
        });
        await adminRepo.save(admin);

        // Generate JWT token for the test admin
        token = generateToken({ id: admin.id, email: admin.email });
    });

    afterAll(async () => {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    });

    describe('GET /me', () => {
        it('should retrieve the admin profile', async () => {
            const res = await request(app)
                .get('/me')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('username', 'admin');
            expect(res.body).toHaveProperty('email', 'admin2@example.com');
        });

        it('should return 404 if profile not found', async () => {
            const invalidToken = generateToken({ id: 999, email: 'nonexistent@example.com' });
            const res = await request(app)
                .get('/me')
                .set('Authorization', `Bearer ${invalidToken}`);
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('error', 'Profile not found');
        });
    });

    describe('PUT /profile', () => {
        it('should update the admin profile', async () => {
            const res = await request(app)
                .put('/profile')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    city: 'New City',
                    country: 'New Country'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('city', 'New City');
            expect(res.body).toHaveProperty('country', 'New Country');
        });

        it('should return 404 if profile update fails', async () => {
            const res = await request(app)
                .put('/profile')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    id: 999,
                    city: 'Nonexistent City'
                });
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('error', 'Profile update failed');
        });
    });
});
