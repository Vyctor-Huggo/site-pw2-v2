function texts() {
    var elemento;
    var img = document.getElementById("img");
    var titulo = document.getElementById("titulo")
    const valor = document.getElementById('albuns').value
    console.log(valor)

    switch(valor) {
        case 'Boêmia':
            elemento = "Boêmia";
            img.setAttribute("src", "images/boema.jpeg");
            titulo.setAttribute("style", "background-color: #ffefef; color: black; border: 1px solid black;")
            break;
        case 'Bródio':
            elemento = "Bródio";
            img.setAttribute("src", "images/brodio.jpeg");
            titulo.setAttribute("style", "background-color: #1d2a20; color: #f6f2e7; border: 1px solid black;")
            break;
        case 'Abismo':
            elemento = "Abismo";
            img.setAttribute("src", "images/abismo.jpeg");
            titulo.setAttribute("style", "background-color: #464646; color: #f6f2e7; border: 1px solid black;")
            break;
    }

    document.getElementById("texto").innerHTML = elemento;
}


const inputCEP = document.getElementById('cep');
inputCEP.addEventListener('input', function(event) {
    let value = event.target.value;
    value = value.replace(/\D/g, '');

    if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5);
    }
    event.target.value = value;
});