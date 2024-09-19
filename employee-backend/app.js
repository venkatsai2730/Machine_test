const express = require('express');
const path = require('path');
const cors = require("cors");
const methodOverride = require('method-override');
const employeeRoutes = require('./routes/employee-list');  // Employee route file

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));  // Allows PUT/DELETE methods in forms

// Dummy user for login
const dummyUser = {
    username: 'admin1',
    password: 'admin1234'
};

// POST /login - Handle login (This is the login API)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === dummyUser.username && password === dummyUser.password) {
        res.status(200).json({ message: "Login successful", redirectUrl: "/admin" });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

// GET /admin - Restricted admin page
app.get('/admin', (req, res) => {
    res.status(200).json({ message: "Welcome to the admin page!" });
});

// Employee API routes
app.use("/employees", employeeRoutes);

// Logout route (Not necessary for stateless API, but included if you need it)
app.get("/logout", (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
