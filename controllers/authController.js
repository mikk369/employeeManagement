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
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        error: 'Please provide email and password',
      });
    }

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Username or password incorrect',
      });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Username or password incorrect',
      });
    }

    // if ok, send token
    const token = signToken(user._id, user.username);
    // put token into cookie
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    // removes password from output
    user.password = undefined;

    // set token to headers
    res.set('Authorization', `Bearer ${token}`);

    // sends response
    return res.status(200).json({
      message: 'User logged in!',
      token,
      user: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // Check if the JWT token exists in the cookies
    if (!req.cookies.jwt) {
      return res.status(401).json({ error: 'You are not logged in! Please log in to get access.' });
    }

    // Verify the JWT token
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Check if the user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res
        .status(401)
        .json({ error: 'The user belonging to this token does no longer exist.' });
    }

    // Grant access to the protected route and attach user data to the request
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token. Please log in again.' });
  }
};
