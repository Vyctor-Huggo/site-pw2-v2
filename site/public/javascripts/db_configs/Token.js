const configdb = require('./configDB');

async function insertToken(token, id) {
    try {
        const db = await configdb.openDB();
        console.log('Conexão com o banco de dados estabelecida');

        const query = `
            INSERT INTO tokens (token, usuario_id)
            VALUES (?, ?)
        `;
        await db.run(query, [token, id]);
        console.log('Token salvo no banco de dados');
    } catch (error) {
        console.error('Erro ao salvar token no banco de dados:', error.message);
        throw error;
    }
}

async function getUserByToken(token) {
    try {
        const db = await configdb.openDB();
        console.log('Conexão com o banco de dados estabelecida');

        const query = `
            SELECT usuario_id AS id FROM tokens WHERE token = ?
        `;
        const rows = await db.get(query, [token]);
        console.log('Token encontrado');
        console.log('Resultado da consulta:');
        console.log(rows);

        return rows;
    } catch (error) {
        console.error('Erro ao procurar token no banco de dados:', error.message);
        throw error;
    }
}

module.exports = {insertToken, getUserByToken}