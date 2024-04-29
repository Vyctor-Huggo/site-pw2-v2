    function diminuirProduto(id, remover) {
    fetch(`/carrinho/remover-produto/${id}/${remover}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao remover o produto do carrinho');
        }

        window.location.reload();
    })
    .catch(error => {
        console.error('Erro ao remover o produto:', error);
    });
}

function aumentarProduto(id) {
    fetch(`/carrinho/adicionar-produto/${id}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao remover o produto do carrinho');
        }

        window.location.reload();
    })
    .catch(error => {
        console.error('Erro ao remover o produto:', error);
    });
}


const selectPagamento = document.getElementById('selectPagamento');
function realizarPedido() {

    const dados = {
        totalCarrinho: totalCarrinho,
        freteCarrinho: freteCarrinho,
        valCarrinho: valCarrinho,
        pagamento: selectPagamento.value
    };
    console.log(dados)

    fetch(`/carrinho/finalizar-compra/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Indica que o corpo da requisição é JSON
        },
        
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao remover o produto do carrinho');
        };
        
        window.location.href = '/carrinho/finalizar-compra/';
    })
    .catch(error => {
        console.error('Erro ao remover o produto:', error);
    });
}

function VerificarPagamento() {
    var botao = document.getElementById("butao");
    if (selectPagamento.value === '') {
        selectPagamento.classList.add('is-invalid');
        botao.disabled = true;
        console.log('ué')

    } else {
        selectPagamento.classList.remove('is-invalid');
        selectPagamento.classList.add('is-valid');
        botao.disabled = false;
    }
}


fetch(`https://opencep.com/v1/${cepUrl.replace(/[^0-9]/g,'')}.json`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
        }
        return response.json();
    })
    .then(data => {
        const cidade = data.localidade
        const estado = data.uf
        const cep = data.cep;

        const enderecoValor = document.getElementById('endereco').innerHTML = `${cidade}, ${estado}, Brasil, ${cep} `
    })
    .catch(error => {
        console.error('Erro:', error);
});



document.addEventListener('DOMContentLoaded', function() {
    VerificarPagamento();
    document.getElementById('total').innerHTML = `R$ ${totalCarrinho}`;
    document.getElementById('frete').innerHTML = `R$ ${freteCarrinho}`;
    document.getElementById('val').innerHTML = `R$ ${valCarrinho}`;totalCarrinho
});