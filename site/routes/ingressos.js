const express = require('express');
const router = express.Router();

router.get('/ingressos', function(req, res, next) {
  res.render('ingressos');
});

module.exports = router;
