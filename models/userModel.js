const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  // 'this' refers to the current user document being saved
  if (!this.isModified('password')) {
    return next(); // If password is not modified, no need to rehash it
  }

  try {
    // Hash the password with a cost factor of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword; // Replace plain password with hashed password
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
