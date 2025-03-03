const API_URL = "http://localhost:3000"; // Ajusta la URL según tu servidor.

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
        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.id); 
            // window.location.href = "/views/dashboard";
        } else {
            document.getElementById("status").innerText = "Error: " + data.msg;
        }
    } catch (error) {
        console.error("Error en la solicitud", error);
    }
});

function viewDashboard(path){
    window.location.href = path;

}
// Cerrar sesion 
function cerrarSesion(){
    localStorage.setItem("token", "");
    localStorage.setItem("id", "");
}

// Obtener perfil protegido
document.getElementById("getProfile").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    console.log(`token: ${token}`)
    
    if (!token) {
        alert("No hay token, inicia sesión primero.");
        window.location.href = "/views";
        return;
    }
    
    try {
        // const res = await fetch(`${API_URL}/profile`, {
        //     method: "GET",
        //     headers: { 
        //         "Authorization": `Bearer ${token}`,
        //         id:id
        //     },
            
        // });
        
        await fetch(`${API_URL}/views/dashboard`, {
            method: "GET",
            headers: { 
                "Authorization": `Bearer ${token}`,
                id:id
            },
            
        });
    }catch(error){
        console.log(`Este es el error: ${error}`)
    }
        
    //     // const data = await res.json();
    //     console.log(`2. token: ${token}`)
    //     if (res.ok) {
    //         // alert(`Usuario: ${data.userName}, Email: ${data.userEmail}`);
    //         // document.getElementById("status").innerText =`Hola ${data.userName}`;
            
    //     //     fetch("/views/dashboard", {
    //     //     method: "GET",
    //     //     header: { "Authorization": `Bearer ${token}`}
    //     // })
    //     // .then(response => response.json())
    //     // .then(data => {
    //     //     if (data.success) {
    //     //         alert("Sesion Iniciada");
    //     //     } else {
    //     //         localStorage.removeItem("token");
    //     //         window.location.href = "/views/login";
    //     //     }
    //     // });


    //     } else {
    //         alert("Error: " + data.msg);
    //     }
    // } catch (error) {
    //     console.error("Error en la solicitud", error);
    // }
});



// ======================================================
async function isLoged() {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    console.log(token);
    
    if (!token) {
        window.location.href = "/views";
        return;
    }
    try {
                    
        const ver = await fetch("/views/dashboard", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Sesion Iniciada");
            } else {
                localStorage.removeItem("token");
                window.location.href = "/views/login";
            }
        });
        
    } catch (error) {
        console.error("Error en la solicitud", error);
    }
}