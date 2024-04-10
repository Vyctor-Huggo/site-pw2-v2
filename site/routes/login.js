const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const loginReqs = require('../public/javascripts/loginRequests')

// Configuração do body-parser para analisar solicitações POST
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/login', function(req, res, next) {
  res.render('login', {message: ''});
});
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    console.log('email: ', email, '\nsenha: ', senha);
    try {
        // Verificar as credenciais do usuário
        const user = await loginReqs.validateLogin(email, senha);
        console.log("Login efetuado: ", user);
        req.session.user = [user];
        console.log("session:", req.session.user);
        res.redirect('/db/login/user')
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        res.render('login', {message: error.message})
        res.status(401);
    }
});

module.exports = router;
