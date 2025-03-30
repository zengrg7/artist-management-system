const Song = require("../models/songModel");

exports.createSong = (req, res) => {
  Song.create(req.body, (err, song) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(song);
  });
};

exports.getAllSongs = (req, res) => {
  Song.getAll((err, songs) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(songs);
  });
};

exports.getSongById = (req, res) => {
  Song.getById(req.params.id, (err, song) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(song);
  });
};

exports.updateSong = (req, res) => {
  Song.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).json({});
  });
};

exports.deleteSong = (req, res) => {
  Song.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).json({});
  });
};
