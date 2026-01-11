'use strict';

const express = require('express');
require('dotenv').config();

const { connectToMongo } = require('./models/db');
const costsRoutes = require('./routes/costs.routes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

// connect to MongoDB once on service start
connectToMongo();

// mount routes under /api
app.use('/api', costsRoutes);

app.listen(PORT, () => {
    console.log(`Costs service running on port ${PORT}`);
});
