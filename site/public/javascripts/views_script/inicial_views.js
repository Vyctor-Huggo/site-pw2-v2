function texts(x) {
    var elemento;
    var img = document.getElementById("img");

    switch(x) {
        case 1:
            elemento = "Sol e Alegria";
            img.setAttribute("src", "images/Boêmia.jpeg");
            break;
        case 2:
            elemento = "Cultivando Sonhos";
            img.setAttribute("src", "images/Boêmia.jpeg");
            break;
        case 3:
            elemento = "Noites de Haze";
            img.setAttribute("src", "images/Boêmia.jpeg");
            break;
        case 4:
            elemento = "Restos de Terra";
            img.setAttribute("src", "images/Bródio.jpeg");
            break;
        case 5:
            elemento = "Lágrimas da Rua";
            img.setAttribute("src", "images/Bródio.jpeg");
            break;
        case 6:
            elemento = "Noites Sem Fim";
            img.setAttribute("src", "images/Bródio.jpeg");
            break;
        case 7:
            elemento = "Madrugada Serrana";
            img.setAttribute("src", "images/Abismo.jpeg");
            break;
        case 8:
            elemento = "Páginas do Passado";
            img.setAttribute("src", "images/Abismo.jpeg");
            break;
        case 9:
            elemento = "Cicatrizes da alma";
            img.setAttribute("src", "images/Abismo.jpeg");
            break;
    }

    document.getElementById("texto").innerHTML = elemento;
}