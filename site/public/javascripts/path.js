var paths = {
    "inicial": "../inicial",
    "ingressos": "/ingressos",
    "loja": "../loja",
    "Signin": "../sign-in",
    "Login": "../login",
    "Perfil": "../perfil",
    "carrinho": "../loja/Carrinho",
    "Pedidos" : "../perfil/pedidos",
    "contatos": "#Footer",
    "instagram": "https://www.instagram.com/gatos_fofos_e_engracados/",
    "twitter": "https://twitter.com/gatinarios"
};


function criarLinks() {
    var links = document.querySelectorAll("a");
    links.forEach(function(link) {
        var keyword = link.getAttribute("data-keyword");
        if (paths[keyword]) {
            link.href = paths[keyword];
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    criarLinks();
    console.log("paths on");
});

