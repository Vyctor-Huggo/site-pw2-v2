function texts(x) {
    var elemento;
    var img = document.getElementById("img");

    switch(x) {
        case 1:
            elemento = "Sol e Alegria";
            img.setAttribute("src", "img/boema.jpeg");
            break;
        case 2:
            elemento = "Cultivando Sonhos";
            img.setAttribute("src", "img/boema.jpeg");
            break;
        case 3:
            elemento = "Noites de Haze";
            img.setAttribute("src", "img/boema.jpeg");
            break;
        case 4:
            elemento = "Restos de Terra";
            img.setAttribute("src", "img/brodio.jpeg");
            break;
        case 5:
            elemento = "Lágrimas da Rua";
            img.setAttribute("src", "img/brodio.jpeg");
            break;
        case 6:
            elemento = "Noites Sem Fim";
            img.setAttribute("src", "img/brodio.jpeg");
            break;
        case 7:
            elemento = "Madrugada Serrana";
            img.setAttribute("src", "img/abismo.jpeg");
            break;
        case 8:
            elemento = "Páginas do Passado";
            img.setAttribute("src", "img/abismo.jpeg");
            break;
        case 9:
            elemento = "Cicatrizes da alma";
            img.setAttribute("src", "img/abismo.jpeg");
            break;
    }

    document.getElementById("texto").innerHTML = elemento;
}