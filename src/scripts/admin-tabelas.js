document.addEventListener("DOMContentLoaded", function() {
    const observer = new MutationObserver(() => {
    const empresasMenu = document.getElementById('empresas-menu');
    const motoboysMenu = document.getElementById('motoboys-menu');
    const searchInput = document.getElementById('busca-filtros-dashboard');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        filtrarTabela(query);
    });

    function filtrarTabela(query) {
        const rows = document.querySelectorAll('#table-content > div');
        
        rows.forEach(row => {
            const rowText = row.innerText.toLowerCase();
            row.style.display = rowText.includes(query) ? '' : 'none';
        });
    }

    if (empresasMenu && motoboysMenu) {
        empresasMenu.addEventListener('click', (event) => {
            event.preventDefault();
            carregarEmpresas();
        });

        motoboysMenu.addEventListener('click', (event) => {
            event.preventDefault();
            carregarMotoboys();
        });

        observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Função para formatar a data de nascimento
    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    // Função para configurar o cabeçalho da tabela e o checkbox de seleção total
    function configurarCabecalhoTabela(tabela) {
        const tableHeader = document.getElementById('table-header');
        tableHeader.innerHTML = '';

        const colunas = tabela === 'empresas'
            ? [{ nome: 'Nome da Empresa', largura: 'w-3/12' }, { nome: 'CNPJ', largura: 'w-2/12' }, { nome: 'Inscrição Estadual', largura: 'w-2/12' }, { nome: 'E-mail', largura: 'w-3/12' }, { nome: 'Telefone', largura: 'w-2/12' }]
            : [{ nome: 'Nome', largura: 'w-2/12' }, { nome: 'Sobrenome', largura: 'w-2/12' }, { nome: 'CPF', largura: 'w-2/12' }, { nome: 'MEI', largura: 'w-2/12' }, { nome: 'Data de Nascimento', largura: 'w-2/12' }, { nome: 'Telefone', largura: 'w-2/12' }, { nome: 'E-mail', largura: 'w-2/12' }];

        const checkboxHeader = document.createElement('div');
        checkboxHeader.className = 'px-3 py-4 w-11 flex items-center';
        checkboxHeader.innerHTML = '<input type="checkbox" class="select-all-checkbox" />';
        tableHeader.appendChild(checkboxHeader);

        colunas.forEach(coluna => {
            const headerCell = document.createElement('div');
            headerCell.className = `truncate px-3 py-4 ${coluna.largura}`;
            headerCell.innerHTML = `<span class="th-font">${coluna.nome}</span>`;
            tableHeader.appendChild(headerCell);
        });

        const optionsHeader = document.createElement('div');
        optionsHeader.className = 'px-3 py-4 w-11 flex items-center';
        optionsHeader.innerHTML = '<i class="img-threedots"></i>';
        tableHeader.appendChild(optionsHeader);

        // Evento para o checkbox de seleção total
        document.querySelector('.select-all-checkbox').addEventListener('change', function() {
            const allCheckboxes = document.querySelectorAll('#table-content .row-checkbox');
            allCheckboxes.forEach(checkbox => checkbox.checked = this.checked);
        });
    }

    async function carregarEmpresas() {
        configurarCabecalhoTabela('empresas');
        try {
            const response = await fetch('http://localhost:3000/api/empresas');
            const empresas = await response.json();
            const tableContent = document.getElementById('table-content');
            tableContent.innerHTML = '';

            empresas.forEach(empresa => {
                const row = document.createElement('div');
                row.className = 'flex flex-1 flex-row h-14 bg-white border-coolgray-20 border-t-0';
                row.innerHTML = `
                    <div class="px-3 py-4 flex w-11 items-center"><input type="checkbox" class="row-checkbox" /></div>
                    <div class="truncate px-3 py-4 w-3/12"><span class="tr-font">${empresa.nome_empresa}</span></div>
                    <div class="truncate px-3 py-4 w-2/12"><span class="tr-font">${empresa.cnpj}</span></div>
                    <div class="truncate px-3 py-4 w-2/12"><span class="tr-font">${empresa.inscricao_estadual}</span></div>
                    <div class="truncate px-3 py-4 w-2/12"><span class="tr-font">${empresa.telefone}</span></div>
                    <div class="truncate px-3 py-4 w-3/12"><span class="tr-font">${empresa.email}</span></div>
                    <div class="px-3 py-4 flex w-11 items-center"><i class="img-threedots"></i></div>
                `;
                tableContent.appendChild(row);
            });
        } catch (error) {
            console.error("Erro ao carregar empresas:", error);
        }
    }

    async function carregarMotoboys() {
        configurarCabecalhoTabela('motoboys');
        try {
            const response = await fetch('http://localhost:3000/api/motoboys');
            const motoboys = await response.json();
            const tableContent = document.getElementById('table-content');
            tableContent.innerHTML = '';

            motoboys.forEach(motoboy => {
                const row = document.createElement('div');
                row.className = 'flex flex-1 flex-row h-14 bg-white border-coolgray-20 border-t-0';

                // Formata a data de nascimento
                const dataNascimentoFormatada = formatarData(motoboy.data_nascimento);

                row.innerHTML = `
                    <div class="px-3 py-4 flex w-11 items-center"><input type="checkbox" class="row-checkbox" /></div>
                    <div class="truncate px-3 py-4 w-2/12"><span class="tr-font">${motoboy.nome}</span></div>
                    <div class="truncate px-3 py-4 w-2/12"><span class="tr-font">${motoboy.sobrenome}</span></div>
                    <div class="truncate px-3 py-4 w-2/12"><span class="tr-font">${motoboy.cpf}</span></div>
                    <div class="truncate px-3 py-4 w-2/12"><span class="tr-font">${motoboy.mei}</span></div>
                    <div class="truncate px-3 py-4 w-2/12"><span class="tr-font">${dataNascimentoFormatada}</span></div>
                    <div class="truncate px-3 py-4 w-2/12"><span class="tr-font">${motoboy.telefone}</span></div>
                    <div class="truncate px-3 py-4 w-2/12"><span class="tr-font">${motoboy.email}</span></div>
                    <div class="px-3 py-4 flex w-11 items-center"><i class="img-threedots"></i></div>
                `;
                tableContent.appendChild(row);
            });
        } catch (error) {
            console.error("Erro ao carregar motoboys:", error);
        }
    }
});
