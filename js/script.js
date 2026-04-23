/* * Lógica principal de la web (Scroll y Navegación)
 */

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section'); 
    const navLinks = document.querySelectorAll('.sidebar nav ul li a, .horizontal-nav a');

    function changeActiveLink() {
        let scrollPos = window.scrollY + 130;
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
    changeActiveLink();

    const revealElements = document.querySelectorAll('section, .project-card, .demo-card, .experience-item, .education-item, .certification-item, .highlight-card, .featured-card');
    revealElements.forEach(element => element.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
});

