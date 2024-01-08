const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isSeasonal: {
        type: Boolean,
        default: false
    },
    seasonalPeriods: [{
        startDate: Date,
        endDate: Date
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;