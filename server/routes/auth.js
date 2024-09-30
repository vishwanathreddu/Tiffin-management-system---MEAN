// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/verifyToken');

// // Register route
// router.post('/register', async (req, res) => {
//     const { fullName, email, password } = req.body;
//     const user = new User({ fullName, email, password: bcrypt.hashSync(password, 8) });
//     try {
//         await user.save();
//         res.status(201).send({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).send({ message: 'Error registering user' });
//     }
// });

// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(404).send({ message: 'User not found' });
//     }
//     const isPasswordValid = bcrypt.compareSync(password, user.password);
//     if (!isPasswordValid) {
//         return res.status(401).send({ message: 'Invalid password' });
//     }
//     const token = jwt.sign({ id: user._id }, 'secret-key', { expiresIn: 86400 });
//     res.status(200).send({ token });
// });


// Best
// Register a new user
// router.post('/register', async (req, res) => {
//     try {
//         const { fullname, email, password } = req.body;

//         // Check if user already exists
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         user = new User({
//             fullname,
//             email,
//             password: hashedPassword,
//         });

//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         // res.status(500).json({ message: 'Server error' });
//         console.error('Error registering user:', error); // Log the error to console
//         res.status(500).json({ message: 'Error registering user', error: error.message });

//     }
// });

//test-1
// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { fullname, email, password, role = 'user' } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({
            fullname,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});


// Best
// Login a user
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Check password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Create JWT token
//         const token = jwt.sign({ userId: user._id, fullname: user.fullname }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({ token });
//     } catch (error) {
//         // res.status(500).json({ message: 'Server error' });
//         console.error('Error logging in user:', error); // Log the error to console
//         res.status(500).json({ message: 'Error logging in user', error: error.message });
//     }
// });


//test-1
// routes/auth.js

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create JWT token with role
        const token = jwt.sign({ userId: user._id, fullname: user.fullname, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            token,
            role: user.role
        });// Include role in the response
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
});


// GET user details
router.get('/user', auth, async (req, res) => {
    try {
        // req.user contains the authenticated user details from auth middleware
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Example of a protected route for admins only
router.get('/admin', auth, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    // Admin specific logic here
    res.status(200).json({ message: 'Welcome, Admin!' });
});


module.exports = router;
