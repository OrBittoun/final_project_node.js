'use strict';

const express = require('express');
require('dotenv').config();
const { connectToMongo } = require('./config/db');

<<<<<<< HEAD
const { connectToMongo } = require('./models/db');
const costsRoutes = require('./routes/costs.routes');

const app = express();


const PORT = process.env.PORT || 3002;

const requestLogger = require('./middlewares/requestLogger');
const costsRoutes = require('./routes/costs.routes');

app.use(requestLogger);
app.use(express.json());
app.use('/api', costsRoutes);

connectToMongo()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    });

app.get('/api/test', (req, res) => {
    res.json({ message: 'costs test ok' });
});

// connect to MongoDB once on service start
connectToMongo();

// mount routes under /api
app.use('/api', costsRoutes);

app.listen(PORT, () => {
    console.log(`Costs service running on port ${PORT}`);
});