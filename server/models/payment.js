// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     amount: { type: Number, required: true },
//     status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
//     paymentDate: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Payment', paymentSchema);


// models/payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  amount: { type: Number, required: true },
  transactionPhoto: { type: String, required: true }, // Store the filename of the uploaded image
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
