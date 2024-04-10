const crypto = require('crypto');

// Função para criptografar o ID usando SHA-256
function encryptID(id) {
  const hash = crypto.createHash('sha256');
  hash.update(id.toString());
  return hash.digest('hex');
}

module.exports = { encryptID }