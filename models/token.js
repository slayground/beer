var mongoose = require('mongoose');

// Define Token Schema
var TokenSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    }
})

// Export
module.exports = mongoose.model('Token', TokenSchema);