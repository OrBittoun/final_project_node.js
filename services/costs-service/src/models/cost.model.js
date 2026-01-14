'use strict';

const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const { Double } = mongoose.Schema.Types;


const costSchema = new mongoose.Schema(
    {
        description: { type: String, required: true, trim: true },

        category: {
            type: String,
            required: true,
            enum: ['food', 'health', 'housing', 'sports', 'education']
        },

        userid: { type: Number, required: true },

        sum: { type: Double, required: true, min: 0 },

        date: { type: Date, default: Date.now }
    },
    { versionKey: false }
);

module.exports = mongoose.model('Cost', costSchema);


