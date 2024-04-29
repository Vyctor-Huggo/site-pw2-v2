const express = require('express');
const bodyParser = require('body-parser');
const perfilRequests = require('../public/javascripts/perfilRequests');
const dbPurchaseRequests = require('../public/javascripts/db_configs/Compras')
const multer = require('multer');
const sharp = require("sharp");
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { Console } = require('console');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Configuração do body-parser para analisar solicitações POST
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
    if(req.session.user) {
        const user = req.session.user[0];
        console.log(user);
        if(user.imagem) {
            res.render('perfil', {
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
        } else {
            res.render('perfil', {
                nome: user.nome, 
                email: user.email, 
                nascimento: user.data_nascimento, 
                telefone: user.telefone,
                album: user.album_favorito,
                cep: user.cep,
                imagem: '/images/templatePerfil.jpg'}
            )   
            console.log("cuidado:", user.album_favorito)
        }
    } else {
        res.redirect('/login');
    }
});

router.post('/', upload.single('file'), async (req, res, next) => {
    const album = req.body.album;
    const cepAtt = req.body.cep;
    const cep = req.session.user[0].cep;
    console.log(cep, ' att: ', cepAtt);
    const id = req.session.user[0].id;
    var image = '/images/templatePerfil.jpg'

    console.log(album);
    console.log(req.file); 

    if(req.file) {
        console.log("olha a imageeeem")
        try {
            // Processando a imagem com Sharp
            const croppedImage = await sharp(req.file.buffer)
                .resize({
                    width: 200,
                    height: 200,
                    fit: sharp.fit.cover,
                    position: sharp.strategy.entropy
                })
                .toBuffer();
            
            // Salvar a imagem processada no sistema de arquivos
            const filename = 'processed-' + Date.now() + path.extname(req.file.originalname);
            fs.writeFile(path.join('', 'public', 'uploads', filename), croppedImage, (err) => {
                if (err) {
                    console.error('Erro ao salvar a imagem:', err);
                }
                res.send('Imagem processada e salva com sucesso.');
            });
            image = `/uploads/${filename}`
            console.log(image)
        } catch (err) {
            console.error('Erro ao processar a imagem:', err);
        }
    }
    
    try {
        perfilRequests.updateUser(id, image, album, cepAtt).then(user => {
            req.session.user = [user];
            console.log(req.session.user);
            res.status(200).redirect('/perfil');
        })
    } catch (error) {



        console.log('Erro ao atualizar: ', error);
    }
    
});

router.get('/pedidos', async function(req, res, next) {
    if(req.session.user) {
        const user = req.session.user[0];
        const response = await axios.get('http://localhost:3000/items.json');
        const items = response.data.itens;
        let pedidos_card = ``;
        let items_card = ``;
        let modal_card = ``;
        dbPurchaseRequests.showAllPurchasesbyUser(parseInt(user.id)).then(compras => {
            compras.forEach(compra => {
                items_card = ``;
                let items_compra = JSON.parse(compra.item_comprado);

                items_compra.forEach(([id, quantidade]) => {
                    const item = items.find(objeto => objeto.id === parseInt(id));
                    items_card += `
                        <div class="card mb-3">
                            <div class="card-body">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Produto</th>
                                            <th class="text-center" scope="col">Quantidade</th>
                                            <th scope="col">Preço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td >${item.nome}</td>
                                            <td class="text-center">${quantidade}</td>
                                            <td>R$ ${item.preco * quantidade}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `;
                })

                pedidos_card += `
                    <div class="card mb-3" style="background-color: #f6f2e7;">
                        <div class="card-body">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-3">
                                        <p><strong>NÚMERO DO PEDIDO</strong></p>
                                        <p>#${compra.id}</p>
                                    </div>
                                    <div class="col-md-2">
                                        <p><strong>STATUS</strong></p>
                                        <p style="color: green;">Concluido</p>
                                    </div>
                                    <div class="col-md-2">
                                        <p><strong>DATA</strong></p>
                                        <p>20/02/2024</p>
                                    </div>
                                    <div class="col-md-2">
                                        <p><strong>PAGAMENTO</strong></p>
                                        <p style="color: orangered;">${compra.metodo_pagamento}</p>
                                    </div>
                                    <div id="alinhar" class="col-md-3">
                                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#Modal${compra.id}" style="color: #f6f2e7;">
                                            Detalhes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                modal_card += `
                <div class="modal fade" id="Modal${compra.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header" style="background-color: black; color: #f6f2e7;">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Pedido #${compra.id}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" style="background-color: #f6f2e7;">
                                <h5>Total pago: R$ ${compra.preco}</h5>
                                <h5>Frete pago: R$ ${compra.frete}</h5>
                                    ${items_card}
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
            res.render('pedidos', {pedidos_card, modal_card, imagem: user.imagem});
        })
    } else {
        res.redirect('/login');
    }
    
    
});

module.exports = router;