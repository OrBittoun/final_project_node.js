const Report = require('../models/report.model');

const getMonthlyReport = async (userId, year, month) => {
    if (!userId || !year || !month) {
        throw new Error('Missing required parameters');
    }

    const existingReport = await Report.findOne({
        userid: userId,
        year,
        month
    });

    if (existingReport) {
        return existingReport; //computed pattern - if the report is existing it will return
    }

    // else - we will create a new report

    const computedCosts = {
        food: [],
        health: [],
        housing: [],
        sports: [],
        education: []
    };

    const report = new Report({
        userid: userId,
        year,
        month,
        costs: computedCosts
    });

    await report.save();

    return report;
};

module.exports = {
    getMonthlyReport
};
