// // Require dependencies
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// // Import routes
// const authRoutes = require('./routes/auth');
// const tiffinRoutes = require('./routes/tiffin');

// // Initialize express app
// const app = express();


// // CORS middleware
// const corsOptions = {
//     origin: 'http://localhost:4200', // Update with your Angular app's URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   };

//   app.use(cors(corsOptions));

// // Middleware
// // app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true, // Ensure indexes are created in MongoDB
//     // useFindAndModify: false // Disable deprecated findAndModify
// })
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tiffin', tiffinRoutes);

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });



// //Username:  vishwanathredduking
// //Password: 4CSflUF4BSYmtHxn
// //node server.js

//npm run dev

// // {
// //     "fullname": "John Doe",
// //     "email": "johndoe@example.com",
// //     "password": "password123"
// //   }

// {
//     "fullname": "Admin Jane",
//     "email": "adminjane@example.com",
//     "password": "securepassword",
//     "role": "admin"
//   }

// // {
// //     "fullname": "User1", Alex junner
// //     "email": "user1@gmail.com", alexjunner@example.com
// //     "password": "user@1", alex1
// //   }

// // {
// //     "fullname": "test1",
// //     "email": "test1@test.com",
// //     "password": "test@123"
// //   }



//test-1
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');

dotenv.config();

const app = express();

// CORS middleware
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import and use routes
const authRoutes = require('./routes/auth');
const tiffinRoutes = require('./routes/tiffin');
const userRoutes = require('./routes/user'); // Add this line for user routes

const paymentRoutes = require('./routes/payment'); // Import the payment routes

app.use('/api/auth', authRoutes);
app.use('/api/tiffin', tiffinRoutes);
app.use('/api/users', userRoutes); // Make sure this matches your user routes file

app.use('/api/payment', paymentRoutes); // Use payment routes

// Static files for uploaded images
// app.use('/uploads', express.static('uploads'));

//test-1
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
