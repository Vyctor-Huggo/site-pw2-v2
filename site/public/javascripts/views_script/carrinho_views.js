document.addEventListener('DOMContentLoaded', function() {
    total()
});

//Total automático
function total() {
    var valorProdutos = parseFloat(document.getElementById('valor_produto').innerText.replace('R$', '').replace(',', '.'))
    var frete = parseFloat(document.getElementById('frete').innerText.replace('R$', '').replace(',', '.'))
    var total = valorProdutos + frete;
    var total_seco = document.getElementById('total').innerText = 'R$' + total.toFixed(2).replace('.', ',');
}

//aumentar/diminuir produtos
const preco = document.getElementById('precin')
const valorItem = parseFloat(preco.innerText.replace('R$', '').replace(',', '.'))

function produNum(x) {
    const valor = document.getElementById("produNum");
    const valorInt = parseInt(valor.value)

    if (x === 'aumento') {
        valor.value = valorInt + 1
        preco.innerHTML = 'R$' + (valorItem * valor.value).toFixed(2).replace('.', ',')
    }else if (x === 'diminui') {
        if (valor.value > 1) {
            valor.value = valorInt - 1
            preco.innerHTML = 'R$' + (valorItem * valor.value).toFixed(2).replace('.', ',')
        }
    }
}

const cepUrl = '06702567'

fetch(`https://viacep.com.br/ws/${cepUrl}/json/`)
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

