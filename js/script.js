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

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const demoCards = document.querySelectorAll('.demo-card');
    const expandAllBtn = document.getElementById('expand-all');
    const collapseAllBtn = document.getElementById('collapse-all');

    // 1. Lógica de Filtrado
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Quitar clase active de todos y ponerla en el clickeado
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            demoCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                    card.classList.remove('expanded'); // Cerrar si se oculta
                    card.querySelector('.demo-toggle').textContent = '+';
                }
            });
        });
    });

    // 2. Lógica de Acordeón (Expandir/Colapsar individual)
    demoCards.forEach(card => {
        const header = card.querySelector('.demo-card-header');
        const toggleIcon = card.querySelector('.demo-toggle');

        header.addEventListener('click', () => {
            card.classList.toggle('expanded');
            toggleIcon.textContent = card.classList.contains('expanded') ? '−' : '+';
        });
    });

    // 3. Expandir Todo / Colapsar Todo
    expandAllBtn.addEventListener('click', () => {
        demoCards.forEach(card => {
            if (card.style.display !== 'none') { // Solo expandir los visibles
                card.classList.add('expanded');
                card.querySelector('.demo-toggle').textContent = '−';
            }
        });
    });

    collapseAllBtn.addEventListener('click', () => {
        demoCards.forEach(card => {
            card.classList.remove('expanded');
            card.querySelector('.demo-toggle').textContent = '+';
        });
    });
});

// LÓGICA DEL TOKENIZER
document.addEventListener('DOMContentLoaded', () => {
    const tokenizeBtn = document.getElementById('tokenize-btn');
    const tokenizerInput = document.getElementById('tokenizer-input');
    const tokenizerOutput = document.getElementById('tokenizer-output');

    if(tokenizeBtn) {
        // Colores pastel para los tokens
        const colors = ['#fca5a5', '#fcd34d', '#86efac', '#93c5fd', '#c4b5fd', '#f9a8d4'];
        
        tokenizeBtn.addEventListener('click', () => {
            const text = tokenizerInput.value || "Generative AI is revolutionizing technology.";
            tokenizerInput.value = text; // Por si estaba vacío
            
            // Expresión regular básica para separar palabras y signos de puntuación
            const tokens = text.match(/\w+|\s+|[^\w\s]+/g) || [];
            
            tokenizerOutput.innerHTML = ''; // Limpiar anterior
            
            tokens.forEach((token, index) => {
                if(token === ' ' || token === '\n') return; // Ignorar espacios en blanco puros
                
                const span = document.createElement('span');
                span.textContent = token;
                // Asignar un color basado en la longitud de la palabra para dar variedad
                span.style.backgroundColor = colors[token.length % colors.length];
                span.style.padding = '2px 6px';
                span.style.borderRadius = '4px';
                span.style.color = '#000';
                tokenizerOutput.appendChild(span);
            });
        });
    }
});

// LÓGICA DE K-MEANS CLUSTERING
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('kmeans-canvas');
    if(!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const generateBtn = document.getElementById('kmeans-generate');
    const stepBtn = document.getElementById('kmeans-step');

    let points = [];
    let centroids = [];
    const k = 3;
    const colors = ['#FF4136', '#0074D9', '#2ECC40'];

    // Generar datos aleatorios
    function initData() {
        points = [];
        centroids = [];
        // Crear 100 puntos aleatorios
        for(let i=0; i<100; i++) {
            points.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, cluster: -1 });
        }
        // Crear K centroides aleatorios
        for(let i=0; i<k; i++) {
            centroids.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, color: colors[i] });
        }
        draw();
    }

    // Dibujar el canvas
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar puntos
        points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = p.cluster === -1 ? '#999' : colors[p.cluster];
            ctx.fill();
        });

        // Dibujar centroides (cuadrados grandes)
        centroids.forEach(c => {
            ctx.fillStyle = c.color;
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.fillRect(c.x - 6, c.y - 6, 12, 12);
            ctx.strokeRect(c.x - 6, c.y - 6, 12, 12);
        });
    }

    // Un paso del algoritmo K-Means
    function step() {
        // 1. Asignar puntos al centroide más cercano
        points.forEach(p => {
            let minDist = Infinity;
            let clusterIndex = -1;
            centroids.forEach((c, i) => {
                const dist = Math.hypot(p.x - c.x, p.y - c.y); // Distancia Euclidiana
                if(dist < minDist) {
                    minDist = dist;
                    clusterIndex = i;
                }
            });
            p.cluster = clusterIndex;
        });

        // 2. Recalcular centroides
        for(let i=0; i<k; i++) {
            const clusterPoints = points.filter(p => p.cluster === i);
            if(clusterPoints.length > 0) {
                const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
                const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
                centroids[i].x = sumX / clusterPoints.length;
                centroids[i].y = sumY / clusterPoints.length;
            }
        }
        draw();
    }

    generateBtn.addEventListener('click', initData);
    stepBtn.addEventListener('click', step);

    // Iniciar con datos por defecto al cargar
    initData();
});

// ==========================================
// DEMO: OBJECT DETECTION (Simulación CV)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('od-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const detectBtn = document.getElementById('od-detect-btn');
    const resetBtn = document.getElementById('od-reset-btn');

    // Escena base (simulando una imagen borrosa de fondo o figuras)
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar un "coche" (rectángulo)
        ctx.fillStyle = '#475569';
        ctx.fillRect(40, 60, 80, 40);
        ctx.fillRect(55, 40, 50, 20);
        ctx.beginPath(); ctx.arc(60, 100, 10, 0, Math.PI*2); ctx.fillStyle = '#0f172a'; ctx.fill();
        ctx.beginPath(); ctx.arc(100, 100, 10, 0, Math.PI*2); ctx.fill();

        // Dibujar una "persona" (círculo y línea)
        ctx.fillStyle = '#ea580c';
        ctx.beginPath(); ctx.arc(220, 50, 12, 0, Math.PI*2); ctx.fill();
        ctx.fillRect(210, 65, 20, 40);
    }

    // Dibujar inferencia
    function runInference() {
        drawScene(); // Redibujar fondo
        ctx.lineWidth = 2;
        ctx.font = "12px monospace";

        // Bounding Box Coche
        ctx.strokeStyle = '#22c55e'; // Verde
        ctx.strokeRect(35, 35, 90, 75);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(35, 20, 75, 15);
        ctx.fillStyle = '#fff';
        ctx.fillText("Car 98%", 38, 32);

        // Bounding Box Persona
        ctx.strokeStyle = '#ef4444'; // Rojo
        ctx.strokeRect(200, 35, 40, 75);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(200, 20, 85, 15);
        ctx.fillStyle = '#fff';
        ctx.fillText("Person 89%", 203, 32);
    }

    drawScene(); // Estado inicial
    detectBtn.addEventListener('click', runInference);
    resetBtn.addEventListener('click', drawScene);
});

// ==========================================
// DEMO: GRADIENT DESCENT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gd-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const stepBtn = document.getElementById('gd-step-btn');
    const resetBtn = document.getElementById('gd-reset-btn');

    let x = -4; // Posición inicial
    const learningRate = 0.8; 

    // Función matemática: f(x) = x^2 (Parábola)
    const f = (x) => x * x;
    // Derivada: f'(x) = 2x
    const df = (x) => 2 * x;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Transformaciones para centrar el gráfico
        const cx = canvas.width / 2;
        const cy = canvas.height - 20;
        const scaleX = 20;
        const scaleY = 5;

        // Dibujar curva
        ctx.beginPath();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        for(let i = -5; i <= 5; i += 0.1) {
            let px = cx + i * scaleX;
            let py = cy - f(i) * scaleY;
            if(i === -5) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Dibujar punto actual (La bola)
        const currentPx = cx + x * scaleX;
        const currentPy = cy - f(x) * scaleY;
        
        ctx.beginPath();
        ctx.arc(currentPx, currentPy, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444'; // Punto rojo
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.stroke();
    }

    function step() {
        x = x - learningRate * df(x); // Fórmula del Gradient Descent
        draw();
    }

    function reset() {
        x = -4; // Volver al inicio
        draw();
    }

    draw();
    stepBtn.addEventListener('click', step);
    resetBtn.addEventListener('click', reset);
});

// ==========================================
// DEMO: ACTIVATION FUNCTIONS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('af-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const select = document.getElementById('af-select');

    function drawGraph(funcType) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const scale = 30;

        // Ejes X e Y
        ctx.beginPath();
        ctx.strokeStyle = '#cbd5e1';
        ctx.moveTo(0, cy); ctx.lineTo(canvas.width, cy); // X
        ctx.moveTo(cx, 0); ctx.lineTo(cx, canvas.height); // Y
        ctx.stroke();

        // Dibujar función seleccionada
        ctx.beginPath();
        ctx.strokeStyle = '#00599C';
        ctx.lineWidth = 3;

        for(let px = 0; px <= canvas.width; px++) {
            let x = (px - cx) / scale;
            let y = 0;

            if(funcType === 'relu') {
                y = Math.max(0, x);
            } else if(funcType === 'sigmoid') {
                y = 1 / (1 + Math.exp(-x));
            } else if(funcType === 'tanh') {
                y = Math.tanh(x);
            }

            let py = cy - y * scale;
            if(px === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
    }

    // Dibujar inicial y escuchar cambios
    drawGraph(select.value);
    select.addEventListener('change', (e) => drawGraph(e.target.value));
});

