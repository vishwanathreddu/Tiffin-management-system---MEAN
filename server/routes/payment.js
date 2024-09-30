// const express = require('express');
// const router = express.Router();
// const Payment = require('../models/payment.model');

// // GET all payments
// router.get('/', async (req, res) => {
//     try {
//         const payments = await Payment.find();
//         res.json(payments);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Update payment status
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedPayment);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// module.exports = router;

// // routes/payment.js
// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const Payment = require('../models/payment');
// const verifyToken = require('../middleware/verifyToken');

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Store uploads in 'uploads' folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// const upload = multer({ storage: storage });

// // Route to handle user payment
// router.post('/pay', verifyToken, upload.single('transactionPhoto'), async (req, res) => {
//     const { userId, username, amount } = req.body;
//     const transactionPhoto = req.file ? req.file.filename : null;

//     if (!transactionPhoto) {
//         return res.status(400).json({ message: 'Transaction photo is required' });
//     }

//     try {
//         const newPayment = new Payment({
//             userId,
//             username,
//             amount,
//             transactionPhoto,
//         });

//         await newPayment.save();
//         res.status(201).json({ message: 'Payment recorded successfully' });
//     } catch (error) {
//         console.error('Error recording payment:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // Route to fetch payments for the admin dashboard
// router.get('/payments', verifyToken, async (req, res) => {
//     try {
//         const payments = await Payment.find().populate('userId', 'fullname');

//         res.json(payments);
//     } catch (error) {
//         console.error('Error fetching payments:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// module.exports = router;


// routes/payment.js
const express = require('express');
const multer = require('multer'); // For handling file uploads
const verifyToken = require('../middleware/verifyToken');
const Payment = require('../models/payment');
const User = require('../models/user'); // Ensure this is the correct user model path

const router = express.Router();

const Tiffin = require('../models/tiffin'); // Import Tiffin model

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

const upload = multer({ storage });

// Route to submit a payment
router.post('/submit', verifyToken, upload.single('transactionPhoto'), async (req, res) => {
    try {
        const { userId, username, amount } = req.body;
        // const transactionPhoto = req.file.path; // File path for the uploaded image

        // best
        // const transactionPhoto = req.file.filename; // Store only the filename
        const transactionPhoto = req.file ? req.file.filename : null; // Store filename if uploaded

        const payment = new Payment({
            userId,
            username,
            amount,
            transactionPhoto
        });

        await payment.save();

        res.status(201).json({ message: 'Payment submitted successfully' });
    } catch (error) {
        console.error('Error submitting payment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get all payments
// router.get('/all', verifyToken, async (req, res) => {
//     try {
//         const payments = await Payment.find().populate('userId', 'fullname');
//         res.json(payments);
//     } catch (error) {
//         console.error('Error fetching payments:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// Best
// Route to get user payments for a specific month and year
// router.get('/user-payments/:month/:year', verifyToken, async (req, res) => {
//     try {
//         const { month, year } = req.params;
//         const startDate = new Date(year, month - 1, 1); // First day of the month
//         const endDate = new Date(year, month, 0, 23, 59, 59); // Last day of the month

//         const payments = await Payment.find({
//             date: {
//                 $gte: startDate,
//                 $lte: endDate,
//             },
//         }).populate('userId', 'fullname');

//         // Check if no payments found
//         if (payments.length === 0) {
//             return res.status(404).json({ message: 'No payment records found for the selected month.' });
//         }

//         res.status(200).json(payments);
//     } catch (error) {
//         console.error('Error fetching payments by month:', error);
//         res.status(500).json({ message: 'Error fetching payments by month', error: error.message });
//     }
// });


// Best
// // Route to get all payment dues for a specific month and year
// router.get('/dues/:month/:year', verifyToken, async (req, res) => {
//     try {
//         const { month, year } = req.params;
//         const startDate = new Date(year, month - 1, 1); // First day of the month
//         const endDate = new Date(year, month, 0, 23, 59, 59); // Last day of the month

//         // Fetch all users
//         const users = await User.find();

//         // Fetch payments for the selected month and year
//         const payments = await Payment.find({
//             date: {
//                 $gte: startDate,
//                 $lte: endDate,
//             },
//         }).populate('userId', 'fullname');

//         // Map user payments to user IDs for quick lookup
//         const paymentMap = payments.reduce((map, payment) => {
//             map[payment.userId._id] = payment;
//             return map;
//         }, {});

//         // Create a list of payment dues, initially marking all as unpaid
//         const paymentDues = users.map(user => {
//             const payment = paymentMap[user._id];
//             return {
//                 userId: user._id,
//                 fullname: user.fullname,
//                 amount: payment ? payment.amount : 0,
//                 date: payment ? payment.date : null,
//                 transactionPhoto: payment ? payment.transactionPhoto : null,
//                 status: payment && payment.transactionPhoto ? 'Paid' : 'Unpaid'
//             };
//         });

//         // Filter to only include unpaid users if needed
//         const unpaidDues = paymentDues.filter(due => due.status === 'Unpaid');

//         res.status(200).json({ unpaidDues, allDues: paymentDues });
//     } catch (error) {
//         console.error('Error fetching payment dues:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });


// Route to get all payment dues for a specific month and year
router.get('/dues/:month/:year', verifyToken, async (req, res) => {
    try {
        const { month, year } = req.params;
        const startDate = new Date(year, month - 1, 1); // First day of the month
        const endDate = new Date(year, month, 0, 23, 59, 59); // Last day of the month

        const pricePerTiffin = 60; // Price per tiffin

        // Fetch all users
        const users = await User.find();

        // Fetch tiffins for the selected month and year
        const tiffins = await Tiffin.find({
            date: {
                $gte: startDate,
                $lte: endDate,
            },
        });

        // Count total tiffins per user
        const userTiffinsMap = tiffins.reduce((acc, tiffin) => {
            acc[tiffin.userId] = (acc[tiffin.userId] || 0) + 1;
            return acc;
        }, {});

        // Fetch payments for the selected month and year
        const payments = await Payment.find({
            date: {
                $gte: startDate,
                $lte: endDate,
            },
        }).populate('userId', 'fullname');

        // Map user payments to user IDs for quick lookup
        const paymentMap = payments.reduce((map, payment) => {
            map[payment.userId._id] = payment;
            return map;
        }, {});

        // Create a list of payment dues
        const paymentDues = users.map(user => {
            const totalDays = userTiffinsMap[user._id] || 0; // Total tiffins marked
            const totalAmount = totalDays * pricePerTiffin; // Calculate total amount due

            const payment = paymentMap[user._id];
            return {
                userId: user._id,
                fullname: user.fullname,
                totalDays,
                totalAmount,
                amountPaid: payment ? payment.amount : 0,
                transactionPhoto: payment ? payment.transactionPhoto : null,
                status: payment && payment.transactionPhoto ? 'Paid' : 'Unpaid'
            };
        });

        res.status(200).json({ paymentDues });
    } catch (error) {
        console.error('Error fetching payment dues:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;