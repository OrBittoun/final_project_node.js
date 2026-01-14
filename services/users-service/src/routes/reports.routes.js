const express = require('express');
const router = express.Router();

const { getMonthlyReport } = require('../controllers/reports.controller');


router.get('/report', async (req, res) => {
    try {
        //converting the type from string to Number as expected by the schema
        const userid = Number(req.query.userid);
        const year = Number(req.query.year);
        const month = Number(req.query.month);

        if (!userid || !year || !month) {
            return res.status(400).json({ //client side error
                message: 'userid, year and month are required'
            });
        }

        const report = await getMonthlyReport(userid, year, month);
        res.json(report);
    } catch (err) {
        res.status(500).json({ //server side error
            message: err.message
        });
    }
});

module.exports = router;
