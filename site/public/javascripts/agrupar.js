
function agruparProdutos(lista) {
    const contagem = {};
    console.log("lista: ", lista);

    // Contagem de cada tipo de item na lista
    for (const item of lista) {
        const produtoString = JSON.stringify(item);

        contagem[produtoString] = (contagem[produtoString] || 0) + 1;
    }

    // Converter o objeto de contagem em uma lista de pares [tipo, quantidade]
    const listaContagem = Object.entries(contagem);

    console.log(listaContagem);
    return listaContagem;
}

module.exports = { agruparProdutos };