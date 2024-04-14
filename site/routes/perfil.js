const express = require('express');
const bodyParser = require('body-parser');
const perfilRequests = require('../public/javascripts/perfilRequests');
const multer = require('multer');
const sharp = require("sharp");
const router = express.Router();

// Configuração do body-parser para analisar solicitações POST
router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/perfil', function(req, res, next) {
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
                imagem: '/images/jubileu.jpg'}
            )   
            console.log("cuidado:", user.album_favorito)
        }
        
    } else {
        res.redirect('/login');
    }
});

router.post('/perfil', upload.single('file'), async (req, res, next) => {
    const album = req.body.album;
    const id = req.session.user[0].id;
    console.log(album);
    if (!req.file) {
        return res.status(400).send('Nenhuma imagem enviada');
    }
    sharp(req.file.buffer)
    .resize({
        width: 200,
        height: 200,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
    })
    .toBuffer()
    .then(croppedImage => {
        const image = croppedImage.toString('base64');
        
        perfilRequests.updateUser(id, image, album).then(user => {
            req.session.user = [user];
            res.status(200).redirect('/perfil');
        })
        
    })
    .catch(err => {
        console.error('Erro ao cortar a imagem:', err);
        res.status(500).send('Erro ao cortar a imagem');
    });
});

module.exports = router;