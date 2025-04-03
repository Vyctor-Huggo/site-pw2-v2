# La Ralé - Loja de Roupas Online  

**Site-PW2-V2**  
Um projeto de loja de roupas desenvolvido com **Express.js**, que inclui funcionalidades de login, registro e carrinho de compras, além de contar a história da marca.  

## 🚀 Tecnologias Utilizadas  

- **Backend:** Express.js, Node.js, Prisma, SQLite  
- **Frontend:** HJS (Hogan.js), Bootstrap, CSS  
- **Segurança:** Crypto, Cookies  
- **Comunicação Cliente-Servidor:** AJAX, Axios  
- **Gerenciamento de Variáveis de Ambiente:** Dotenv  

## 📌 Funcionalidades  

O site possui diversas funcionalidades para proporcionar uma experiência completa de compra online:  

### 🔹 **Principais Páginas**  
- **Início (`/`)** → Página inicial com destaque para produtos e informações sobre a marca.  
- **Loja (`/loja`)** → Exibe os produtos disponíveis para compra.  
- **Carrinho (`/carrinho`)** → Permite gerenciar os itens adicionados para compra.  
- **Ingressos (`/ingressos`)** → Seção para compra de ingressos (caso aplicável).  
- **Perfil (`/perfil`)** → Área do usuário, onde ele pode visualizar e editar suas informações.  
- **Login (`/login`)** → Página de autenticação de usuários.  
- **Cadastro (`/cadastro`)** → Registro de novos usuários.  

### 🔹 **Principais Rotas**  
- **`routes/inicial.js`** → Controla a exibição da página inicial.  
- **`routes/loja.js`** → Gerencia a listagem e exibição dos produtos.  
- **`routes/carrinho.js`** → Manipula ações do carrinho de compras.  
- **`routes/perfil.js`** → Lida com a área do usuário.  
- **`routes/login.js`** e **`routes/cadastro.js`** → Gerenciam autenticação e registro.  

## 🛠️ Instalação e Execução  

### 1️⃣ Clonar o repositório  
```sh
git clone https://github.com/seu-usuario/La-Ralé.git  
cd La-Ralé  
```  

### 2️⃣ Instalar as dependências  
```sh
npm install  
```  

### 3️⃣ Criar um arquivo **`.env`** na raiz do projeto  
Crie um arquivo **`.env`** e defina as seguintes variáveis de ambiente:  
```env
DATABASE_URL="file:./public/database/database.db"
```
(O `DATABASE_URL` pode variar dependendo da configuração do SQLite e do Prisma.)  

### 4️⃣ Rodar as migrações do Prisma  
```sh
npx prisma migrate dev  
```  

### 5️⃣ Iniciar o servidor  
```sh
npm start  
```  
O site estará disponível em **`http://localhost:3000`**.  

## 🔑 Autenticação e Banco de Dados  

O projeto utiliza **Prisma ORM** com **SQLite** para gerenciar os dados dos usuários e produtos. A API de login usa **bcrypt** para criptografar senhas e **cookies** para manter a sessão ativa.  

## 📜 Licença  

Este projeto está sob a licença **MIT**.  
