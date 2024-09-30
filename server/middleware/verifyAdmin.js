// // middleware/verifyAdmin.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// async function verifyAdmin(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         return res.status(403).json({ message: 'No authorization header provided' });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(403).json({ message: 'No token found in Authorization header' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
//         if (err) {
//             return res.status(500).json({ message: 'Failed to authenticate token' });
//         }

//         const user = await User.findById(decoded.userId);
//         if (!user || !user.isAdmin) {
//             return res.status(403).json({ message: 'Admin access required' });
//         }

//         req.user = {
//             userId: decoded.userId,
//             fullname: decoded.fullname,
//         };
//         next();
//     });
// }

// module.exports = verifyAdmin;


const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function verifyAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No authorization header provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token found in Authorization header' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }

        req.user = {
            userId: decoded.userId,
            fullname: decoded.fullname,
            role: user.role
        };
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }
}

module.exports = verifyAdmin;