const User = require("../models/userModel");

exports.createUser = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(user);
  });
};

exports.getAllUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(users);
  });
};

exports.getUserById = (req, res) => {
  User.getById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(user);
  });
};

exports.updateUser = (req, res) => {
  User.update(req.params.id, req.body, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(user);
  });
};

exports.deleteUser = (req, res) => {
  User.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).json({});
  });
};

exports.logInUser = (req, res) => {
  User.login(req.body.email, req.body.password, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(user);
  });
};
