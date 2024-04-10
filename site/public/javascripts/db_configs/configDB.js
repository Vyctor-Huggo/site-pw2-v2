const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

function openDB() {
    return open({
       filename: './public/database/database.db',
       //filename: '../../database/database.db', // para rodar no node
        driver: sqlite3.Database
    }).catch(err => {
        console.error('Erro ao abrir conexão com o banco de dados:', err.message);
    });
}

async function stopConection() {
    const db = await openDB();
    db.close((err) => {
      if (err) {
        console.error('Erro ao fechar a conexão com o banco de dados:', err.message);
        return;
      }
      console.log('Conexão com o banco de dados SQLite fechada com sucesso');
    });
  }

module.exports = {
    openDB,
    stopConection
}