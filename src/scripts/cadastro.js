function formatarDataParaMySQL(data) {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
}

async function cadastrarEmpresa(event) {
    event.preventDefault();

    // Captura os dados do formulário de empresa
    const nomeEmpresa = document.getElementById('nome-empresa').value;
    const cnpj = document.getElementById('cnpj').value;
    const telefone = document.getElementById('telefone').value;
    const inscricaoEstadual = document.getElementById('estadual').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const aceitoTermos = document.getElementById('aceitotermos').checked;

    // Envia os dados para o servidor usando Fetch API
    const response = await fetch('http://localhost:3000/api/cadastro-empresa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nomeEmpresa,
            cnpj,
            telefone,
            inscricaoEstadual,
            email,
            senha,
            aceitoTermos
        }),
    });

    // Verifica a resposta do servidor
    const result = await response.json();
    if (response.ok) {
        alert('Cadastro de empresa realizado com sucesso!');
        window.location.href = './cadastro-concluido.html';
    } else {
        alert('Erro ao cadastrar empresa: ' + result.message);
    }
}

// Função para enviar os dados para o cadastro de motoboys
async function cadastrarMotoboy(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const CPF = document.getElementById('CPF').value;
    const MEI = document.getElementById('MEI').value;
    const dataNascimento = formatarDataParaMySQL(document.getElementById('idade').value);
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const aceitoTermos = document.getElementById('aceitotermos').checked;

    const response = await fetch('http://localhost:3000/api/cadastro-motoboy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome,
            sobrenome,
            CPF,
            MEI,
            dataNascimento,
            telefone,
            email,
            senha,
            aceitoTermos
        }),
    });

    const result = await response.json();
    if (response.ok) {
        alert('Cadastro de motoboy realizado com sucesso!');
        window.location.href = './cadastro-concluido.html';
    } else {
        alert('Erro ao cadastrar motoboy: ' + result.message);
    }
}

// Detecta o formulário e adiciona o event listener correspondente
const formCadastroEmpresa = document.getElementById('formCadastroEmpresa');
const formCadastroMotoboy = document.getElementById('formCadastroMotoboy');

if (formCadastroEmpresa) {
    formCadastroEmpresa.addEventListener('submit', cadastrarEmpresa);
}

if (formCadastroMotoboy) {
    formCadastroMotoboy.addEventListener('submit', cadastrarMotoboy);
}
