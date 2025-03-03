document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const path = link.getAttribute("href");

            fetch(path)
                .then(response => response.text())
                .then(html => {
                    document.getElementById("app").innerHTML = html;
                    window.history.pushState({}, "", path);
                })
                .catch(err => console.error("Error cargando la vista:", err));
        });
    });

    // Manejar botón "Atrás" del navegador
    window.addEventListener("popstate", () => {
        fetch(window.location.pathname)
            .then(response => response.text())
            .then(html => {
                document.getElementById("app").innerHTML = html;
            });
    });
});

function viewDashboard(path){
    fetch(path)
    .then(response => response.text())
    .then(html => {
        document.getElementById("app").innerHTML = html;
        window.history.pushState({}, "", path);
    })
    .catch(err => console.error("Error cargando la vista:", err));
}
