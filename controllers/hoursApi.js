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

exports.updateHours = async (req, res, next) => {
  try {
    // Check if the document with the given ID exists
    const existingHour = await Hours.findById(req.params.id);

    if (!existingHour) {
      return res.status(404).json({
        status: 'fail',
        message: 'No document with the given ID',
      });
    }

    const hour = await Hours.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      status: 'success',
      data: {
        hour,
      },
    });
  } catch (err) {
    res.status(400).json({
      message:
        'Request body does not contain required fields or required fields are in an invalid format',
    });
  }
};

exports.deleteHour = async (req, res, next) => {
  try {
    const deletedHour = await Hours.findByIdAndDelete(req.params.id);
    if (!deletedHour) {
      // Document with the given ID was not found
      res.status(404).json({
        status: 'fail',
        message: 'No document with the given ID',
      });
    } else {
      // Successful deletion
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
