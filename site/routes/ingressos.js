const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.user) {
    const user = req.session.user[0];
    console.log(user);
    if(user.imagem) {
        res.render('ingressos', {
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
    res.render('ingressos', {
        imagem: '/images/templatePerfil.jpg'}
    )   
}
});

module.exports = router;
