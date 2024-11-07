document.addEventListener("click", function (event) {
    if (event.target && event.target.id === "logoutButton") {
        // Remove a sessão do localStorage e sessionStorage
        localStorage.removeItem("userSession");
        sessionStorage.removeItem("userSession");

        // Redireciona para a página inicial deslogada
        window.location.href = "./index.html";
    }
});
