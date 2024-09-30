const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust path as needed

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single user by ID
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// POST a new user
router.post('/', async (req, res) => {
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
        // Add more fields as needed
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware function to get user by ID
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

module.exports = router;
