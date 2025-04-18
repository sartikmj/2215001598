const { calculateAverage } = require('../utils/calculator');

const getAverage = (req, res) => {
    const { numbers } = req.body;

    if (!numbers || !Array.isArray(numbers)) {
        return res.status(400).json({ error: "Invalid input. 'numbers' must be an array." });
    }

    try {
        const average = calculateAverage(numbers);
        res.status(200).json({ average });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAverage };