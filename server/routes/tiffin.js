const express = require('express');
const router = express.Router();
const Tiffin = require('../models/tiffin');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/user'); // Adjust path based on your file structure

const TiffinAvailability = require('../models/tiffinAvailability');
const verifyAdmin = require('../middleware/verifyAdmin'); // Admin verification middleware


// // Mark tiffin route for tomorrow (with verifyToken middleware)
// router.post('/mark/tomorrow', verifyToken, async (req, res) => {
//     const userId = req.userId; // obtained from verifyToken middleware
//     const date = new Date();
//     date.setDate(date.getDate() + 1); // mark for tomorrow

//     const tiffin = new Tiffin({ userId, date });
//     try {
//         await tiffin.save();
//         res.status(201).send({ message: 'Tiffin marked for tomorrow' });
//     } catch (error) {
//         res.status(500).send({ message: 'Error marking tiffin for tomorrow' });
//     }
// });



// //test-1
// // Mark tiffin route for tomorrow (with verifyToken middleware)
// router.post('/mark/tomorrow', verifyToken, async (req, res) => {
//     const userId = req.userId; // obtained from verifyToken middleware
//     const { vegOrNonVeg, chapatis, sabji, floor } = req.body;

//     const date = new Date();
//     date.setDate(date.getDate() + 1); // mark for tomorrow

//     const tiffin = new Tiffin({ userId, date, vegOrNonVeg, chapatis, sabji, floor });
//     try {
//         await tiffin.save();
//         res.status(201).send({ message: 'Tiffin marked for tomorrow' });
//     } catch (error) {
//         res.status(500).send({ message: 'Error marking tiffin for tomorrow' });
//     }
// });



// //test-2
// // Mark tiffin route for tomorrow (with verifyToken middleware)
// router.post('/mark/tomorrow', verifyToken, async (req, res) => {
//     const { vegOrNonVeg, chapatis, sabji, floor } = req.body;
//     const userId = req.userId;
//     const username = req.username;

//     const date = new Date();
//     date.setDate(date.getDate() + 1); // mark for tomorrow

//     const tiffin = new Tiffin({ userId, username, date, vegOrNonVeg, chapatis, sabji, floor });
//     try {
//         await tiffin.save();
//         res.status(201).send({ message: 'Tiffin marked for tomorrow' });
//     } catch (error) {
//         console.error('Error marking tiffin for tomorrow:', error);
//         res.status(500).send({ message: 'Error marking tiffin for tomorrow' });
//     }
// });

// // Retrieve all tiffins for the admin
// router.get('/all', verifyToken, async (req, res) => {
//     try {
//         const tiffins = await Tiffin.find().populate('userId');
//         res.json(tiffins);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });




//test-3
// Mark tiffin for tomorrow
// router.post('/mark/tomorrow', verifyToken, async (req, res) => {
//     const { userId, fullname } = req.user; // From middleware
//     const date = new Date();
//     date.setDate(date.getDate() + 1); // Tomorrow's date

//     const { vegOrNonVeg, chapatis, sabji, floor } = req.body;

//     // const tiffin = new Tiffin({
//     //     userId,
//     //     username: fullname,
//     //     date,
//     //     vegOrNonVeg,
//     //     chapatis,
//     //     sabji,
//     //     floor
//     // });

//     // try {
//     //     await tiffin.save();
//     //     res.status(201).json({ message: 'Tiffin marked for tomorrow' });
//     // } catch (error) {
//     //     if (error.code === 11000) {
//     //         res.status(400).json({ message: 'Tiffin already marked for tomorrow' });
//     //     } else {
//     //         console.error('Error marking tiffin for tomorrow:', error);
//     //         res.status(500).json({ message: 'Error marking tiffin for tomorrow', error: error.message });
//     //     }
//     // }


//     //case-1
//     try {
//         const existingTiffin = await Tiffin.findOne({ userId, date });
//         if (existingTiffin) {
//             return res.status(400).json({ message: 'Tiffin already marked for tomorrow' });
//         }

//         const tiffin = new Tiffin({
//             userId,
//             username: fullname,
//             date,
//             vegOrNonVeg,
//             chapatis,
//             sabji,
//             floor
//         });

//         await tiffin.save();
//         res.status(201).json({ message: 'Tiffin marked for tomorrow' });
//     } catch (error) {
//         console.error('Error marking tiffin for tomorrow:', error);
//         res.status(500).json({ message: 'Error marking tiffin for tomorrow', error: error.message });
//     }
// });


// //test-4 - excellent
// // Mark tiffin for tomorrow
// router.post('/mark/tomorrow', verifyToken, async (req, res) => {
//     const { userId, fullname } = req.user; // From middleware
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     tomorrow.setHours(0, 0, 0, 0); // Set time to start of the day

//     const { vegOrNonVeg, chapatis, sabji, floor } = req.body;

//     try {
//         // Check if a tiffin is already marked for this user for tomorrow
//         const existingTiffin = await Tiffin.findOne({ userId, date: tomorrow });
//         if (existingTiffin) {
//             return res.status(400).json({ message: 'Tiffin already marked for tomorrow' });
//         }

//         const tiffin = new Tiffin({
//             userId,
//             username: fullname,
//             date: tomorrow,
//             vegOrNonVeg,
//             chapatis,
//             sabji,
//             floor
//         });

//         await tiffin.save();
//         res.status(201).json({ message: 'Tiffin marked for tomorrow' });
//     } catch (error) {
//         console.error('Error marking tiffin for tomorrow:', error);
//         res.status(500).json({ message: 'Error marking tiffin for tomorrow', error: error.message });
//     }
// });

// // test-5
// // Mark tiffin for tomorrow
// router.post('/mark/tomorrow', verifyToken, async (req, res) => {
//     const { userId, fullname } = req.user; // From middleware
//     const { vegOrNonVeg, chapatis, sabji, floor, time } = req.body;

//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     // Set default time to 18:30 (6:30 PM) if not provided
//     const defaultTime = '18:30';
//     const [hours, minutes] = (time || defaultTime).split(':').map(Number);
//     tomorrow.setHours(hours, minutes, 0, 0);

//     try {
//         // Check if a tiffin is already marked for this user for tomorrow
//         const existingTiffin = await Tiffin.findOne({
//             userId,
//             date: {
//                 $gte: new Date(tomorrow.setHours(0, 0, 0, 0)),
//                 $lt: new Date(tomorrow.setHours(23, 59, 59, 999))
//             }
//         });

//         if (existingTiffin) {
//             return res.status(400).json({ message: 'Tiffin already marked for tomorrow' });
//         }

//         const tiffin = new Tiffin({
//             userId,
//             username: fullname,
//             date: tomorrow,
//             vegOrNonVeg,
//             chapatis,
//             sabji,
//             floor
//         });

//         await tiffin.save();
//         res.status(201).json({ message: 'Tiffin marked for tomorrow' });
//     } catch (error) {
//         console.error('Error marking tiffin for tomorrow:', error);
//         res.status(500).json({ message: 'Error marking tiffin for tomorrow', error: error.message });
//     }
// });


//test-6
// Mark tiffin for tomorrow
router.post('/mark/tomorrow', verifyToken, async (req, res) => {
    const { userId, fullname } = req.user; // From middleware
    const { vegOrNonVeg, chapatis, sabji, floor, time } = req.body;

    // Get current date and time
    const now = new Date();

    // Set the date to tomorrow
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // Set the time
    if (time) {
        const [hours, minutes] = time.split(':').map(Number);
        tomorrow.setHours(hours, minutes, 0, 0);
    } else {
        // If no time provided, use current time
        tomorrow.setHours(now.getHours(), now.getMinutes(), 0, 0);
    }

    try {
        // Check if a tiffin is already marked for this user for tomorrow
        const existingTiffin = await Tiffin.findOne({
            userId,
            date: {
                $gte: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()),
                $lt: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate() + 1)
            }
        });

        if (existingTiffin) {
            return res.status(400).json({ message: 'Tiffin already marked for tomorrow' });
        }

        const tiffin = new Tiffin({
            userId,
            username: fullname,
            date: tomorrow,
            vegOrNonVeg,
            chapatis,
            sabji,
            floor
        });

        await tiffin.save();
        res.status(201).json({ message: 'Tiffin marked for tomorrow', time: tomorrow.toISOString() });
    } catch (error) {
        console.error('Error marking tiffin for tomorrow:', error);
        res.status(500).json({ message: 'Error marking tiffin for tomorrow', error: error.message });
    }
});




// // Get all tiffins for tomorrow
// router.get('/tiffins/tomorrow', verifyAdmin, async (req, res) => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     tomorrow.setHours(0, 0, 0, 0); // Set time to start of the day

//     try {
//         const tiffins = await Tiffin.find({ date: tomorrow }).populate('userId', 'fullname');
//         res.json(tiffins);
//     } catch (error) {
//         console.error('Error fetching tiffins for tomorrow:', error);
//         res.status(500).json({ message: 'Error fetching tiffins for tomorrow', error: error.message });
//     }
// });


//test-1-good
// Get all tiffins for tomorrow
router.get('/tiffins/tomorrow', verifyToken, async (req, res) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set time to start of the day

    try {
        const tiffins = await Tiffin.find({ date: tomorrow }).populate('userId', 'fullname');
        res.json(tiffins);
    } catch (error) {
        console.error('Error fetching tiffins for tomorrow:', error);
        res.status(500).json({ message: 'Error fetching tiffins for tomorrow', error: error.message });
    }
});

// // good
// // Get all tiffins for a specific date
// router.get('/tiffins', verifyToken, async (req, res) => {
//     const { date } = req.query;

//     try {
//         // Default to tomorrow's date if no date is provided
//         const targetDate = date ? new Date(date) : new Date();
//         targetDate.setDate(targetDate.getDate() + 1);
//         targetDate.setHours(0, 0, 0, 0);

//         const tiffins = await Tiffin.find({ date: targetDate }).populate('userId', 'fullname');

//         if (tiffins.length === 0) {
//             return res.status(404).json({ message: 'No tiffin orders found for the selected date' });
//         }

//         res.json(tiffins);
//     } catch (error) {
//         console.error('Error fetching tiffins:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// router.get('/tiffins', verifyToken, async (req, res) => {
//     const { date } = req.query;

//     try {
//         const targetDate = date ? new Date(date) : new Date();
//         targetDate.setHours(0, 0, 0, 0);

//         const endDate = new Date(targetDate);
//         endDate.setDate(endDate.getDate() + 1);

//         const tiffins = await Tiffin.find({
//             date: {
//                 $gte: targetDate,
//                 $lt: endDate
//             }
//         }).populate('userId', 'fullname');

//         if (tiffins.length === 0) {
//             return res.status(404).json({ message: 'No tiffin orders found for the selected date' });
//         }

//         res.json(tiffins);
//     } catch (error) {
//         console.error('Error fetching tiffins:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// Get all tiffins for a specific date
router.get('/tiffins', verifyToken, async (req, res) => {
    const { date } = req.query;

    try {
        // Parse the date string to a Date object
        const targetDate = new Date(date);

        // Set the time to the start of the day (00:00:00)
        targetDate.setUTCHours(0, 0, 0, 0);

        // Set the end date to the end of the target day (23:59:59)
        const endDate = new Date(targetDate);
        endDate.setUTCHours(23, 59, 59, 999);

        const tiffins = await Tiffin.find({
            date: {
                $gte: targetDate,
                $lte: endDate
            }
        }).populate('userId', 'fullname');

        if (tiffins.length === 0) {
            return res.status(404).json({ message: 'No tiffin orders found for the selected date' });
        }

        res.json(tiffins);
    } catch (error) {
        console.error('Error fetching tiffins:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// routes/tiffin.js
// Get tiffin history for a user
router.get('/history/:username', verifyToken, async (req, res) => {
    const { username } = req.params;

    try {
        const tiffins = await Tiffin.find({ username }).sort({ date: -1 }); // Fetch tiffins for user sorted by date
        res.json(tiffins);
    } catch (err) {
        console.error('Error fetching tiffin history:', err);
        res.status(500).json({ message: 'Error fetching tiffin history', error: err.message });
    }
});


//test-5
// Assuming you have a route set up like this
// router.get('/api/tiffin-history', verifyToken, async (req, res) => {
//     try {
//         // const tiffinHistory = await Tiffin.find({ userId: req.user.id }); // Assuming you filter by user ID
//         const tiffinHistory = await Tiffin.find({ userId: req.userId });
//         res.json(tiffinHistory);
//     } catch (err) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

//test-6
// Get tiffin history by user ID
router.get('/', verifyToken, async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Ensure the user has permission to access this data
        // if (req.user._id !== userId) {
        //     return res.status(403).json({ message: 'Forbidden access' });
        // }
        if (req.user.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden access' });
        }

        const tiffinHistory = await Tiffin.find({ userId }).exec();
        res.status(200).json(tiffinHistory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});



// module.exports = router;

// Check if user has marked tiffin for previous dates
router.get('/check-previous/:username', verifyToken, async (req, res) => {
    const { username } = req.params;

    try {
        // Check if there are any tiffin records for the user before tomorrow's date
        const count = await Tiffin.countDocuments({
            username,
            date: { $lt: new Date(new Date().setDate(new Date().getDate() + 1)) } // Before tomorrow
        });

        // Return true if tiffin records exist, false otherwise
        res.json({ marked: count > 0 });
    } catch (err) {
        console.error('Error checking previous tiffin marking:', err);
        res.status(500).json({ message: 'Error checking previous tiffin marking', error: err.message });
    }
});

// // Get tiffin history for a user
// router.get('/history/:userId', verifyToken, async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const tiffinHistory = await Tiffin.find({ userId }).sort({ date: -1 });
//         res.status(200).json(tiffinHistory);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });

// Get tiffin history for a user
router.get('/history/:userId', verifyToken, async (req, res) => {
    const { userId } = req.params;

    try {
        const tiffins = await Tiffin.find({ userId }).sort({ date: -1 });
        res.json(tiffins);
    } catch (err) {
        console.error('Error fetching tiffin history:', err);
        res.status(500).json({ message: 'Error fetching tiffin history', error: err.message });
    }
});

// Get all tiffins
router.get('/', verifyToken, async (req, res) => {
    // try {
    //     const tiffins = await Tiffin.find().populate('userId');
    //     res.json(tiffins);
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }

    //test-1
    try {
        const userId = req.user.userId;
        const tiffins = await Tiffin.find({ userId }).populate('userId');
        res.json(tiffins);
    } catch (err) {
        console.error('Error fetching all tiffins:', err.message);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});


// // Get all users
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

//test-1
// Get all users
router.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// // Mark tiffin for a user (specific date)
// router.post('/mark', async (req, res) => {
//     const { userId, date } = req.body;

//     const tiffin = new Tiffin({
//         userId,
//         date
//     });

//     try {
//         const newTiffin = await tiffin.save();
//         res.status(201).json(newTiffin);
//     } catch (err) {
//         res.status(400).json({ message: 'Error marking tiffin' });
//     }
// });


// test-1
// Mark tiffin for a user (specific date)
router.post('/mark', verifyToken, async (req, res) => {
    const { userId, date, vegOrNonVeg, chapatis, sabji, floor } = req.body;

    const tiffin = new Tiffin({
        userId,
        date,
        vegOrNonVeg,
        chapatis,
        sabji,
        floor
    });

    try {
        const newTiffin = await tiffin.save();
        res.status(201).json(newTiffin);
    } catch (err) {
        res.status(400).json({ message: 'Error marking tiffin' });
    }
});


// Set tiffin availability for tomorrow
router.post('/set-availability', verifyAdmin, async (req, res) => {
    const { option } = req.body;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    try {
        let availability = await TiffinAvailability.findOne({ date: tomorrow });
        if (!availability) {
            availability = new TiffinAvailability({ date: tomorrow });
        }

        availability.vegAvailable = option === 'veg';
        availability.nonVegAvailable = option === 'non-veg';
        availability.noTiffin = option === 'none';

        await availability.save();
        res.json({ message: 'Tiffin availability set successfully', availability });
    } catch (error) {
        res.status(500).json({ message: 'Error setting tiffin availability', error: error.message });
    }
});

// // Get tiffin availability for a specific date
// router.get('/availability/:date', async (req, res) => {
//     const date = new Date(req.params.date);
//     date.setHours(0, 0, 0, 0);

//     try {
//         const availability = await TiffinAvailability.findOne({ date });
//         res.json(availability || { message: 'No availability set for this date' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching tiffin availability', error: error.message });
//     }
// });

// Get tiffin availability for a specific date
router.get('/availability/:date', async (req, res) => {
    try {
        const dateParam = req.params.date;
        let date;

        if (dateParam === 'tomorrow') {
            date = new Date();
            date.setDate(date.getDate() + 1);
        } else {
            date = new Date(dateParam);
        }

        if (isNaN(date.getTime())) {
            return res.status(400).json({ message: 'Invalid date format. Use ISO 8601 format (e.g., 2023-09-26T00:00:00.000Z) or "tomorrow".' });
        }

        date.setHours(0, 0, 0, 0);

        const availability = await TiffinAvailability.findOne({ date });
        if (availability) {
            res.json(availability);
        } else {
            res.status(404).json({ message: 'No availability set for this date' });
        }
    } catch (error) {
        console.error('Error fetching tiffin availability:', error);
        res.status(500).json({ message: 'Error fetching tiffin availability', error: error.message });
    }
});


// //route to fetch tiffin data for a specific month
// router.get('/monthly-report/:year/:month', verifyToken, async (req, res) => {
//     const { year, month } = req.params;

//     try {
//       const startDate = new Date(year, month - 1, 1);
//       const endDate = new Date(year, month, 0);

//       const tiffins = await Tiffin.find({
//         date: { $gte: startDate, $lte: endDate }
//       }).populate('userId');

//       res.json(tiffins);
//     } catch (err) {
//       console.error('Error fetching monthly report:', err);
//       res.status(500).json({ message: 'Error fetching monthly report', error: err.message });
//     }
//   });

//test-1
// Monthly report endpoint
// router.get('/monthly-report', verifyToken, async (req, res) => {
//     const { year, month } = req.query;

//     try {
//         const startDate = new Date(year, month - 1, 1);
//         const endDate = new Date(year, month, 0);

//         const tiffinOrders = await Tiffin.find({
//             date: { $gte: startDate, $lte: endDate }
//         }).populate('userId');

//         res.json(tiffinOrders);
//     } catch (error) {
//         console.error('Error fetching monthly tiffin report:', error);
//         res.status(500).json({ message: 'Error fetching monthly tiffin report', error: error.message });
//     }
// });

// //test-2
// // Monthly report endpoint
// router.get('/monthly-report', verifyToken, async (req, res) => {
//     const { year, month } = req.query;

//     try {
//         const startDate = new Date(year, month - 1, 1);
//         const endDate = new Date(year, month, 0);

//         const tiffinOrders = await Tiffin.find({
//             date: { $gte: startDate, $lte: endDate }
//         }).populate('userId');

//         const userTiffinMap = {};

//         tiffinOrders.forEach(order => {
//             const username = order.userId.fullname;
//             if (!userTiffinMap[username]) {
//                 userTiffinMap[username] = {
//                     username,
//                     totalDays: 0,
//                     totalAmount: 0,
//                     paymentStatus: 'Unpaid'
//                 };
//             }
//             userTiffinMap[username].totalDays++;
//             userTiffinMap[username].totalAmount += 60; // Assuming the price is 60
//         });

//         const userTiffinData = Object.values(userTiffinMap);
//         res.json(userTiffinData);
//     } catch (error) {
//         console.error('Error fetching monthly tiffin report:', error);
//         res.status(500).json({ message: 'Error fetching monthly tiffin report', error: error.message });
//     }
// });


// //test-3-good
// router.get('/monthly-report', verifyToken, async (req, res) => {
//     const { year, month } = req.query;

//     try {
//         const startDate = new Date(year, month - 1, 1);
//         const endDate = new Date(year, month, 0);

//         const tiffinOrders = await Tiffin.find({
//             date: { $gte: startDate, $lte: endDate }
//         }).populate('userId');

//         const userTiffinMap = {};

//         tiffinOrders.forEach(order => {
//             const username = order.userId.fullname;
//             if (!userTiffinMap[username]) {
//                 userTiffinMap[username] = {
//                     username,
//                     totalDays: 0,
//                     totalAmount: 0,
//                     paymentStatus: 'Unpaid'
//                 };
//             }
//             userTiffinMap[username].totalDays++;
//             userTiffinMap[username].totalAmount += 60; // Assuming the price is 60
//         });

//         const userTiffinData = Object.values(userTiffinMap);
//         res.json(userTiffinData);
//     } catch (error) {
//         console.error('Error fetching monthly tiffin report:', error);
//         res.status(500).json({ message: 'Error fetching monthly tiffin report', error: error.message });
//     }
// });


// //test-4
// router.get('/monthly-report', async (req, res) => {
//     const { year, month } = req.query;

//     try {
//         const startDate = new Date(year, month - 1, 1);
//         const endDate = new Date(year, month, 0);

//         console.log(`Fetching tiffins from ${startDate} to ${endDate}`);

//         const tiffins = await Tiffin.find({
//             date: { $gte: startDate, $lte: endDate }
//         }).populate('userId', 'username'); // Populate userId with username

//         console.log('Tiffins fetched:', tiffins);

//         res.json(tiffins);
//     } catch (error) {
//         console.error('Error in monthly report route:', error);
//         res.status(500).json({ message: 'Error fetching monthly report', error: error.message });
//     }
// });


//test-5
router.get('/monthly-report', async (req, res) => {
    const { year, month } = req.query;

    try {
        const report = await Tiffin.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(`${year}-${month}-01`),
                        $lt: new Date(`${year}-${Number(month) + 1}-01`)
                    }
                }
            },
            {
                $group: {
                    _id: '$userId',
                    username: { $first: '$username' },
                    totalDays: { $sum: 1 },
                    totalAmount: { $sum: 60 }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    _id: 0,
                    userId: '$_id',
                    username: '$username',
                    totalDays: 1,
                    totalAmount: 1,
                    fullname: '$user.fullname'
                }
            }
        ]);

        res.json(report);
    } catch (error) {
        console.error('Error generating monthly report:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;

router.get('/monthly-tiffin-amounts/:month/:year', verifyToken, async (req, res) => {
    try {
        const { month, year } = req.params;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        // Fetch tiffin data for the selected month and year
        const tiffinData = await Tiffin.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: '$userId',
                    totalDays: { $sum: 1 }, // Assuming each document represents one day
                    totalAmount: { $sum: '$amount' } // Assuming the document has an amount field
                }
            },
            {
                $lookup: {
                    from: 'users', // Adjust collection name if needed
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    userId: '$_id',
                    fullname: '$user.fullname',
                    totalDays: 1,
                    totalAmount: 1
                }
            }
        ]);

        res.status(200).json(tiffinData);
    } catch (error) {
        console.error('Error fetching monthly tiffin amounts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// // Mark tiffin route
// router.post('/mark', verifyToken, async (req, res) => {
//     const userId = req.userId; // obtained from verifyToken middleware
//     const date = new Date();
//     date.setDate(date.getDate() + 1); // mark for tomorrow

//     const tiffin = new Tiffin({ userId, date });
//     try {
//         await tiffin.save();
//         res.status(201).send({ message: 'Tiffin marked for tomorrow' });
//     } catch (error) {
//         res.status(500).send({ message: 'Error marking tiffin' });
//     }
// });