const Log = require('../models/log.model');


const addLog = async (logData) => {
    if (!logData || !logData.method || !logData.endpoint) {
        throw new Error('Missing required log fields');
    }
    const log = new Log(logData);
    await log.save();
    return log;
};



const getAllLogs = async () => {
    return Log.find({}).sort({ timestamp: -1 });// get all the logs from new to old, meaning the new ones will appear first
};

module.exports = {
    addLog,getAllLogs
};
