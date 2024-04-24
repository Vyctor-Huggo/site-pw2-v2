const configdb = require('./configDB');
const dbTokenRequests = require('./Token');
const crypt = require('../crypto');

function addUser(nome, email, senha, albumFavorito, dataNascimento, telefone, cep) {
    return new Promise((resolve, reject) => {
        configdb.openDB().then(db => {
            const query = `
            INSERT INTO usuarios (nome, email, senha, album_favorito, data_nascimento, telefone, cep) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
            db.run(query, [nome, email, senha, albumFavorito, dataNascimento, telefone, cep])
            .then(() => {
                console.log('Usuário adicionado com sucesso');
                return db.get('SELECT last_insert_rowid() AS lastID');
            })
            .then(row => {
                const lastID = row.lastID;
                const token = crypt.encryptID(lastID);
                dbTokenRequests.insertToken(token, lastID);
    
                resolve(token);
            }).catch(error => {
                console.error('Erro ao adicionar usuário:', error.message);
                reject(error);
            });
        })
    })
}

function updateUserImgbyID(image, id) {
    try {
        configdb.openDB().then(db => {
            const query = `UPDATE usuarios SET imagem = ? WHERE id = ?`;

            db.run(query, [image, id]);
            console.log('imagem:', image);

        });
    } catch (error) {
        console.error("Imagem:", error.message);
        throw error;
    }
}

function updateUserCepbyID(cep, id) {
    try {
        configdb.openDB().then(db => {
            const query = `UPDATE usuarios SET cep = ? WHERE id = ?`;

            db.run(query, [cep, id]);
            console.log('carai , ', cep)

        });
    } catch (error) {
        console.error("cep:", error.message);
        throw error;
    }
}

function updateUserFavAlbumbyID(album, id) {
    try {
        configdb.openDB().then(db => {
            const query = `UPDATE usuarios SET album_favorito = ? WHERE id = ?`;

            db.run(query, [album, id]);
            console.log('cusagem, ', album);

        });
    } catch (error) {
        console.error("Imagem:", error.message);
        throw error;
    }
}

async function getUserbyID(id) {
    try {
        const db = await configdb.openDB();
        
        const query = `SELECT * FROM usuarios WHERE id = ?`;
        const rows = await db.get(query, [id]);
        
        console.log('Resultado da consulta:');
        console.log(rows);

        return rows;
    } catch (error) {
        console.error('Erro ao buscar usuário pelo ID:', error.message);
    }
}

async function getUserbyEmail(email) {
    try {
        const db = await configdb.openDB();
        
        const query = `SELECT * FROM usuarios WHERE email = ?`;
        const rows = await db.get(query, [email]); // Aguarda a resolução da Promise

        console.log('Resultado da consulta:');
        console.log(rows);

        return rows; // Retorna o resultado da consulta
    } catch (error) {
        console.error('Erro ao buscar usuário pelo EMAIL:', error.message);
        throw error; // Lança o erro para ser tratado externamente
    }
}


async function showAllUsers() {
    try {
        const db = await configdb.openDB();
        
        const query = `SELECT * FROM usuarios`;
        const rows = await db.all(query);
        
        console.log('Resultado da consulta:');
        console.log(rows);

        return rows;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
    }
}



module.exports = { 
    addUser, 
    getUserbyID , 
    getUserbyEmail, 
    updateUserImgbyID, 
    updateUserCepbyID, 
    updateUserFavAlbumbyID, 
    showAllUsers 
};
