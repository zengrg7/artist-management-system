const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  authenticateUser,
  authorizeRole,
} = require("../middlewares/authMiddleware");

router.post(
  "/",
  authenticateUser,
  authorizeRole("super_admin"),
  userController.createUser
);
router.get(
  "/",
  authenticateUser,
  authorizeRole("super_admin"),
  userController.getAllUsers
);
router.get(
  "/:id",
  authenticateUser,
  authorizeRole("super_admin"),
  userController.getUserById
);
router.put(
  "/:id",
  authenticateUser,
  authorizeRole("super_admin"),
  userController.updateUser
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeRole("super_admin"),
  userController.deleteUser
);
router.post("/login", userController.logInUser);

module.exports = router;
