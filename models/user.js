const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Defining the User schema
var UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true
    },
    mobile: {
        type: Number
      }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Get user data by email
module.exports.getUserByEmail = async function (email) {
  try {
    const user = await User.findOne({ 'email': email });
    return user;
  } catch (error) {
    throw error;
  }
};

// Get user data by id 
module.exports.getUserById = async function (_id) {
  try {
    const user = await User.findOne({ '_id': _id });
    return user;
  } catch (error) {
    throw error;
  }
};

// Add a new user
module.exports.addUser = async (newUser) => {
  const hashedPassword = await bcrypt.hash(newUser.password.trim(), 10);
  try {
    newUser.password = hashedPassword;
    newUser.email = newUser.email.trim();
    
    const user = new User(newUser);
    const result = await user.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Compare password in db
module.exports.comparePassword = async function (password, dbPassword) {
  try {
    const isMatched = await bcrypt.compare(password.trim(), dbPassword);
    return isMatched;
  } catch (error) {
    throw error;
  }
};