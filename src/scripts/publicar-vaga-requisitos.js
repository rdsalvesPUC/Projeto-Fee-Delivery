document.addEventListener("DOMContentLoaded", () => {
    const publicarButton = document.querySelector(".primary-filled a");

    publicarButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const idVaga = localStorage.getItem("vagaId");
        if (!idVaga) {
            alert("Erro: Vaga não iniciada corretamente.");
            return;
        }

        const requisitoEar = document.getElementById("possuirEAR").checked;
        const requisitoMei = document.getElementById("possuirMEI").checked;
        const formaPagamento = document.getElementById("forma-pagamento").value;
        const valor = parseFloat(document.getElementById("valor").value.replace("R$", "").replace(",", "."));

        try {
            const response = await fetch(`http://localhost:3000/api/vagas/${idVaga}/requisitos`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requisito_ear: requisitoEar,
                    requisito_mei: requisitoMei,
                    forma_pagamento: formaPagamento,
                    valor: valor,
                    status_publicacao: "publicada"
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Vaga publicada com sucesso!");
                localStorage.removeItem("vagaId");
                window.location.href = "../pages/home-logada.html";
            } else {
                console.error("Erro ao salvar requisitos da vaga:", result.message);
                alert("Erro ao salvar os requisitos da vaga.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao comunicar com o servidor.");
        }
    });
});