/* * Lógica principal de la web (Scroll y Navegación)
 */

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section'); 
    const navLinks = document.querySelectorAll('.sidebar nav ul li a'); 

    function changeActiveLink() {
        let scrollPos = window.scrollY + 50; 
        sections.forEach(section => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                navLinks.forEach(link => {
                    link.classList.remove('active'); 
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('active'); 
                    }
                });
            }
        });
    }

    // Llama a la función cuando se haga scroll
    window.addEventListener('scroll', changeActiveLink);
});

