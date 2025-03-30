const db = require("../config/db");
const {
  hashPassword,
  comparePassword,
  tokenize,
  detokenize,
} = require("../lib/utils");

const User = {
  create: async (userData, callback) => {
    try {
      // Check if the email already exists
      const queryForEmail = "SELECT * FROM users WHERE email = ?";
      const existingUser = await new Promise((resolve, reject) => {
        db.get(queryForEmail, [userData.email], (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });

      if (existingUser) {
        return callback({ message: "Email already exists" });
      }

      // Hash the password
      const hashedPassword = await hashPassword(userData.password);

      // Insert the new user into the database
      const query =
        "INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

      db.run(
        query,
        [
          userData.first_name,
          userData.last_name,
          userData.email,
          hashedPassword,
          userData.phone,
          userData.dob,
          userData.gender,
          userData.address,
          userData.role,
        ],
        function (err) {
          if (err) {
            return callback({ message: "Error creating user", error: err });
          }
          callback(null, {
            message: "User created successfully",
            id: this.lastID,
          });
        }
      );
    } catch (error) {
      return callback({ message: "Database error", error });
    }
  },
  getAll: (callback) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) {
        return callback({ message: "Error retrieving users", error: err });
      }
      callback(null, { message: "Users retrieved successfully", data: rows });
    });
  },
  getById: (id, callback) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) {
        return callback({ message: "Error retrieving user", error: err });
      }
      if (!row) {
        return callback({ message: "User not found" });
      }
      callback(null, { message: "User retrieved successfully", data: row });
    });
  },
  update: (id, userData, callback) => {
    const query =
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, phone = ?, dob = ?, gender = ?, address = ?, role = ? WHERE id = ?";

    db.run(
      query,
      [
        userData.first_name,
        userData.last_name,
        userData.email,
        userData.password,
        userData.phone,
        userData.dob,
        userData.gender,
        userData.address,
        userData.role,
        id,
      ],
      function (err) {
        if (err) {
          return callback({ message: "Error updating user", error: err });
        }
        callback(null, { message: "User updated successfully" });
      }
    );
  },
  delete: (id, callback) =>
    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
      if (err) {
        return callback({ message: "Error deleting user", error: err });
      }
      callback(null, { message: "User deleted successfully" });
    }),

  login: (email, password, callback) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
      if (err) {
        return callback({ message: "Error retrieving user", error: err });
      }
      if (!row) {
        return callback({ message: "User not found" });
      }
      const passwordMatch = await comparePassword(password, row.password);
      if (!passwordMatch) {
        return callback({ message: "Incorrect Credentials" });
      }
      callback(null, {
        message: "Correct Credentials",
        data: {
          token: tokenize({
            id: row.id,
            role: row.role,
            email: row.email,
            first_name: row.first_name,
            last_name: row.last_name,
          }),
        },
      });
    });
  },
};

module.exports = User;
