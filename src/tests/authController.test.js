const request = require('supertest');
const { AppDataSource } = require("../../index");
const app = require("../../index");

beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
});

afterAll(async () => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
});


describe('Auth Controller', () => {

    describe('POST /register', () => {
        it('should register a new admin', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    username: 'admin',
                    email: `admin_${Date.now()}@example.com`,
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('message', 'Account created successfully');
        });

        it('should not allow duplicate emails', async () => {
            const email = `duplicate_${Date.now()}@example.com`;
            await request(app)
                .post('/register')
                .send({
                    username: 'admin',
                    email: email,
                    password: 'password123'
                });

            const res = await request(app)
                .post('/register')
                .send({
                    username: 'admin2',
                    email: email,
                    password: 'password456'
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error', 'Email is already in use');
        });
    });

    describe('POST /login', () => {
        it('should login with correct credentials', async () => {
            const email = `login_${Date.now()}@example.com`;

            await request(app)
                .post('/register')
                .send({
                    username: 'admin',
                    email: email,
                    password: 'password123'
                });

            const res = await request(app)
                .post('/login')
                .send({
                    email: email,
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Logged in successfully');
            expect(res.body).toHaveProperty('token');
        });

        it('should return 401 for invalid credentials', async () => {
            const email = `login_fail_${Date.now()}@example.com`;

            await request(app)
                .post('/register')
                .send({
                    username: 'admin',
                    email: email,
                    password: 'password123'
                });

            const res = await request(app)
                .post('/login')
                .send({
                    email: email,
                    password: 'wrongpassword'
                });
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('error', 'Invalid credentials');
        });
    });
});