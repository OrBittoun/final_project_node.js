
const Log = require('../models/log.model');

/* ++c Create an Error object that includes an HTTP-like id (required by project) */
function makeError(id, message) {
    const err = new Error(message);
    err.id = id;
    return err;
}

/* ++c Validate and normalize a log object before saving it */
function buildLogDoc(input) {
    if (!input || typeof input !== 'object') {
        throw makeError(400, 'Missing request body');
    }

    const method = String(input.method || '').trim().toUpperCase();
    const endpoint = String(input.endpoint || '').trim();

    if (!method) {
        throw makeError(400, 'Missing method');
    }

    if (!endpoint) {
        throw makeError(400, 'Missing endpoint');
    }

    const doc = { method, endpoint };

    // ++c status is optional, but if provided it must be a valid number
    if (input.status !== undefined && input.status !== null) {
        const status = Number(input.status);
        if (!Number.isFinite(status)) {
            throw makeError(400, 'Invalid status');
        }
        doc.status = status;
    }

    // ++c message is optional
    if (input.message !== undefined && input.message !== null) {
        doc.message = String(input.message).trim();
    }

    // ++c timestamp is optional; if invalid -> error; if missing -> schema default will be used
    if (input.timestamp !== undefined && input.timestamp !== null) {
        const ts = new Date(input.timestamp);
        if (Number.isNaN(ts.getTime())) {
            throw makeError(400, 'Invalid timestamp');
        }
        doc.timestamp = ts;
    }

    return doc;
}

/* ++c Add a new log record into MongoDB */
async function addLog(logData) {
    const doc = buildLogDoc(logData);
    return Log.create(doc);
}

/* ++c Return all logs, newest first (useful for GET /api/logs later) */
async function getAllLogs() {
    return Log.find({}).sort({ timestamp: -1 });
}

module.exports = { addLog, getAllLogs };
