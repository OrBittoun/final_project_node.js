'use strict';

const ALLOWED_CATEGORIES = ['food', 'health', 'housing', 'sports', 'education'];

/*
  Error object format required by the project:
  must include at least: { id, message }
  We also attach "status" to help routes later decide HTTP status codes.
*/
function buildError(id, message, status) {
    const err = new Error(message);
    err.id = id;
    err.message = message;
    err.status = status || 400;
    return err;
}

function isNonEmptyString(val) {
    return typeof val === 'string' && val.trim().length > 0;
}

function toNumber(val) {
    const n = Number(val);
    return Number.isFinite(n) ? n : NaN;
}

/*
  Validation rules for adding a cost:
  - description: non-empty string
  - category: one of the allowed categories
  - userid: finite number
  - sum: finite number >= 0 (Double is enforced by schema, but we validate input too)
  - date (optional): if provided, must NOT be in the past (server rule)
*/
function validateAddCostInput(input, nowDate) {
    const now = nowDate || new Date();

    if (!input || typeof input !== 'object') {
        throw buildError(400, 'Invalid request body', 400);
    }

    if (!isNonEmptyString(input.description)) {
        throw buildError(400, 'Missing or invalid description', 400);
    }


    if (!isNonEmptyString(input.category) || !ALLOWED_CATEGORIES.includes(input.category)) {
        throw buildError(400, 'Missing or invalid category', 400);
    }

    const userid = toNumber(input.userid);
    if (!Number.isFinite(userid)) {
        throw buildError(400, 'Missing or invalid userid', 400);
    }

    const sum = toNumber(input.sum);
    if (!Number.isFinite(sum) || sum < 0) {
        throw buildError(400, 'Missing or invalid sum', 400);
    }

    let date;
    if (input.date === undefined || input.date === null || input.date === '') {
        date = now; // if not provided -> "request received time"
    } else {
        date = new Date(input.date);
        if (Number.isNaN(date.getTime())) {
            throw buildError(400, 'Invalid date', 400);
        }
        if (date.getTime() < now.getTime()) {
            // server does not allow adding costs in the past
            throw buildError(400, 'Cost date cannot be in the past', 400);
        }
    }

    return {
        description: input.description.trim(),
        category: input.category,
        userid,
        sum,
        date
    };
}

/*
  addCost
  - Pure business logic (no Express).
  - Receives dependencies to keep it testable:
    deps.CostModel: mongoose model (required)
    deps.createLog: optional function to create a log (Yahav will implement in logs.controller.js later)
    deps.now: optional function returning Date (useful for tests)
*/
async function addCost(input, deps) {
    if (!deps || !deps.CostModel) {
        throw buildError(500, 'Missing CostModel dependency', 500);
    }

    const now = deps.now ? deps.now() : new Date();
    const costData = validateAddCostInput(input, now);

    let created;
    try {
        created = await deps.CostModel.create(costData);
    } catch (e) {
        throw buildError(500, 'Database error while creating cost', 500);
    }

    // optional logging (controller-level log; request-level logging will be middleware later)
    if (typeof deps.createLog === 'function') {
        try {
            await deps.createLog({
                method: 'POST',
                endpoint: '/api/add',
                status: 201,
                message: 'Cost created'
            });
        } catch (e) {
            // do not fail the main operation if logging fails
        }
    }

    // Return plain object (good for tests and later routes)
    return created.toObject ? created.toObject() : created;
}

/*
  Helper for other controllers (users/reports) to reuse:
  Returns all costs for a given userid in a given month/year.
  (Or can use this inside reports.controller.js)
*/
async function getCostsByUserMonth(userid, year, month, deps) {
    if (!deps || !deps.CostModel) {
        throw buildError(500, 'Missing CostModel dependency', 500);
    }

    const uid = toNumber(userid);
    const y = toNumber(year);
    const m = toNumber(month);

    if (!Number.isFinite(uid) || !Number.isFinite(y) || !Number.isFinite(m) || m < 1 || m > 12) {
        throw buildError(400, 'Invalid userid/year/month', 400);
    }

    const start = new Date(y, m - 1, 1, 0, 0, 0, 0);
    const end = new Date(y, m, 1, 0, 0, 0, 0);

    try {
        return await deps.CostModel.find({
            userid: uid,
            date: { $gte: start, $lt: end }
        }).lean();
    } catch (e) {
        throw buildError(500, 'Database error while fetching costs', 500);
    }
}

/*
  Helper: total cost per user (useful for /api/users/:id in users.controller.js)
*/
async function getTotalCostByUser(userid, deps) {
    if (!deps || !deps.CostModel) {
        throw buildError(500, 'Missing CostModel dependency', 500);
    }

    const uid = toNumber(userid);
    if (!Number.isFinite(uid)) {
        throw buildError(400, 'Invalid userid', 400);
    }

    try {
        const rows = await deps.CostModel.find({ userid: uid }).lean();
        return rows.reduce((acc, c) => acc + (Number(c.sum) || 0), 0);
    } catch (e) {
        throw buildError(500, 'Database error while calculating total', 500);
    }
}

module.exports = {
    addCost,
    getCostsByUserMonth,
    getTotalCostByUser
};
