const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/inicial')
});

router.get('/inicial', function(req, res, next) {
  res.render('inicial');
});

router.post('/sair', function(req, res, next) {
  req
})

module.exports = router;
