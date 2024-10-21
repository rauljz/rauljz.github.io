/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

// Espera a que se cargue el contenido
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section'); // Selecciona todas las secciones
    const navLinks = document.querySelectorAll('.sidebar nav ul li a'); // Selecciona los enlaces de navegación

    function changeActiveLink() {
        let scrollPos = window.scrollY + 50; // Obtén la posición del scroll y añade un offset
        sections.forEach(section => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                navLinks.forEach(link => {
                    link.classList.remove('active'); // Elimina la clase activa de todos los enlaces
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('active'); // Añade la clase activa al enlace correspondiente
                    }
                });
            }
        });
    }

    // Llama a la función cuando se haga scroll
    window.addEventListener('scroll', changeActiveLink);
});



