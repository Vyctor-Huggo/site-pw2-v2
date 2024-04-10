async function makeCards() {
    try {
        // Carregando o arquivo JSON
        const response = await fetch('../../items.json');
        const lojaData = await response.json();

        var div_items = document.querySelectorAll('.card.text-center');
        var a = 0;
        console.log(lojaData.itens.length);
        for (let i = 0; i < div_items.length; i++) {
            var element = div_items[i];
            var btn_element = element.querySelectorAll('button')[0];

            element.id = a;
            btn_element.id = a;
            a++;

            if(a > lojaData.itens.length-1) {
                a = 0;
            }
        }

        div_items.forEach(element => {
            var imagem = element.querySelectorAll('img')[0];
            var nome = element.querySelectorAll('h5')[0];
            var descricao = element.querySelectorAll('p')[0];
            var preco = element.querySelectorAll('small')[0];

            var produto = lojaData.itens[element.id];

            nome.innerHTML = produto.nome;
            descricao.innerText = produto.descricao_breve;
            preco.innerText = produto.preco;

            imagem.src = produto.imagem + "1.png";

        });

    } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
    }
}

function redirect_items(btn) {
    id = btn.id;
    
    const url = `/loja/produto/${id}`;
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function() {
    makeCards();
    console.log("cards criados");
});
