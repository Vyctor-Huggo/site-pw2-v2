//const configdb = require('./configDB');
const dbTokenRequests = require('./Token');
const crypt = require('../crypto');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function addUser(nome, email, senha, albumFavorito, dataNascimento, telefone, cep) {
    try {
        const newUser = await prisma.usuarios.create({
            data: {
                nome: nome,
                email: email,
                senha: senha,
                album_favorito: albumFavorito,
                data_nascimento: dataNascimento,
                telefone: telefone,
                cep: cep
            }
        })
        console.log('User criado com sucesso: '. newUser);

        return newUser;
    } catch(err) {
        console.log("Erro ao criar User: ", err);
    }
    /*
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
    */
}

async function updateUserImgbyID(image, id) {
    try {
        const userUp = await prisma.usuarios.update({
            where: {
                id: id
            },
            data: {
                imagem: image
            }
        })
    } catch (error) {
        console.error("Erro ao atualizar imagem: ", error);
    }
    /*
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
    */
}

async function updateUserCepbyID(cep, id) {
    try {
        const userUp = await prisma.usuarios.update({
            where: {
                id: id
            },
            data: {
                cep: cep
            }
        })
    } catch (error) {
        console.error("Erro ao atualizar CEP: ", error);
    }
    /*
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
    */
}

async function updateUserFavAlbumbyID(album, id) {
    try {
        const userUp = await prisma.usuarios.update({
            where: {
                id: id
            },
            data: {
                album_favorito: album
            }
        })
    } catch (error) {
        console.error("Erro ao atualizar album: ", error);
    }
    /* try {
        configdb.openDB().then(db => {
            const query = `UPDATE usuarios SET album_favorito = ? WHERE id = ?`;

            db.run(query, [album, id]);
            console.log('cusagem, ', album);

        });
    } catch (error) {
        console.error("Imagem:", error.message);
        throw error;
    } */
}

async function getUserbyID(id) {
    try {
        const user = await prisma.usuarios.findUnique({
            where: {
                id: id
            }
        })
        return user;
    } catch (error) {
        console.error("Erro ao encontrar usuário: ", error);
    }

    /* try {
        const db = await configdb.openDB();
        
        const query = `SELECT * FROM usuarios WHERE id = ?`;
        const rows = await db.get(query, [id]);
        
        console.log('Resultado da consulta:');
        console.log(rows);

        return rows;
    } catch (error) {
        console.error('Erro ao buscar usuário pelo ID:', error.message);
    } */
}

async function getUserbyEmail(email) {
    try {
        const user = await prisma.usuarios.findUnique({
            where: {
                email: email
            }
        })
        return user;
    } catch (error) {
        console.error("Erro ao encontrar usuário: ", error);
    }

    /* try {
        const db = await configdb.openDB();
        
        const query = `SELECT * FROM usuarios WHERE email = ?`;
        const rows = await db.get(query, [email]); // Aguarda a resolução da Promise

        console.log('Resultado da consulta:');
        console.log(rows);

        return rows; // Retorna o resultado da consulta
    } catch (error) {
        console.error('Erro ao buscar usuário pelo EMAIL:', error.message);
        throw error; // Lança o erro para ser tratado externamente
    } */
}


async function showAllUsers() {
    try {
        const users = await prisma.usuarios.findMany()
        return users;
    } catch (error) {
        console.error("Erro ao encontrar usuário: ", error);
    }
    /* try {
        const db = await configdb.openDB();
        
        const query = `SELECT * FROM usuarios`;
        const rows = await db.all(query);
        
        console.log('Resultado da consulta:');
        console.log(rows);

        return rows;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
    } */
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
