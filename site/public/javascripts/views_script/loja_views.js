function makeCards() {
    document.getElementById('rows').innerText = '';
    
    fetch('http://localhost:3000/items.json').then(response => {
        if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
        }
        return response.json();
    }).then(data => {

        const objetos = data.itens
        
        objetos.forEach(produto => {
            if(filter != "total") {
                if(produto.tipo == filter) {
                    const nome = produto.nome;
                    const preco = produto.preco;
                    const imagem = produto.imagem + "1.png";
                    const descricao_breve = produto.descricao_breve;
                    const id = produto.id;

                    var card  = document.createElement("div");
                    card.className = "col-md-4";
                    card.innerHTML = `    
                                <div class="card text-center">
                                    <img src="${imagem}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title">${nome}</h5>
                                        <p class="card-text">${descricao_breve}</p>
                                        <p class="card-text"><small class="text-body-secondary">R$${preco}</small></p>
                                        <button id=${id} onclick="redirect_items(this)" class="btn btn-dark">Compre Agora</button>
                                    </div>
                                </div>
                            `;
                    document.getElementById('rows').appendChild(card);
                }
            } else {
                const nome = produto.nome;
                const preco = produto.preco;
                const imagem = produto.imagem + "1.png";
                const descricao_breve = produto.descricao_breve;
                const id = produto.id;

                var card  = document.createElement("div");
                card.className = "col-md-4";
                card.innerHTML = `    
                            <div class="card text-center">
                                <img src="${imagem}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title">${nome}</h5>
                                    <p class="card-text">${descricao_breve}</p>
                                    <p class="card-text"><small class="text-body-secondary">R$${preco}</small></p>
                                    <button id=${id} onclick="redirect_items(this)" class="btn btn-dark">Compre Agora</button>
                                </div>
                            </div>
                        `;
                document.getElementById('rows').appendChild(card) 
            }
            
        });
    }).catch(error => {
        console.error('Erro:', error);
    });
}


function redirect_items(btn) {
    var id = btn.id;
    
    const url = `loja/produto/${id}`;
    window.location.href = url;
}

function select_itens(bnt) {
    var id = bnt.id;

    document.getElementById(filter).classList.remove('active');

    filter = `${id}`;

    document.getElementById(filter).classList.add('active');
    
    makeCards();
}

document.addEventListener("DOMContentLoaded", function() {
    makeCards();
});