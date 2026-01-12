const express = require('express');
const app = express();

require('dotenv').config();
const connectDB = require('./config/db');


const PORT = process.env.PORT || 3001;


const requestLogger = require('./middlewares/requestLogger');
//const costsRoutes = require('./routes/costs.routes');

app.use(requestLogger);
app.use(express.json());





//use('/api', costsRoutes);

connectDB();




app.get('/api/test', (req, res) => {
    res.json({ message: 'costs test ok' });
});



app.listen(PORT, () => {
    console.log(`Costs service running on port ${PORT}`);
});
