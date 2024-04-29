const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const agrupar = require('../public/javascripts/agrupar')
const axios = require('axios');

// Configuração do body-parser para analisar solicitações POST
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
    try {
        if(req.session.user) {
            const user = req.session.user[0];
            console.log(user);
            if(user.imagem) {
                res.render('loja', {
                    nome: user.nome, 
                    email: user.email, 
                    nascimento: user.data_nascimento, 
                    telefone: user.telefone,
                    album: user.album_favorito,
                    cep: user.cep,
                    imagem: user.imagem
                })
                console.log("cwewe:", (typeof(user.imagem)), "\n")
                //console.log("cu:", (user.imagem).data.toString('base64'))
            }
        } else {
            res.render('loja', {
                imagem: '/images/templatePerfil.jpg'}
            )   
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        res.status(500).send('Erro ao buscar dados do produto');
    }
    
});

router.post('/', async function(req, res) {
    const { id } = req.body;
    const response = await axios.get('http://localhost:3000/items.json'); // Supondo que o arquivo items.json esteja na raiz do seu servidor
    const produtos = response.data;
    if (!req.session.prods) {
        req.session.prods = [];
    }

    req.session.prods.push(parseInt(id));

    console.log(req.session.prods);
    

    res.render('loja', { id: req.params.id, imagem: "/images/templatePerfil.jpg"});
})

router.get('/produto/:id', function(req, res, next) {
    if(isNaN(req.params.id)) {
        res.status(404).render('error', { message: "Produto não encontrado volte a loja" });
    } else {
        try {
            if(req.session.user) {
                res.render('produto', { id: req.params.id, imagem: req.session.user[0].imagem });
            } else {
                res.render('produto', { id: req.params.id, imagem: req.session.user[0].imagem });
            }
            
        } catch (error) {
            console.error('Erro ao buscar dados:', error.message);
            res.status(500).send('<h1 id="erro">Erro ao buscar dados do produto</h1>');
        }
    }
});

module.exports = router;
