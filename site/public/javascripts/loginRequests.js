var dbUserRequests = require('./db_configs/User')

async function validateLogin(email, senha) {
    try {
        const user = await dbUserRequests.getUserbyEmail(email);
        if (!user) {
            console.log('O EMAIL NÃO EXISTE');
            throw new Error('O email não está cadastrado');
        }

        const userpass = user.senha;
        if (userpass === senha) {
            console.log('Senha correta');
            return user;
        } else {
            console.log('SENHA ERRADA');
            throw new Error('Senha Incorreta');
        }
    } catch (error) {
        console.error('Erro ao validar:', error.message);

        throw error;
    }
}

module.exports = { validateLogin }