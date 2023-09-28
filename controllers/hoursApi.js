const Hours = require('../models/hoursModel');

exports.createHours = async (req, res, next) => {
  try {
    const newHour = await Hours.create(req.body);
    res.status(201).json({
      status: 200,
      hour: newHour,
    });
  } catch (error) {
    res.status(400).json({ error: 'required fields are not filled or in invalid format' });
  }
};
