const express = require('express');
const usersRoutes = require('./routes/users.routes');
const reportsRoutes = require('./routes/reports.routes');
const requestLogger = require('./middleware/logger.middleware');


const app = express();

require('dotenv').config();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(requestLogger);



app.use('/api', usersRoutes);
app.use('/api', reportsRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Users service running on port ${PORT}`);
});