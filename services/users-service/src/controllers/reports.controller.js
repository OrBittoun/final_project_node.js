const Report = require('../models/report.model');
const User = require('../models/user.model');
const axios = require('axios');

const getCostsByUserAndMonth = async (userId, year, month) => {
    try {
        const response = await axios.get(
            `${process.env.COSTS_SERVICE_URL}/api/costs`, //call cost service
            {
                params: {
                    userid: userId,
                    year,
                    month,
                },
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

const getMonthlyReport = async (userId, year, month) => {
    console.log('DEBUG getMonthlyReport called with:', { userId, year, month });

    if (!userId || !year || !month) {
        throw new Error('Missing required parameters');
    }

    const user = await User.findOne({ id: userId });
    if (!user) {
        throw new Error('User not found');
    }

    const costs = await getCostsByUserAndMonth(userId, year, month);
    console.log('DEBUG costs from costs service:', costs);

    const computedCosts = {
        food: [],
        health: [],
        housing: [],
        sports: [],
        education: [],
    };

    for (const cost of costs) {
        const { category, sum, description, date } = cost;
        if (computedCosts[category]) {
            computedCosts[category].push({
                sum,
                description,
                day: new Date(date).getDate(),
            });
        }
    }

    console.log('DEBUG computedCosts before save:', computedCosts);

    const report = await Report.findOneAndUpdate(
        { userid: userId, year, month },
        { userid: userId, year, month, costs: computedCosts },
        { new: true, upsert: true } //if it's new create one , else update the report
    );

    console.log('DEBUG report after save:', report);
    return report;
};

module.exports = {
    getMonthlyReport,
};
