const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    userid: {
        type: Number,
        required: true,
    },

    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },

    costs: {
        type: Schema.Types.Mixed,
        required: true,
    },

}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema); //creating the model

module.exports = Report;