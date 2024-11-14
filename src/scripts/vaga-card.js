document.addEventListener("DOMContentLoaded", function () {
    async function exibirVaga(idVaga) {
        try {
            // Fetch para obter dados da vaga
            const response = await fetch(`http://localhost:3000/api/vagas/${idVaga}`);
			const vaga = await response.json();
			
            if (vaga) {
                const responseEmpresa = await fetch(`http://localhost:3000/api/empresas/${vaga.id_empresa}`);
				const empresa = await responseEmpresa.json();
                document.getElementById("nome_empresa").textContent = empresa.nome_empresa || "Empresa Não Informada";

                // Título e Descrição com truncamento
                document.getElementById("vaga-titulo").textContent = vaga.titulo;
                document.getElementById("vaga-descricao").textContent =
                    vaga.descricao.length > 100 ? vaga.descricao.substring(0, 100) + "..." : vaga.descricao;

                // Tipo de vaga e horário formatado
                document.getElementById("tip-vaga").textContent = vaga.tipo_vaga.charAt(0).toUpperCase() + vaga.tipo_vaga.slice(1);
                document.getElementById("horarios").textContent = `${vaga.horario_inicio} / ${vaga.horario_fim}`;

                // EAR e MEI requisitos
                const requisitos = [];
                if (vaga.requisito_ear) requisitos.push("EAR");
                if (vaga.requisito_mei) requisitos.push("MEI");

                const requisitosElement = document.getElementById("ear-mei");
                if (requisitos.length > 0) {
                    requisitosElement.textContent = requisitos.join(" - ");
                } else {
                    requisitosElement.style.display = "none";
                }

                // Pagamento e Valor formatados
                document.getElementById("forma_pagamento").textContent = vaga.forma_pagamento;
                document.getElementById("valor").textContent = `R$ ${parseFloat(vaga.valor).toFixed(2).replace(".", ",")}`;
            }
        } catch (error) {
            console.error("Erro ao buscar dados da vaga:", error);
        }
    }

    // Chamando a função com um ID de vaga específico (exemplo)
    exibirVaga(1); // Substitua "1" pelo idVaga desejado
});
