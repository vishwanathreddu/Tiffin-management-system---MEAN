const mongoose = require('mongoose');

const tiffinOrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    numberOfTiffins: { type: Number, required: true }, // Total tiffins ordered for the month
    transactionPhoto: { type: String, default: null }, // Transaction photo
});

module.exports = mongoose.model('TiffinOrder', tiffinOrderSchema);
