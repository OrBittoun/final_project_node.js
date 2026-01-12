const express = require('express');
const app = express();

require('dotenv').config();
const connectDB = require('./config/db');


const PORT = process.env.PORT || 3001;


const requestLogger = require('./middlewares/requestLogger');
//const usersRoutes = require('./routes/users.routes');

app.use(express.json());

app.use(requestLogger);

//use('/api', userRoutes);

connectDB();


app.listen(PORT, () => {
    console.log(`Users service running on port ${PORT}`);
});
