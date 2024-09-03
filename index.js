const express = require('express');
const path = require('path'); // Import path module
const Jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const { adminRouter } = require('./Routes/AdminRoute');
const { EmployeeRouter } = require('./Routes/EmployeeRoute');

const app = express();

app.use(express.json());
app.use(cookieParser());

// Route handlers
app.use('/auth', adminRouter);
app.use('/employee', EmployeeRouter);

// JWT verification middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
            if (err) return res.json({ Status: false, Error: "Wrong Token" });
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        });
    } else {
        return res.json({ Status: false, Error: "Not authenticated" });
    }
};

// Route that requires authentication
app.get('/verify', verifyUser, (req, res) => {
    return res.json({ Status: true, role: req.role, id: req.id });
});

// Simple route to check server status
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start the server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
