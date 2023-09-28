const mongoose = require('mongoose');
const hoursSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  days: [
    {
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      day: {
        type: String,
        required: true,
      },
      hours: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Hours', hoursSchema);
