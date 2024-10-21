/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
var modal = document.getElementById("loginModal");
var loginForm = document.getElementById('loginForm');
var btn = document.getElementById("openModalButton");
var span = document.getElementsByClassName("close-button")[0];

// Abrir el modal al hacer clic en "Iniciar Sesión"
btn.onclick = function () {
    modal.style.display = "block";
};

// Cerrar el modal al hacer clic en la "X"
span.onclick = function () {
    modal.style.display = "none";
};

// Cerrar el modal si el usuario hace clic fuera del contenido del modal
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
        return parts.pop().split(';').shift();
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=0; path=/'; // Elimina la cookie
}

window.onload = function () {
    // Verifica si la cookie 'userLoggedIn' está presente y su valor es 'true'
    const isLoggedIn = getCookie('userLoggedIn') === 'true';

    if (isLoggedIn) {
        // Si está autenticado, muestra los botones de administración y el de cerrar sesión
        document.getElementById('adminButtons').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'block';
        document.getElementById('openModalButton').style.display = 'none';
    } else {
        // Si no está autenticado, muestra solo el botón de iniciar sesión
        document.getElementById('adminButtons').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('openModalButton').style.display = 'block';
    }

    // Añade el comportamiento del botón de "Cerrar Sesión"
    document.getElementById('logoutButton').addEventListener('click', function () {
        // Elimina la cookie de sesión al cerrar sesión
        deleteCookie('userLoggedIn');
        // Oculta los botones de administración y muestra el de iniciar sesión
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('adminButtons').style.display = 'none';
        document.getElementById('openModalButton').style.display = 'block';
    });
};



// Manejar el clic en el botón de envío
document.querySelector('.btn').onclick = function (event) {
    event.preventDefault(); // Evita comportamiento por defecto.
    document.getElementById('loginForm').submit(); // Dispara el submit.
};










