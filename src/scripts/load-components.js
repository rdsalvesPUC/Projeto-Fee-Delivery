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

            const session = JSON.parse(localStorage.getItem('userSession')) || JSON.parse(sessionStorage.getItem('userSession'));
    
            if (session && session.userType !== 'admin') {
                document.getElementById("user-admin").style.display = 'none';
            }
        }).catch(error => console.error('Erro ao carregar o cabeçalho:', error));
    
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
});