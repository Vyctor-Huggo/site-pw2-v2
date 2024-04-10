const express = require('express');
const dbUserRequests = require('../public/javascripts/db_configs/User');
const dbTokenRequests = require('../public/javascripts/db_configs/Token');
const router = express.Router();

router.get('/db/login/user', function(req, res) {
    if(req.session.user) {
        const user = req.session.user;
        console.log("usuario: ", user)
        const userJSON = JSON.stringify(user, null, 2);
            var userListHTML = `<li><pre>${userJSON}</pre></li>`;
            res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lista de JSONs</title>
            </head>
            <body>
                <h1>user:</h1>
                <ul>
                    ${userListHTML}   
                </ul>
            </body>
            </html>
        `);
    } else {
        res.send(`
        <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Lista de JSONs</title>
                </head>
                <body>
                    <h1>user:</h1>
                    <ul>
                        <p>faça <a href="/login">login</a> ou <a href="/sign-out">cadastre-se</a></p>  
                    </ul>
                </body>
            </html>
        `);
    }
    
})

router.get('/db/users/:id?', function(req, res, next) {
    const id = req.params.id;

    if (id) {
        if(!isNaN(id)) {
            printUserbyId(id, res);
        }
        else {
            dbTokenRequests.getUserByToken(id).then (user => {
                console.log(user);
                const userId = user.id;
                console.log('ID: ', userId);
                printUserbyId(userId, res);
            })
        }
    } else {
        dbUserRequests.showAllUsers().then(users => {
            let userListHTML = '<ul>';
            users.forEach(user => {
              const userJSON = JSON.stringify(user, null, 2);
              userListHTML += `<li><pre>${userJSON}</pre></li>`;
            });
            userListHTML += '</ul>';
            res.send(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Lista de JSONs</title>
              </head>
              <body>
                  <h1>Lista de JSONs:</h1>
                  ${userListHTML}
              </body>
              </html>
            `);
        }).catch(error => {
            console.error('Erro ao buscar usuários:', error.message);
            res.status(500).send('Erro ao buscar usuários');
        });  
    }
});

function printUserbyId(id, res) {
    dbUserRequests.getUserbyID(id).then(user => {
        const userJSON = JSON.stringify(user, null, 2);
        var userListHTML = `<li><pre>${userJSON}</pre></li>`;
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Lista de JSONs</title>
          </head>
          <body>
              <h1>user:</h1>
              <ul>
                ${userListHTML}   
              </ul>
          </body>
          </html>
        `);
    })
}

module.exports = router;