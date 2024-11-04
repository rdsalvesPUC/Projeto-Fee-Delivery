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