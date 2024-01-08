const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: {
        type: Array,
        required: true
    },
    total: Number,
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected', 'cancelled', 'on-delivery', 'delivered'],
        default: 'pending'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const setDefaultSearchFilter = function(next) {
    this.where({ isDeleted: false });
    next();
};

const setDefaultDeleteFilter = function(next) {
    this.isDeleted = true;
    this.save();
    next();
};

// Middlewares
orderSchema.pre(['find', 'findOne', 'findOneAndReplace', 'findOneAndUpdate'], setDefaultSearchFilter);

orderSchema.pre(['deleteOne', 'findOneAndDelete'], setDefaultDeleteFilter);

orderSchema.pre('deleteMany', function(next) {
    next(new Error('Deletion prevented for deleteMany.'));
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;