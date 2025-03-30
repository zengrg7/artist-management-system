const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");
const {
  authenticateUser,
  authorizeRole,
} = require("../middlewares/authMiddleware");

router.post(
  "/",
  authenticateUser,
  authorizeRole("artist"),
  songController.createSong
);
router.get(
  "/",
  authenticateUser,
  authorizeRole("super_admin", "artist_manager", "artist"),
  songController.getAllSongs
);
router.get(
  "/:id",
  authenticateUser,
  authorizeRole("artist"),
  songController.getSongById
);
router.put(
  "/:id",
  authenticateUser,
  authorizeRole("artist"),
  songController.updateSong
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeRole("artist"),
  songController.deleteSong
);

module.exports = router;
