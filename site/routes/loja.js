const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const agrupar = require('../public/javascripts/agrupar')
const axios = require('axios');

// Configuração do body-parser para analisar solicitações POST
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
    try {
        res.render('loja');
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

    req.session.prods.push(produtos.itens[id].id);

    console.log(req.session.prods);
    

    res.render('loja', { id: req.params.id });
})

router.ge

router.get('/produto/:id', function(req, res, next) {
    if(isNaN(req.params.id)) {
        res.status(404).render('error', { message: "Produto não encontrado volte a loja" });
    } else {
        try {
            res.render('produto', { id: req.params.id });
        } catch (error) {
            console.error('Erro ao buscar dados:', error.message);
            res.status(500).send('<h1 id="erro">Erro ao buscar dados do produto</h1>');
        }
    }
});

module.exports = router;
