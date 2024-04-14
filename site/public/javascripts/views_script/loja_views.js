function makeCards() {

    fetch('http://localhost:3000/items.json').then(response => {
        if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
        }
        return response.json();
    }).then(data => {

        const objetos = data.itens
        console.log(objetos.length)
        
        for (let i = 0; i < objetos.length; i++) {
            const nome = objetos[i].nome
            const preco = objetos[i].preco
            const imagem = objetos[i].imagem + "1.png"
            const descricao_breve = objetos[i].descricao_breve
            console.log(imagem)

            var card  = document.createElement("div");
            card.className = "col-md-4";
            card.innerHTML = `    
                        <div class="card text-center">
                            <img src="${imagem}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">${nome}</h5>
                                <p class="card-text">${descricao_breve}</p>
                                <p class="card-text"><small class="text-body-secondary">R$${preco}</small></p>
                                <button id=${i} onclick="redirect_items(this)" class="btn btn-dark">Compre Agora</button>
                            </div>
                        </div>
                    `;
            document.getElementById('rows').appendChild(card)
        } 
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function redirect_items(btn) {
    id = btn.id;
    
    const url = `loja/produto/${id}`;
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function() {
    makeCards();
});