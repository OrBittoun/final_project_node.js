const express = require('express');
const costsRoutes = require('./routes/costs.routes');
const { connectToMongo } = require('./config/db');
const requestLogger = require('./middlewares/requestLogger');



const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3002;


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

app.listen(PORT, () => {
    console.log(`Costs service running on port ${PORT}`);
});