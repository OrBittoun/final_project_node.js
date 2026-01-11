const Log = require('../models/log.model');


const addLog = async (logData) => {// creating a log when user request something
    try {
        const log = new Log(logData);
        await log.save();
        return log;
    } catch (error) {
        console.error('Failed to create log:', error.message);
    }
};


const getAllLogs = async (req, res) => {//request from the user
    try {
        const logs = await Log.find(); // find the log
        res.json(logs); // http response
    } catch (error) {
        res.status(500).json({ // server response to the user if the server failed (500 - server)
            id: 'server could not get all logs',
            message: error.message
        });
    }
};

module.exports = {
    addLog,getAllLogs
};
