const express = require('express');
const bodyParser = require('body-parser');
const perfilRequests = require('../public/javascripts/perfilRequests');
const dbPurchaseRequests = require('../public/javascripts/db_configs/Compras')
const multer = require('multer');
const sharp = require("sharp");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Configuração do body-parser para analisar solicitações POST
router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
                imagem: `data:image/jpeg;base64, ${user.imagem}`}
            )
            console.log("cu:", user.album_favorito)
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
    const id = req.session.user[0].id;
    var image = convertImageToBase64('/images/templatePerfil.jpg');

    console.log(album);
    if (req.file) {
            sharp(req.file.buffer)
            .resize({
                width: 200,
                height: 200,
                fit: sharp.fit.cover,
                position: sharp.strategy.entropy
            })
            .toBuffer()
            .then(croppedImage => {
                image = croppedImage.toString('base64');
            })
            .catch(err => {
                console.error('Erro ao cortar a imagem:', err);
                res.status(500).send('Erro ao cortar a imagem');
            });
    }
    
        
        perfilRequests.updateUser(id, image, album).then(user => {
            req.session.user = [user];
            res.status(200).redirect('/perfil');
        })
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
                                    ${items_card}
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
            res.render('pedidos', {pedidos_card, modal_card});
        })
    } else {
        res.redirect('/login');
    }
    
    
});

function convertImageToBase64() {
    // Construir o caminho completo do arquivo usando 'path.join'
    const imagePath = path.join(__dirname, 'public', 'images', 'templatePerfil.jpg');

    // Ler o arquivo de imagem de forma assíncrona
    fs.readFile(imagePath, (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }
        // Converter dados binários para uma string Base64
        const base64Image = Buffer.from(data).toString('base64');
        console.log(base64Image); // Mostra a string Base64 no console

        // Se necessário, você pode retornar ou fazer algo com a string base64Image aqui
        // Por exemplo, você poderia retornar esta string como resposta HTTP
    });
}

module.exports = router;