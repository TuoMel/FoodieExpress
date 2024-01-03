const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: String,
    address: Object,
    coordinates: Array,
    phone: String,
    email: String,
    website: String,
    description: String,
    rating: Number,
    hours: Object
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;