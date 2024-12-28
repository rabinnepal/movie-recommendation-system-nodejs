const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/dotenv");

const User = require("../models/user");

const registerUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      fullName,
      password: hashedPassword,
    });
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    };
  } catch (error) {
    throw new Error("User registration failed: " + error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });
    return {
      token,
      user: { id: user.id, username: user.username, email: user.email },
    };
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
};

module.exports = { registerUser, loginUser };
