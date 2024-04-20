document.getElementById('logoutLink').addEventListener('click', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de seguir o link

    fetch('/sair', {
        method: 'post'
    })
    .then(response => {
        if (response.ok) {
            console.log("aaaaaaaaaaaaa")
            window.location.href = '/login';
        } else {
            console.error('Erro ao fazer logout');
        }
    })
    .catch(error => {
        console.error('Erro ao fazer logout:', error);
    });
});
