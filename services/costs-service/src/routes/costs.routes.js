<<<<<<< HEAD
'use strict';
=======
>>>>>>> origin/main

const express = require('express');
const { addCost } = require('../controllers/costs.controller');
const Cost = require('../models/cost.model');

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const saved = await addCost(req.body, { CostModel: Cost });
        return res.status(201).json(saved);
    } catch (err) {
        const statusCode = Number(err.id) || 500;
        const message = err.message || 'Internal server error';
        return res.status(statusCode).json({ id: statusCode, message: message });
    }
});


module.exports = router;

