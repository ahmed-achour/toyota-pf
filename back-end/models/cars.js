const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    qr_code: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Car = mongoose.model("car", CarSchema);

module.exports = Car;