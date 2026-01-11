const express = require('express');
const usersRoutes = require('./routes/users.routes');
const reportsRoutes = require('./routes/reports.routes');

const app = express();

require('dotenv').config();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use((req, res, next) => { // validation
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api', usersRoutes);
app.use('/api', reportsRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Users service running on port ${PORT}`);
});