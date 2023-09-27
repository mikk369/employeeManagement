const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

//token function so dont have to repeat code
const signToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: 1 * 24 * 60 * 60 * 1000,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // check if email is valid
    const checkEmail = /\S+@\S+\.\S+/;
    if (!checkEmail.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    // check if password is at least 8 characters
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    // create new user
    const newUser = await User.create({ username, email, password });
    //token
    const token = signToken(newUser.user_id);
    return res.status(201).json({ message: 'User created successfully', token, user: newUser });
  } catch (error) {
    return next(error);
  }
};
