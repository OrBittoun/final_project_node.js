const express = require('express');
const Cost = require('../models/cost.model');
const { addCost, getCostsByUserMonth } = require('../controllers/costs.controller');

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'costs test ok' });
});

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


router.get('/report', async (req, res) => {
    try {

        const userid = req.query.id || req.query.userid;
        const { year, month } = req.query;

        if (!userid || !year || !month) {
            return res.status(400).json({
                id: 400,
                message: 'userid (or id), year and month are required'
            });
        }

        const costs = await getCostsByUserMonth(
            userid,
            year,
            month,
            { CostModel: Cost }
        );

        res.json(costs);

    } catch (err) {
        res.status(500).json({
            id: 500,
            message: err.message || 'Internal server error'
        });
    }
});

module.exports = router;