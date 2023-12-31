const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();
const User = require('../../models/User');

// POST request for signup action
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  User.findOne({ username })
    .then(existingUser => {
      if (existingUser) {
        res.status(500)
        return res.json({ message: 'Username already exists' });
      }

      // Hash the password
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) {
          res.status(500)
          return res.json({ message: 'Error hashing password' });
        }

        // Create a new user
        const newUser = new User({
          username,
          password: hash
        });

        // Save the user to the database
        newUser.save()
          .then(() => {
            res.json({});
          })
          .catch(() => {
            res.status(500)
            res.json({ message: 'Error creating user' });
          });
      });
    })
    .catch(() => {
      res.status(500)
      res.json({ message: 'Error checking existing user' });
    });
});

module.exports = router;