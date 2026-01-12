'use strict';

const express = require('express');
const router = express.Router();

const { addLog, getAllLogs } = require('../controllers/logs.controller');

router.post('/logs', async (req, res) => {
    try {
        const saved = await addLog(req.body);
        return res.status(201).json(saved);
    } catch (err) {
        const statusCode = Number(err.id) || 500;
        const message = err.message || 'Internal server error';
        return res.status(statusCode).json({ id: statusCode, message: message });
    }
});

router.get('/logs', async (req, res) => {
    try {
        const logs = await getAllLogs();
        return res.status(200).json(logs);
    } catch (err) {
        const statusCode = 500;
        const message = err.message || 'Internal server error';
        return res.status(statusCode).json({ id: statusCode, message: message });
    }
});

module.exports = router;
