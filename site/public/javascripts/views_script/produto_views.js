async function usingData() {
    try {
        // Carregando o arquivo JSON
        const response = await fetch('../../items.json');
        const lojaData = await response.json();

        const produto = lojaData.itens[id];

        const nome = document.getElementById("nome");
        const img = document.getElementById("imagem");
        const descricao = document.getElementById("descricao");
        const preco = document.getElementById("preco");

        nome.innerHTML = produto.nome;
        descricao.innerText = produto.descricao;
        preco.innerText = produto.preco;

        for (let i = 1; i <= produto.count_img; i++) {
            var src_img = produto.imagem + '' + i + '.png';
            
            var item = document.createElement("div");
            item.id = "" + i;

            item.className = "carousel-item";
            if (i === 1) {
                item.classList.add("active");
            }
            item.innerHTML = `<img src="${src_img}" class="d-block w-100" style="border-radius: 20px;" alt="${i}"></img>`

            img.appendChild(item);
        }
    }  catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
        //window.location.href = '/loja/produto/notfound';
    }

    
}
document.addEventListener("DOMContentLoaded", function() {
    usingData();
});