const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
    res.json({
        team: [
            { first_name: 'Or', last_name: 'Bittoun' },
            { first_name: 'Odelya', last_name: 'Datski' },
            { first_name: 'Yahav', last_name: 'Peretz' }
        ]
    });
});

module.exports = router;
