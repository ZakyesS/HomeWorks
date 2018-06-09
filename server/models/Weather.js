const mongoose = require('mongoose');

const Weather =  mongoose.model('Weather', {
    address: {
        type: String,
        required: false,
        minlength: 1,
        trim: true,
    },
    latitude: {
        type: Number,
        required: false,
    },
    longitude: {
        type: Number,
        required: false,
    },
    currentlyTemperature: {
        type: Number,
        required: false,
    },
    apparentTemperature: {
        type: Number,
        required: false,
    },
    consulTime: {
        type: Number,
        default: null,
    },
    consultUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
});

module.exports = {Weather};