const mongoose = require('mongoose');

const TiffinAvailabilitySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    vegAvailable: {
        type: Boolean,
        default: false
    },
    nonVegAvailable: {
        type: Boolean,
        default: false
    },
    noTiffin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('TiffinAvailability', TiffinAvailabilitySchema);