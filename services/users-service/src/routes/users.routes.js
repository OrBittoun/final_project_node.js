const express = require('express');
const router = express.Router();

const { addUser, getUserDetails, getAllUsers} = require('../controllers/users.controller');


router.post('/add', async (req, res) => {
    try {
        const user = await addUser(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});


router.get('/users/:id', async (req, res) => {
    try {
        const userId = Number(req.params.id); //converting the type from string to Number as expected by the schema
        const details = await getUserDetails(userId);
        res.json(details);
    }
    catch (err) {
        res.status(404).json({ //400 - client side error
            message: err.message
        });
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ // 500 - server side error
            message: err.message
        });
    }
});

module.exports = router;
