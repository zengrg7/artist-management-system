const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");
const {
  authorizeRole,
  authenticateUser,
} = require("../middlewares/authMiddleware");

router.post(
  "/",
  authenticateUser,
  authorizeRole("artist_manager"),
  artistController.createArtist
);
router.get(
  "/",
  authenticateUser,
  authorizeRole("super_admin", "artist_manager"),
  artistController.getAllArtists
);
router.get(
  "/:id",
  authenticateUser,
  authorizeRole("artist_manager"),
  artistController.getArtistById
);
router.put(
  "/:id",
  authenticateUser,
  authorizeRole("artist_manager"),
  artistController.updateArtist
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeRole("artist_manager"),
  artistController.deleteArtist
);

module.exports = router;
