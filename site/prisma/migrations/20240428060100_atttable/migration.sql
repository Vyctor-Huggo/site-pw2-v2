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
    "imagem" TEXT
);
INSERT INTO "new_usuarios" ("album_favorito", "cep", "createdAt", "data_nascimento", "email", "id", "imagem", "nome", "senha", "telefone", "updatedAt") SELECT "album_favorito", "cep", "createdAt", "data_nascimento", "email", "id", "imagem", "nome", "senha", "telefone", "updatedAt" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
