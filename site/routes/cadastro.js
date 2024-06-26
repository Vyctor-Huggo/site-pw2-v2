const express = require('express');
const bodyParser = require('body-parser');
const dbUserRequests = require('../public/javascripts/db_configs/User');
const loginReqs = require('../public/javascripts/loginRequests')
const router = express.Router();
const app = express();

// Configuração do body-parser para analisar solicitações POST
app.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cadastro', { imagem: '/images/templatePerfil.jpg' });
});

router.post('/', async (req, res, next) => {
  const { nome, email, senha, album_favorito, nascimento, telefone, cep, dddSelect } = req.body;
  const dddtelefone = `${dddSelect} ${telefone}`
  try {
    const newUser = await dbUserRequests.addUser(nome, email, senha, album_favorito, nascimento, dddtelefone, cep);
    console.log("usuario criado: ", newUser);
    //Metodo utilizando cookies de sessão
    const user = await loginReqs.validateLogin(email, senha);
    req.session.user = [user];
    console.log("session:", req.session.user);

    //Metodo utilizando token na URL
    //console.log(token);
    //res.redirect(`/db/users/${token}`);
    
    res.redirect(`/perfil`);
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error.message);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
