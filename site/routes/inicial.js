const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('inicial');
});

router.get('/inicial', function(req, res, next) {
  res.render('inicial');
});

router.get('/ingressos', function(req, res, next) {
  res.render('ingressos');
});

router.get('/perfil', function(req, res, next) {
  res.render('perfil');
});

module.exports = router;
