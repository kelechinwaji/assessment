const User = require("../schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function registerUser(firstName, lastName, username, password) {
    
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    await user.save();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function loginUser(username, password) {
  console.log('here1');
  const user = await User.findOne({ username }).lean();
 
console.log('here');
  if (!user) {
    throw new Error("Authentication failed");
  }
  console.log('here2');
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Authentication failed");
  }
  console.log('here3');
  const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
 
  delete user.password
  console.log('here');
  return {token, user};
}

module.exports = {
  registerUser,
  loginUser,
};
