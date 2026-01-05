'use strict';

const mongoose = require('mongoose');

/*
  Log Model (MongoDB collection: logs)
  Will be used later for: logging every request + endpoint access.
*/
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
