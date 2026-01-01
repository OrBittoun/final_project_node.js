'use strict';

const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const { Double } = mongoose.Schema.Types;

/*
  Cost Model (MongoDB collection: costs)
  Required fields per project:
  description (String), category (String), userid (Number), sum (Double)
  date (Date) is used so the server can default to "now" when not provided.
*/
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


/*
מגדיר Schema בדיוק לפי הדרישות (כולל enum לקטגוריות)

sum נשמר כ־Double

מוסיף date אוטומטי “עכשיו” אם לא נשלח תאריך (כמו בדרישה)
 */