
const express = require('express');
require('dotenv').config();

const { connectToMongo } = require('./config/db');

const requestLogger = require('./middlewares/requestLogger');
const costsRoutes = require('./routes/costs.routes');

const app = express();

/* ++c Log every HTTP request (required by project: log each request + endpoint access) */
app.use(requestLogger);

/* ++c Parse JSON bodies */
app.use(express.json());

/* ++c Mount the costs endpoints under /api (e.g., /api/add, /api/report) */
app.use('/api', costsRoutes);

/* ++c Optional health-check endpoint */
app.get('/api/test', (req, res) => {
    res.json({ message: 'costs service ok' });
});

const PORT = process.env.PORT || 3002;

/* ++c Connect to MongoDB once when the service starts */
connectToMongo()
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Costs service running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error.message || error);
        // ++c Do not exit the process abruptly; allow environment to restart if needed
    });
