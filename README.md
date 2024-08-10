## Task: Implement Authentication and Admin Profile Endpoints

### Objective:

Develop a basic authentication system for the admin panel, a `/me` endpoint for retrieving the admin profile, and an endpoint for updating the admin profile.

### Technology Stack:

- Backend Framework: Spring Boot (Java) / Express.js (Node.js) / Flask (Python)
- Database: MySQL / PostgreSQL
- Authentication: JWT (JSON Web Token)

### Day 1: Setup and Authentication

1.  #### Project Setup
    - Initialize the project with the chosen framework.
    - Set up the database and configure the connection.
2.  #### Authentication System
    - #### Registration Endpoint:
      Implement an endpoint for admin registration. (e.g., `/register`)
    - Inputs: `username`, `email`, `password`
    - Hash the password before storing it in the database(BCRYPT).
    - #### Login Endpoint:
      Implement an endpoint for admin login. (e.g., `/login`)
    - Inputs: email, password
    - Validate credentials and generate a JWT token upon successful authentication.
3.  #### Middleware for Authentication
    - Implement middleware to protect routes and validate the JWT token.

### Day 2: Admin Profile Retrieval

1. ### Profile Retrieval Endpoint
   - Implement the `/me` endpoint to retrieve the authenticated admin's profile.
     - Endpoint: `/me`
     - Method: `GET`
     - Response: `username`, `email`, `date_of_birth`, `permanent_address`, `present_address`, `city`, `postal_code`, `country`
   - Ensure the endpoint is protected by the authentication middleware.
2. ### Testing

- Test the registration, login, and `/me` endpoints to ensure they are working correctly.
- Write unit tests for the authentication logic and middleware.

### Day 3: Admin Profile Update

1. ### Profile Update Endpoint

- Implement an endpoint to update the admin profile.
  - Endpoint: `/profile`
  - Ensure the endpoint is protected by the authentication middleware.

2. ### Validation and Security

- Add input validation for profile update fields.
- Ensure secure handling of sensitive data (e.g., password changes).

3. ### Documentation and Cleanup

- Document all endpoints with request and response formats.
- Clean up the codebase and ensure proper code comments and documentation.

### Deliverables

1. <b>Codebase</b>: The complete source code for the backend with the implemented features.
2. <b>Documentation</b>: Endpoint documentation and instructions on how to set up and run the project.
3. <b>Tests</b>: Unit tests for the implemented features(optional)

### Example Endpoints

Registration Endpoint<br>
http<br>
`POST /register`

```json
{
  "username": "admin",
  "email": "admin@bazzsolutions.com",
  "password": "bazzsolution001"
}
```

### Login Endpoint

http<br>
`POST /login`

```json
{
  "email": "admin@bazzsolutions.com",
  "password": "securepassword"
}
```

### Profile Retrieval Endpoint

http<br>
`GET /me`<br>
Authorization: Bearer <JWT_TOKEN>

### Profile Update Endpoint

http<br>
`PUT /profile`<br>

```json
{
    "username": "New username",
    "email": "New email",
    ...
}
```
