const fetch = require('node-fetch');

const getCostsByUserAndMonth = async (userId, year, month) => {
    const url = `${process.env.COSTS_SERVICE_URL}/api/costs?userid=${userId}&year=${year}&month=${month}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch costs from costs-service');
    }

    return response.json();
};

module.exports = {
    getCostsByUserAndMonth
};
