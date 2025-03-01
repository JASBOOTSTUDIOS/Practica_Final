const API_URL = "http://localhost:3000"; // Ajusta la URL según tu servidor

// Manejar el Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const userName = document.getElementById("email").value;
    const userPassword = document.getElementById("password").value;

    
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, userPassword })
            
        });
        
        const data = await res.json();
        // alert(`Esta es la data: ${data.msg}`); 
        if (res.ok) {
            localStorage.setItem("token", data.token); // Guardar token en localStorage
            localStorage.setItem("id", data.id); // Guardar ID en localStorage

            document.getElementById("status").innerText = "Login exitoso, token guardado!";
        } else {
            document.getElementById("status").innerText = "Error: " + data.msg;
        }
    } catch (error) {
        console.error("Error en la solicitud", error);
    }
});
// Cerrar sesion 
function cerrarSesion(){
    localStorage.setItem("token", "");
    localStorage.setItem("id", "");
}

// Obtener perfil protegido
document.getElementById("getProfile").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    
    if (!token) {
        alert("No hay token, inicia sesión primero.");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/profile`, {
            method: "GET",
            headers: { 
                "Authorization": `Bearer ${token}` ,
                id:id
            },
            
        });

        const data = await res.json();
        if (res.ok) {
            // alert(`Usuario: ${data.userName}, Email: ${data.userEmail}`);
            document.getElementById("status").innerText =`Hola ${data.userName}`;
        } else {
            alert("Error: " + data.msg);
        }
    } catch (error) {
        console.error("Error en la solicitud", error);
    }
});