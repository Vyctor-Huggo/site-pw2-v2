const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const agrupar = require('../public/javascripts/agrupar')
const dbPurchaseRequests = require('../public/javascripts/db_configs/Compras');
const axios = require('axios');

// Configuração do body-parser para analisar solicitações POST
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async function(req, res, next) {
    if(!req.session.prods) {
        req.session.prods = [];
    }
    if(req.session.user) {
        const response = await axios.get('http://localhost:3000/items.json');
        const items = response.data.itens;
        const produtos = agrupar.agruparProdutos(req.session.prods);
        const user = req.session.user[0];

        let total = 0.00;
        let frete = 10.50;
        let produtos_cards = '';
        produtos.forEach(([id, quantidade]) => {
            var produtoJSON = items.find(objeto => objeto.id === parseInt(id));
            
            produtos_cards += `
            <div class="card" prodID="${produtoJSON.id}">
            <div class="card-body">
                <div class="row">
                    <div id="alinhar" class="col-md-2">
                        <img src="${produtoJSON.imagem}/1.png" class="img-fluid m-auto">
                    </div>
                    <div class="col-md-4" style="display: flex; align-items: center;">
                        <p class="card-text h4">${produtoJSON.nome}</p>
                    </div>
                    <div id="alinhar" class="col-md-4">
                        <div class="row m-auto">
                            <div id="alinhar" class="col-3">
                                <button id="butaozin" type="button" onclick="diminuirProduto(${produtoJSON.id}, 0)" >
                                    <svg class="bi bi" width="24" height="24" fill="currentColor"><use xlink:href="#<-seta"/></svg>
                                </button>
                            </div>
                            <div class="col-3" style="padding: 0px;">
                                <p class="text-center" style="margin: 0px;">Quant.</p>
                                <input id="produNum" class="form-control text-center" type="text" value="${quantidade}">
                            </div>
                            <div id="alinhar" class="col-3">
                                <button id="butaozin" type="button" onclick="aumentarProduto(${produtoJSON.id})">
                                    <svg class="bi bi" width="24" height="24" fill="currentColor"><use xlink:href="#seta->"/></svg>
                                </button>
                            </div>
                            <div id="alinhar" class="col-3">
                                <div id="alinhar" class="container-fluid mt-1">
                                    <button class="btn btn-outline-danger" type="button" onclick="diminuirProduto(${produtoJSON.id}, 1)">
                                        <svg class="bi bi" width="24" height="24" fill="currentColor"><use xlink:href="#lixo"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="alinhar" class="col-md-2 mt-3">
                        <h6 id="precin">R$ ${produtoJSON.preco * quantidade}</h6>
                    </div>
                </div>
            </div>
        </div>
            </div>
            `;
            
            
            total += produtoJSON.preco * quantidade;
            frete += 2.20 * quantidade;
        });
        
        res.render('carrinho', { 
            produtos_cards, 
            total: total.toFixed(2),
            frete: frete.toFixed(2),
            totalFrete: parseFloat(total + frete),
            cep: `${user.cep}`, 
            nome: `${user.nome}`, 
            telefone: `${user.telefone}`,
            imagem: user.imagem
        });
    } else {
        res.redirect('/login'); 
    }
    
});

router.post('/remover-produto/:id/:remove?', function(req, res, next) {
    const idProduto = req.params.id;
    if(req.params.remove == 0) {
        var index = req.session.prods.indexOf(parseInt(idProduto));
        if (index !== -1) {
            req.session.prods.splice(index, 1);
        }

        res.redirect('/carrinho');

    } else {
        req.session.prods = req.session.prods.filter(elemento => elemento !== parseInt(idProduto));
        res.redirect('/carrinho');
    }
});

router.post('/adicionar-produto/:id', function(req, res, next) {
    if(req.params.id) {
        try {
            const idProduto = parseInt(req.params.id);

            req.session.prods.push(idProduto);

            res.redirect('/carrinho');
        } catch (error) {
            console.log(error); 
        }
    }
});

router.post('/finalizar-compra/', async function(req, res, next) {
    try{
        const user = req.session.user[0];
        const pedido = {
            id_usuario: user.id,
            cep: user.cep,
            totalCarrinho: req.body.totalCarrinho,
            freteCarrinho: req.body.freteCarrinho,
            valorCarrinho: req.body.valCarrinho,
            pagamento: req.body.pagamento,
            items: JSON.stringify(agrupar.agruparProdutos(req.session.prods))
        };

        console.log(JSON.stringify(pedido));

        await dbPurchaseRequests.addPurchase(
            pedido.id_usuario, 
            pedido.cep, 
            pedido.totalCarrinho, 
            pedido.freteCarrinho, 
            pedido.pagamento, 
            pedido.items
        );
        delete req.session.prods;
        res.redirect('/perfil/pedidos')

    } catch (error) {
        console.error("erro ai adicionar pedidos: ", error);
    }
    
});

module.exports = router;