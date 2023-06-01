const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth"); // Make sure this path is correct
const userController = require("../controllers/userController");
const upload = require("../middleware/multer");
const User = require("../models/User"); // Add this line to import the User model

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put(
  "/:userId",
  authenticate,
  authorize(["admin"]),
  userController.updateUser
);
router.delete(
  "/:userId",
  authenticate,
  authorize(["admin"]),
  userController.deleteUser
);
router.get("/", authenticate, authorize(["admin"]), userController.getAllUsers);
// router.post(
//   "/:userId/profile-picture",
//   authenticate,
//   authorize(["admin", "manager", "agent"]),
//   upload.single("profilePicture"),
//   userController.updateProfilePicture
// );
router.get("/me", authenticate, userController.getCurrentUser);

router.post(
  "/:userId/profile-picture",
  authenticate, // Replace authMiddleware with authenticate
  authorize(["admin", "manager", "agent"]), // Add authorize with the allowed roles
  upload.single("profilePicture"),
  async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    user.profilePicture = req.file.filename; // Save only the filename
    await user.save();

    res.json(user);
  }
);

module.exports = router; // Make sure this line is present
