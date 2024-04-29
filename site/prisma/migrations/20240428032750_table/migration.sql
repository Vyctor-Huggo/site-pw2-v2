-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "album_favorito" TEXT,
    "data_nascimento" DATETIME,
    "telefone" TEXT,
    "cep" TEXT,
    "imagem" BLOB
);

-- CreateTable
CREATE TABLE "compras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "item_comprado" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "metodo_pagamento" TEXT NOT NULL,
    "frete" DECIMAL NOT NULL,
    "cep" TEXT NOT NULL,
    CONSTRAINT "compras_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
