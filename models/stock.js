const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    qte: {
        type: Number,
        required: true
    },
    prix: {
        type: Number,
        required: true
    }
});

const Stock = mongoose.model("stock", StockSchema);

module.exports = Stock;