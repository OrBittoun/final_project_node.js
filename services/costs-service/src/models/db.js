'use strict';

const mongoose = require('mongoose');

// Connect to MongoDB using MONGODB_URI from .env
async function connectToMongo() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('Missing MONGODB_URI in .env');
    }

    // If Atlas is unreachable, fail fast (prevents "stuck" runs)
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    return mongoose.connection;
}

// Disconnect from MongoDB
async function disconnectFromMongo() {
    await mongoose.disconnect();
}

module.exports = { connectToMongo, disconnectFromMongo };


/*
מתחבר ל־MongoDB דרך MONGODB_URI

אם אין משתנה בסביבה → זורק שגיאה ברורה

מנתק בסוף (כדי שהריצה לא תיתקע)
 */