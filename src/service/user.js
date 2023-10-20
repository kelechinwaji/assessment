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

  const user = await User.findOne({ username }).lean();
 

  if (!user) {
    throw new Error("Authentication failed");
  }
  
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Authentication failed");
  }

  const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
 
  delete user.password

  return {token, user};
}

module.exports = {
  registerUser,
  loginUser,
};
