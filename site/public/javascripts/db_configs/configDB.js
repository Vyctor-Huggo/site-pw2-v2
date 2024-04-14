const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const fs = require('fs');

async function createDB() {

  //analisa se o banco de dados já foi criado
  if(fs.existsSync('./public/database/database.db')) {
    const db = new sqlite3.Database('./public/database/database.db');

    console.log('Banco de dados e tabela criados com sucesso');
    await db.close();

  } else {
    const db = new sqlite3.Database('./public/database/database.db');
    //filename: './public/database/database.db',
    //filename: '../../database/database.db', // para rodar no node

    var sqlscript = fs.readFileSync('./public/database/database', 'utf-8');
    await db.exec(sqlscript);

    console.log('Banco de dados e tabela criados com sucesso');
    await db.close();
  }
}

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
    createDB,
    stopConection
}