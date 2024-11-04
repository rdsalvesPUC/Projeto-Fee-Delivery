fetch("../components/footer.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("footer-container").innerHTML = data;
    });

fetch("../components/header.html")
	.then((response) => response.text())
	.then((data) => {
        document.getElementById("header-container").innerHTML = data;
    });

fetch("../components/search-bar.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("search").innerHTML = data;
    });

fetch("../components/filters.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("filters").innerHTML = data;
    });

fetch("../components/admin-menu.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("container-menu").innerHTML = data;
    });

function loadCard(container) {
    fetch("../components/card.html")
        .then((response) => response.text())
        .then((data) => {
            container.innerHTML = data;
        });
}

document.querySelectorAll('.card-container').forEach(container => {
    loadCard(container);
});