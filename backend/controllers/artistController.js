const Artist = require("../models/artistModel");

exports.createArtist = (req, res) => {
  Artist.create(req.body, (err, artist) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(artist);
  });
};

exports.getAllArtists = (req, res) => {
  Artist.getAll((err, artists) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(artists);
  });
};

exports.getArtistById = (req, res) => {
  Artist.getById(req.params.id, (err, artist) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(artist);
  });
};

exports.updateArtist = (req, res) => {
  Artist.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).json({});
  });
};

exports.deleteArtist = (req, res) => {
  Artist.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).json({});
  });
};
