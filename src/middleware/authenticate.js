const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async ({ req }) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return { user: null };
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return { user: null };
    }

    return { user };
  } catch (error) {
    return { user: null };
  }
};

module.exports = auth;