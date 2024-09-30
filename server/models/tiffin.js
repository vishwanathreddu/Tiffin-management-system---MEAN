const mongoose = require('mongoose');

const TiffinSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    vegOrNonVeg: {
        type: String,
        enum: ['veg', 'non-veg'],
        required: true
    },
    chapatis: {
        type: Number,
        required: true
    },
    sabji: {
        type: Boolean,
        default: false
    },
    floor: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending'
    }
});

//Unique Tiffin Marking per Day
TiffinSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Tiffin', TiffinSchema);
