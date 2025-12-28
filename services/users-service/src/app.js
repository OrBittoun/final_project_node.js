const express = require('express');
const app = express();

require('dotenv').config();
const connectDB = require('./config/db');


const PORT = process.env.PORT || 3002;

app.use(express.json());

connectDB();


app.listen(PORT, () => {
    console.log(`Users service running on port ${PORT}`);
});
