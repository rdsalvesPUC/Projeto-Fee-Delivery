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
