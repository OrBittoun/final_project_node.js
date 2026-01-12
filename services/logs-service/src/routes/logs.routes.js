const express = require('express');
const router = express.Router();
const { addLog, getAllLogs } = require('../controllers/logs.controller');

router.post('/logs', async (req, res) => {
    try {
        const saved = await addLog(req.body);
        res.json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

router.get('/logs', async (req, res) => {
    try {
        const logs = await getAllLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;



