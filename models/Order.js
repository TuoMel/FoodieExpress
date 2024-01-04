const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurant: {
        type: Object,
        required: true,
        ref: 'Restaurant'
    },
    user: {
        type: Object,
        required: true,
        ref: 'User'
    },
    items: {
        type: Object,
        required: true,
        ref: 'MenuItem'
    },
    total: Number,
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected', 'delivered'],
        default: 'pending'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;