document.addEventListener("DOMContentLoaded", async function () {
    const cardContainer = document.querySelector(".orientation-row table");

    try {
        const response = await fetch("http://localhost:3000/api/vagas");
        const vagas = await response.json();

        // Limite de 3 cards por linha
        let row;
        vagas.forEach((vaga, index) => {
            // A cada 3 vagas, cria uma nova linha na tabela
            if (index % 3 === 0) {
                row = document.createElement("tr");
                cardContainer.appendChild(row);
            }

            // Cria o card para cada vaga
            const cell = document.createElement("td");
            cell.innerHTML = `
                <div class="content-box">
                    <div class="content-img">
                        <i class="card-content-img"></i>
                        <div class="content-icon">
                            <i class="card-fav-icon"></i>
                        </div>
                    </div>
                    <div class="content-body">
                        <div class="columm">
                            <div id="nome_empresa">${vaga.nome_empresa}</div>
                            <h2 id="vaga-titulo">${vaga.titulo}</h2>
                        </div>
                        <p id="vaga-descricao">${vaga.descricao.substring(0, 100)}...</p>
                        <div class="flex flex-row w-full justify-between">
                            <div id="tip-vaga" class="text-base font-semibold text-black">${vaga.tipo_vaga}</div>
                            <div id="horarios" class="text-base font-semibold text-black">${vaga.horario_inicio} / ${vaga.horario_fim}</div>
                        </div>
                        <div class="flex flex-row gap-2">
                            <div class="text-base font-semibold text-black">É necessário ter:</div>
                            <div id="ear-mei">${vaga.requisito_ear ? "EAR" : ""} ${vaga.requisito_mei ? (vaga.requisito_ear ? " - MEI" : "MEI") : ""}</div>
                        </div>
                        <div class="flex flex-row gap-2">
                            <div class="text-base font-semibold text-black">Pagamento:</div>
                            <div id="forma_pagamento">${vaga.forma_pagamento}</div>
                        </div>
                        <div class="flex flex-row gap-2">
                            <div class="text-base font-semibold text-black">Valor:</div>
                            <div id="valor">R$ ${vaga.valor}</div>
                        </div>
                        <div class="button-row">
                            <button data-text="Button Text" class="primary-filled">
                                <a href=""><span class="button-text content-button">Aplicar para vaga</span></a>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            row.appendChild(cell);
        });
    } catch (error) {
        console.error("Erro ao carregar vagas:", error);
    }
});
