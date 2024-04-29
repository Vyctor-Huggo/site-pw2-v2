/*
  Warnings:

  - Added the required column `updatedAt` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "album_favorito" TEXT,
    "data_nascimento" TEXT,
    "telefone" TEXT,
    "cep" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "imagem" BLOB
);
INSERT INTO "new_usuarios" ("album_favorito", "cep", "data_nascimento", "email", "id", "imagem", "nome", "senha", "telefone") SELECT "album_favorito", "cep", "data_nascimento", "email", "id", "imagem", "nome", "senha", "telefone" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
