const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { OAuth2Client } = require("google-auth-library");

// exports.googleLogin = async (req, res) => {
//   const { tokenId } = req.body;

//   try {
//     const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//     const ticket = await client.verifyIdToken({
//       idToken: tokenId,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const {
//       email_verified,
//       name,
//       email,
//       sub: googleId,
//       picture,
//     } = ticket.getPayload();

//     if (!email_verified) {
//       return res.status(400).json({ message: "Email not verified" });
//     }

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = new User({
//         username: name,
//         email,
//         password: await bcrypt.hash(googleId, 10),
//         googleId,
//         profilePicture: picture,
//       });

//       await user.save();
//     }

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.status(200).json({
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         profilePicture: user.profilePicture,
//       },
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in with Google", error });
//   }
// };
exports.getAllUsers = async (req, res) => {
  console.log("getAllUsers called"); // Add this line

  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const newUser = new User({ username, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};
exports.updateUser = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
exports.updateProfilePicture = async (req, res) => {
  const { userId } = req.params;
  console.log("Received request to update profile picture for user:", userId); // Add this line

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const profilePicture = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile picture updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile picture", error });
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select("-password");
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ message: "Error fetching current user", error });
  }
};
