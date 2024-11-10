document.addEventListener('DOMContentLoaded', () => {    
    fetch("../components/footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer-container").innerHTML = data;
        });
    
    fetch("../components/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header-container").innerHTML = data;
    
            // Obtém a sessão do localStorage ou sessionStorage
            const session = JSON.parse(localStorage.getItem('userSession')) || JSON.parse(sessionStorage.getItem('userSession'));
    
            const adminButton = document.getElementById("user-admin");
    
            // Se não houver sessão ou o usuário não for admin, oculta o botão
            if (!session || session.userType !== 'admin') {
                adminButton.style.display = 'none';
            }
        })
        .catch(error => console.error('Erro ao carregar o cabeçalho:', error));
    
    fetch("../components/search-bar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("search").innerHTML = data;
        });
    
    fetch("../components/filters.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("filters").innerHTML = data;
        });
    
    fetch("../components/admin-menu.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("container-menu").innerHTML = data;
        });
    
    function loadCard(container) {
        fetch("../components/card.html")
            .then((response) => response.text())
            .then((data) => {
                container.innerHTML = data;
            });
    }
    
    document.querySelectorAll('.card-container').forEach(container => {
        loadCard(container);
    });

    window.carregarModalEditarEmpresa = function carregarModalEditarEmpresa() {
        return fetch("../components/modal-editar-empresa.html")
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
            })
            .catch(error => console.error('Erro ao carregar o modal de edição:', error));
    }

    window.carregarModalEditarMotoboy = function carregarModalEditarMotoboy() {
        return fetch('../components/modal-editar-motoboy.html')
            .then(response => response.text())
            .then(html => {
                // Adiciona o modal ao corp do HTML
                document.body.insertAdjacentHTML('beforeend', html);
            })
            .catch(error => console.error('Erro ao carregar o modal de edição de motoboy:', error));
    };

});