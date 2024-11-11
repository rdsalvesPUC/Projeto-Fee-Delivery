document.addEventListener("DOMContentLoaded", () => {
    const nextButton = document.querySelector(".primary-outlined a");
    const pontualRadio = document.getElementById("pontual");
    const fixoRadio = document.getElementById("fixo");

    const idEmpresa = 12;

    nextButton.addEventListener("click", async (event) => {
        event.preventDefault();

        let tipoVaga;
        if (pontualRadio.checked) tipoVaga = "pontual";
        else if (fixoRadio.checked) tipoVaga = "fixo";
        else {
            alert("Por favor, selecione uma opção para o tipo de vaga.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/vagas/iniciar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_empresa: idEmpresa,
                    tipo_vaga: tipoVaga
                }),
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem("vagaId", result.id_vaga);
                window.location.href = "../pages/publicar-vaga-descricao.html";
            } else {
                console.error("Erro ao iniciar rascunho:", result.message);
                alert("Ocorreu um erro ao salvar o rascunho da vaga.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao comunicar com o servidor.");
        }
    });
});
