// const jwt = require('jsonwebtoken');

// function verifyToken(req, res, next) {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(403).send({ message: 'No token provided' });
//     }
//     jwt.verify(token.split(' ')[1], 'secret-key', (err, decoded) => {
//         if (err) {
//             return res.status(500).send({ message: 'Failed to authenticate token' });
//         }
//         req.userId = decoded.id;
//         next();
//     });
// }

// module.exports = verifyToken;


// //test-1
// const jwt = require('jsonwebtoken');

// function verifyToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         return res.status(403).send({ message: 'No token provided' });
//     }
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(500).send({ message: 'Failed to authenticate token' });
//         }
//         req.userId = decoded.id;
//         next();
//     });
// }

// module.exports = verifyToken;




// //test-2
// const jwt = require('jsonwebtoken');

// function verifyToken(req, res, next) {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(403).send({ message: 'No token provided' });
//     }
//     jwt.verify(token.split(' ')[1], 'secret-key', (err, decoded) => {
//         if (err) {
//             return res.status(500).send({ message: 'Failed to authenticate token' });
//         }
//         req.userId = decoded.id;
//         req.username = decoded.username; // Add username to request
//         next();
//     });
// }

// module.exports = verifyToken;



// //test-3
// const jwt = require('jsonwebtoken');

// function verifyToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         return res.status(403).send({ message: 'No authorization header provided' });
//     }

//     // Check if the Authorization header starts with 'Bearer '
//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(403).send({ message: 'No token found in Authorization header' });
//     }

//     jwt.verify(token, 'secret-key', (err, decoded) => {
//         if (err) {
//             return res.status(500).send({ message: 'Failed to authenticate token' });
//         }
//         req.userId = decoded.id;
//         req.username = decoded.fullname; // Assuming fullname is stored in JWT payload
//         next();
//     });
// }

// module.exports = verifyToken;




//test-4-best
// const jwt = require('jsonwebtoken');

// function verifyToken(req, res, next) {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(403).json({ message: 'No token provided' });
//     }

//     jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(500).json({ message: 'Failed to authenticate token' });
//         }
//         req.user = {
//             userId: decoded.userId, // Assuming the payload has userId
//             fullname: decoded.fullname // Assuming the payload has fullname
//         };
//         next();
//     });
// }

// // Best
// //test-5
// const jwt = require('jsonwebtoken');

// function verifyToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         return res.status(403).json({ message: 'No authorization header provided' });
//     }

//     // Extract the token from the Authorization header
//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(403).json({ message: 'No token found in Authorization header' });
//     }

//     // Verify the token
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(500).json({ message: 'Failed to authenticate token' });
//         }
//         req.user = {
//             userId: decoded.userId,
//             fullname: decoded.fullname
//         };
//         next();
//     });
// }

// module.exports = verifyToken;


//test-6

// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No authorization header provided' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token found in Authorization header' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.user = {
            userId: decoded.userId,
            fullname: decoded.fullname,
            role: decoded.role // Add role to the request object
        };
        next();
    });
}

module.exports = verifyToken;

