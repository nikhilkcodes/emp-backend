const express = require('express');
const path = require('path'); // Import path module
const Jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import cors package
require('dotenv').config();
const { adminRouter } = require('./Routes/AdminRoute');
const { EmployeeRouter } = require('./Routes/EmployeeRoute');
const app = express();
const port = process.env.PORT;


const corsOptions = {
    origin: 'https://red-moss-01d09b010.5.azurestaticapps.net',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
};


app.use(cors(corsOptions));

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

app.get('/verify', verifyUser, (req, res) => {
    return res.json({ Status: true, role: req.role, id: req.id });
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start the server
app.listen(port, () => {
    console.log("Server is running on port :", port);
});
