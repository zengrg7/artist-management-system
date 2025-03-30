const db = require("../config/db");

const Artist = {
  create: (artistData, callback) => {
    const query =
      "INSERT INTO artists (name, dob, gender, address, first_release_year, no_of_albums_released) VALUES (?, ?, ?, ?, ?, ?)";
    db.run(
      query,
      [
        artistData.name,
        artistData.dob,
        artistData.gender,
        artistData.address,
        artistData.first_release_year,
        artistData.no_of_albums_released,
      ],
      function (err) {
        if (err) {
          return callback({ message: "Error creating artist", error: err });
        }
        callback(null, {
          message: "Artist created successfully",
          id: this.lastID,
        });
      }
    );
  },
  getAll: (callback) => {
    db.all("SELECT * FROM artists", [], (err, rows) => {
      if (err) {
        return callback({ message: "Error retrieving artists", error: err });
      }
      callback(null, { message: "Artists retrieved successfully", data: rows });
    });
  },
  getById: (id, callback) => {
    db.get("SELECT * FROM artists WHERE id = ?", [id], (err, row) => {
      if (err) {
        return callback({ message: "Error retrieving artist", error: err });
      }
      if (!row) {
        return callback({ message: "Artist not found" });
      }
      callback(null, { message: "Artist retrieved successfully", data: row });
    });
  },
  update: (id, artistData, callback) => {
    const query =
      "UPDATE artists SET name = ?, dob = ?, gender = ?, address = ?, first_release_year = ?, no_of_albums_released = ? WHERE id = ?";
    db.run(
      query,
      [
        artistData.name,
        artistData.dob,
        artistData.gender,
        artistData.address,
        artistData.first_release_year,
        artistData.no_of_albums_released,
        id,
      ],
      function (err) {
        if (err) {
          return callback({ message: "Error updating artist", error: err });
        }
        callback(null, { message: "Artist updated successfully" });
      }
    );
  },
  delete: (id, callback) => {
    db.run("DELETE FROM artists WHERE id = ?", [id], function (err) {
      if (err) {
        return callback({ message: "Error deleting artist", error: err });
      }
      callback(null, { message: "Artist deleted successfully" });
    });
  },
};

module.exports = Artist;
