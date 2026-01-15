const Report = require('../models/report.model');
const User = require('../models/user.model');
const axios = require('axios');


const getMonthlyReport = async (userId, year, month) => {
    if (!userId || !year || !month) {
        throw new Error('Missing required parameters');
    }

    const user = await User.findOne({ id: userId });

    if (!user) {
        throw new Error('User not found');
    }


    const existingReport = await Report.findOne({
        userid: userId,
        year,
        month
    });

    if (existingReport) {
        return existingReport; //computed pattern - if the report is existing it be will return immediately
    }

    // else - we will create a new report

    const getCostsByUserAndMonth = async (userId, year, month) => {
        try {
            const response = await axios.get(
                `${process.env.COSTS_SERVICE_URL}/api/costs`,
                {
                    params: {
                        userid: userId,
                        year,
                        month
                    }
                }
            );

            return response.data;
        } catch (err) {
            if (err.response && err.response.status === 404) {
                return [];
            }
            throw new Error('Costs service unavailable');
        }
    };

    const costs = await getCostsByUserAndMonth(userId, year, month);

    const computedCosts = {
        food: [],
        health: [],
        housing: [],
        sports: [],
        education: []
    };

    for (const cost of costs) {
        const { category, sum, description, date } = cost;

        if (computedCosts[category]) {
            computedCosts[category].push({
                sum,
                description,
                day: new Date(date).getDate()
            });
        }
    }


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
