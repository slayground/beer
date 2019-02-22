var mongoose = require('mongoose');

// Beer Schema
var BeerSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number
})

module.exports = mongoose.model('Beer', BeerSchema);