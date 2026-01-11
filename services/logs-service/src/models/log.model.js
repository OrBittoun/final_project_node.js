'use strict';

const mongoose = require('mongoose');


const logSchema = new mongoose.Schema(
    {
        method: { type: String, required: true, trim: true },
        endpoint: { type: String, required: true, trim: true },
        timestamp: { type: Date, default: Date.now },
        status: { type: Number },
        message: { type: String, trim: true }
    },
    { versionKey: false }
);

module.exports = mongoose.model('Log', logSchema);
