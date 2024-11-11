document.addEventListener("DOMContentLoaded", () => {
    const nextButton = document.querySelector(".primary-outlined a");

    nextButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const idVaga = localStorage.getItem("vagaId");
        if (!idVaga) {
            alert("Erro: Vaga não iniciada corretamente.");
            return;
        }

        const titulo = document.getElementById("titulo").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        const endereco = document.getElementById("endereco").value.trim();
        const numero = document.getElementById("numero").value.trim();
        const dataInicio = document.querySelector("input[name='Data Inicial']").value;
        const dataFim = document.querySelector("input[name='Data Final']").value;
        const horarioInicio = document.querySelector("input[name='Inicio']").value;
        const horarioFim = document.querySelector("input[name='Final']").value;

        try {
            const response = await fetch(`http://localhost:3000/api/vagas/${idVaga}/descricao`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    titulo,
                    descricao,
                    endereco,
                    numero,
                    data_inicio: dataInicio,
                    data_fim: dataFim,
                    horario_inicio: horarioInicio,
                    horario_fim: horarioFim,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                window.location.href = "../pages/publicar-vaga-requisitos.html";
            } else {
                console.error("Erro ao atualizar rascunho:", result.message);
                alert("Ocorreu um erro ao salvar os detalhes da vaga.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao comunicar com o servidor.");
        }
    });
});
