import express from "express";
import cors from 'cors';
import path from 'path'; // Import path module
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: ["https://red-moss-01d09b010.5.azurestaticapps.net"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}));

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


// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
