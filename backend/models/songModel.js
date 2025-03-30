const db = require("../config/db");

const Song = {
  create: (songData, callback) => {
    const query =
      "INSERT INTO songs (artist_id, title, album_name, genre) VALUES (?, ?, ?, ?)";
    db.run(
      query,
      [songData.artist_id, songData.title, songData.album_name, songData.genre],
      function (err) {
        if (err) {
          return callback({ message: "Error creating song", error: err });
        }
        callback(null, {
          message: "Song created successfully",
          id: this.lastID,
        });
      }
    );
  },
  getAll: (callback) => {
    db.all(
      "SELECT songs.*, artists.name AS artist FROM songs JOIN artists ON songs.artist_id = artists.id",
      [],
      (err, rows) => {
        if (err) {
          return callback({ message: "Error retrieving songs", error: err });
        }
        callback(null, { message: "Songs retrieved successfully", data: rows });
      }
    );
  },
  getById: (id, callback) => {
    db.get("SELECT * FROM songs WHERE id = ?", [id], (err, row) => {
      if (err) {
        return callback({ message: "Error retrieving song", error: err });
      }
      if (!row) {
        return callback({ message: "Song not found" });
      }
      callback(null, { message: "Song retrieved successfully", data: row });
    });
  },
  update: (id, songData, callback) => {
    const query =
      "UPDATE songs SET title = ?, album_name = ?, genre = ? WHERE id = ?";
    db.run(
      query,
      [songData.title, songData.album_name, songData.genre, id],
      function (err) {
        if (err) {
          return callback({ message: "Error updating song", error: err });
        }
        callback(null, { message: "Song updated successfully" });
      }
    );
  },
  delete: (id, callback) => {
    db.run("DELETE FROM songs WHERE id = ?", [id], function (err) {
      if (err) {
        return callback({ message: "Error deleting song", error: err });
      }
      callback(null, { message: "Song deleted successfully" });
    });
  },
};

module.exports = Song;
