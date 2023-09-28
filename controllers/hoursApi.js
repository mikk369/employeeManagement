const Hours = require('../models/hoursModel');

exports.getAllhours = async (req, res, next) => {
  try {
    const hours = await Hours.find();
    res.status(200).json({
      status: 'success',
      results: hours.length,
      data: {
        hours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createHours = async (req, res, next) => {
  try {
    const newHour = await Hours.create(req.body);
    res.status(201).json({
      status: 200,
      hour: newHour,
    });
  } catch (error) {
    res.status(411).json({ error: 'One or more required fields empty' });
  }
};

exports.getHour = async (req, res, next) => {
  const hours = await Hours.findById(req.params.id);
  if (!hours) {
    return next('hours with given ID not found', 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      hours,
    },
  });
};
