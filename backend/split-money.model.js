const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SP = new Schema({
    SP_description: {
        type: String
    },
    SP_responsible: {
        type: String
    },
    SP_priority: {
        type: String
    },
    SP_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('SP', SP);