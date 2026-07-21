const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const generateOTP = require("../../utils/generateOTP");
const sendOTPEmail = require("../../services/emailService");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

const userResolvers = {
  Query: {
    me: async (_, __, context) => {
      return context.user;
    },
  },

  Mutation: {
    signup: async (_, { name, email, password }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = generateToken(user);

      return {
        token,
        user,
      };
    },

    signin: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
      const otp = generateOTP();
      user.loginOTP = otp;
      user.loginOTPExpires = new Date(Date.now() + 5 * 60 * 1000); // otp expires in 5 min
      user.otpAttempts = 0;
      user.lastOTPSentAt = new Date();

      await user.save();
      await sendOTPEmail(
          user.email,
          otp,
          user.name
      );

      return {
        success: true,
        message: "OTP sent successfully",
        requiresOTP: true,
      };
    },
    verifyLoginOTP: async (_, { email, otp }) => {
      console.log("Email received:", email);
      console.log("OTP received:", otp);
      const user = await User.findOne({ email });
      console.log(user, "user");
      if (!user) {
        throw new Error("User not found");
      }

      // Check OTP exists
      if (!user.loginOTP) {
        throw new Error("OTP not found");
      }

      // Check expiry
      if (new Date() > user.loginOTPExpires) {
        throw new Error("OTP has expired");
      }

      // Verify OTP
      if (user.loginOTP !== otp) {
        user.otpAttempts += 1;
        await user.save();

        throw new Error("Invalid OTP");
      }

      // OTP verified

      user.loginOTP = null;
      user.loginOTPExpires = null;
      user.otpAttempts = 0;

      await user.save();

      const token = generateToken(user);

      return {
        token,
        user,
      };
    },
  },
};

module.exports = userResolvers;
