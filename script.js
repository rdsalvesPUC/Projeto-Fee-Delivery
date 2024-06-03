fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("footer-container").innerHTML = data;
    });

fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("header-container").innerHTML = data;
    });

fetch("search-bar.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("search").innerHTML = data;
    });

fetch("filters.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("filters").innerHTML = data;
    });

function loadCard(container) {
    fetch("card.html")
        .then((response) => response.text())
        .then((data) => {
            container.innerHTML = data;
        });
}

document.querySelectorAll('.card-container').forEach(container => {
    loadCard(container);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const passwordField = document.getElementById('Senha');
    const togglePassword = document.getElementById('togglePassword');

    togglePassword.addEventListener('click', () => {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        
        // Mudar o ícone conforme a visibilidade da senha
        togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    });
});
