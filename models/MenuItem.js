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

// Middlewares
menuItemSchema.pre(['find', 'findOne', 'findOneAndReplace', 'findOneAndUpdate'], setDefaultSearchFilter);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;