const express = require('express');
const passport = require('../../auth/passport'); // Path to your passport configuration

const router = express.Router();

router.post('/', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    
    req.session.destroy();
    res.json({})
  });
});

module.exports = router;