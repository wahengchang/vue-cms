const express = require('express');
const passport = require('../../auth/passport'); // Path to your passport configuration

const router = express.Router();

router.post('/', passport.authenticate('local'), (req, res) => {
  const userWithoutPassword = { ...req.user.toObject() };
  delete userWithoutPassword.password;
  res.json({ user: userWithoutPassword });
});

module.exports = router;