'use strict';

const mongoose = require('mongoose');

async function connectToMongo() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('Missing MONGODB_URI in .env');
    }

    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    return mongoose.connection;
}

async function disconnectFromMongo() {
    await mongoose.disconnect();
}

module.exports = { connectToMongo, disconnectFromMongo };
