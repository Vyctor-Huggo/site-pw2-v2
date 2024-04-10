const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const axios = require('axios');

// Configuração do body-parser para analisar solicitações POST
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/loja', function(req, res, next) {
    try {
        res.render('loja', { id: req.params.id, message: "oi" });
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        res.status(500).send('Erro ao buscar dados do produto');
    }
    
});

router.get('/loja/produto/:id', function(req, res, next) {
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

router.post('/loja', async function(req, res) {
    const { id } = req.body;
    const response = await axios.get('http://localhost:3000/items.json'); // Supondo que o arquivo items.json esteja na raiz do seu servidor
    const produtos = response.data;
    if (!req.session.prods) {
        req.session.prods = [];
    }

    req.session.prods.push(produtos.itens[id]);

    console.log(req.session.prods)

    res.render('loja', { id: req.params.id, message: "oi" });
})

router.get('/loja/carrinho', async function(req, res, next) {
    if(!req.session.prods) {
        req.session.prods = [];
    }
    const produtos = req.session.prods;

    let total = 0;
    let tbody_att = '';
    var a = 0;
    produtos.forEach(item => {
        tbody_att += `
            <tr id="produto-${a}">
                <td>${item.nome}</td>
                <td>R$ ${item.preco.toFixed(2)}</td>
                <td>
                    <button onclick="removerProduto(${a}, ${item.id})">Remover</button>
                </td>
            </tr>
        `;
        total += item.preco;
        a += 1;
    });

    res.render('carrinho', { tbody_att, total });
});

router.post('/loja/remover-produto/:id', function(req, res, next) {
    const idProduto = parseInt(req.params.id);
    if (!req.session.prods) {
        req.session.prods = [];
    }
    // Filtrar a lista de produtos removendo o produto com o ID correspondente
    req.session.prods.splice(idProduto, 1);
    console.log("prods:", req.session.prods);
    res.redirect('/loja/carrinho'); // Redirecionar de volta para a página do carrinho
});

module.exports = router;
