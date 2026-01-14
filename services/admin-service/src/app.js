const express = require('express');
const requestLogger = require('./middleware/logger.middleware');
const aboutRoutes = require('./routes/about.routes');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(requestLogger);

app.use('/api', aboutRoutes);

app.listen(process.env.PORT || 3004, () => {
    console.log('Admin service running on port', process.env.PORT || 3004);
});
