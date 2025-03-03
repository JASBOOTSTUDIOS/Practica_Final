async function dashboard() {
    alert("Funciona Bien");

const token = localStorage.getItem("token");
const id = localStorage.getItem("id");
alert(token)
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
        alert(`Usuario: ${data.userName}, Email: ${data.userEmail}`);
        // document.getElementById("status").innerText =`Hola ${data.userName}`;
    } else {
        alert("Error: " + data.msg);
    }
} catch (error) {
    console.error("Error en la solicitud", error);
}
}

dashboard();