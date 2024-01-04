const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    address: Object,
    coordinates: Array,
    phone: String,
    email: String,
    website: String,
    rating: Number,
    hours: Object,
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;