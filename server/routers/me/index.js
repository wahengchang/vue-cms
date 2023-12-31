const express = require('express');
const passport = require('../../auth/passport'); // Path to your passport configuration

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;