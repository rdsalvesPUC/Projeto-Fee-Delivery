// login.js

document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const identificador = document.getElementById('CPF-ou-CNPJ').value;
    const senha = document.getElementById('Senha').value;
    const remember = document.getElementById('remember').checked;

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identificador, senha }),
    });

    const result = await response.json();
    if (response.ok) {
        alert('Login realizado com sucesso!');

        // Armazena a sessão no localStorage se "Salvar dados de acesso" estiver marcado
        if (remember) {
            localStorage.setItem('userSession', JSON.stringify(result.session));
        } else {
            // Armazena a sessão temporária no sessionStorage
            sessionStorage.setItem('userSession', JSON.stringify(result.session));
        }

        // Redireciona para a página logada
        window.location.href = './home-logada.html';
    } else {
        alert('Erro ao fazer login: ' + result.message);
    }
});


document.addEventListener('DOMContentLoaded', (event) => {
    const passwordField = document.getElementById('Senha');
    const togglePassword = document.getElementById('togglePassword');

    togglePassword.addEventListener('click', () => {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        
        togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    });
});