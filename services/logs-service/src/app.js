const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3004;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Users service running on port ${PORT}`);
});
