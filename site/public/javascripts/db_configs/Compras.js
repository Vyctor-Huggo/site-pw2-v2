const configdb = require('./configDB');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addPurchase(id_usuario, cep, preco, frete, pagamento, items) {
    try {
        const purchase = await prisma.compras.create({
            data: {
                usuario_id: id_usuario,
                item_comprado: items,
                preco: preco,
                metodo_pagamento: pagamento,
                frete: frete,
                cep: cep
            }
        })
        return purchase;
    } catch (error) {
        console.error("Erro ao criar compra: ", error);
    }

    /* configdb.openDB().then(db => {
        const query = `
        INSERT INTO compras (usuario_id, item_comprado, preco, metodo_pagamento, frete, cep) 
        VALUES (?, ?, ?, ?, ?, ?)`;

        db.run(query, [id_usuario, items, preco, pagamento, frete, cep])
        .then(() => {
            console.log('Compra adicionado com sucesso');
        })
        .catch(error => {
            console.error('Erro ao adicionar Compra:', error.message);
        });
    }) */
}

async function showAllPurchasesbyUser(id) {
    try {
        const purchasesbyID = await prisma.compras.findMany({
            where: {
                usuario_id: id
            }
        })
        return purchasesbyID;
    } catch (error) {
        console.error("Erro ao encontrar compras do usuário: ", error);
    }
    /* try {
        const db = await configdb.openDB();
        
        const query = `SELECT * FROM compras WHERE usuario_id = ?`;
        const rows = await db.all(query, [id]);
        
        console.log('Resultado da consulta das compras:');
        console.log(rows);
  
        return rows;
    } catch (error) {
        console.error('Erro ao buscar compras:', error.message);
    } */
}

module.exports = { addPurchase, showAllPurchasesbyUser };