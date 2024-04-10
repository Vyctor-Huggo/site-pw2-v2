const express = require('express');
const bodyParser = require('body-parser');
const dbUserRequests = require('../public/javascripts/db_configs/User');
const loginReqs = require('../public/javascripts/loginRequests')
const router = express.Router();
const app = express();

// Configuração do body-parser para analisar solicitações POST
app.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/sign-in', function(req, res, next) {
  res.render('cadastro', { title: 'Express' });
});

router.post('/sign-in', async (req, res, next) => {
  const { nome, email, senha, album_favorito, nascimento, telefone, CEP } = req.body;
  try {
    const token = await dbUserRequests.addUser(nome, email, senha, album_favorito, nascimento, telefone, CEP);
    
    //Metodo utilizando cookies de sessão
    const user = await loginReqs.validateLogin(email, senha);
    console.log("Login efetuado: ", user);
    req.session.user = [user];
    console.log("session:", req.session.user);

    //Metodo utilizando token na URL
    //console.log(token);
    //res.redirect(`/db/users/${token}`);
    
    res.redirect(`/db/login/user`);
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error.message);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
