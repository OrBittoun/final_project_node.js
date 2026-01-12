const express = require('express');

require('dotenv').config();

const connectDB = require('./config/db');
const logsRoutes = require('./routes/logs.routes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api', logsRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Logs service running on port ${PORT}`);
});
