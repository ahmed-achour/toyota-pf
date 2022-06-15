const mongoose = require("mongoose");

const PapperSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    client_id: {
        type: String,
        required: true
    },content:{
        type: String,
        required: true 
    }
});

const Papper = mongoose.model("papper", PapperSchema);

module.exports = Papper;
