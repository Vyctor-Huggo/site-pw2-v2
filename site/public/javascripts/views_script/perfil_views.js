function texts(x) {
    var elemento;
    var img = document.getElementById("img");
    var titulo = document.getElementById("titulo")

    switch(x) {
        case 'boemia':
            elemento = "Boemia";
            img.setAttribute("src", "/images/boema.jpeg");
            titulo.setAttribute("style", "background-color: #ffefef; color: black; border: 1px solid black;")
            break;
        case 'brodio':
            elemento = "Bródio";
            img.setAttribute("src", "/images/brodio.jpeg");
            titulo.setAttribute("style", "background-color: #1d2a20; color: #f6f2e7; border: 1px solid black;")
            break;
        case 'abismo':
            elemento = "Abismo";
            img.setAttribute("src", "/images/abismo.jpeg");
            titulo.setAttribute("style", "background-color: #464646; color: #f6f2e7; border: 1px solid black;")
            break;
    }

    document.getElementById("texto").innerHTML = elemento;
}