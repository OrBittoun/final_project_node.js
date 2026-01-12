const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3002;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Costs service running on port ${PORT}`);
});
