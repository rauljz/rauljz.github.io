/* =======================================================
 * DEMOS.JS - Lógica interactiva para la sección de Demos
 * ======================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. SISTEMA DE FILTRADO Y ACORDEÓN
    // ----------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const demoCards = document.querySelectorAll('.demo-card');
    const expandAllBtn = document.getElementById('expand-all');
    const collapseAllBtn = document.getElementById('collapse-all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            demoCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                    card.classList.remove('expanded');
                    card.querySelector('.demo-toggle').textContent = '+';
                }
            });
        });
    });

    demoCards.forEach(card => {
        const header = card.querySelector('.demo-card-header');
        const toggleIcon = card.querySelector('.demo-toggle');
        header.addEventListener('click', () => {
            card.classList.toggle('expanded');
            toggleIcon.textContent = card.classList.contains('expanded') ? '−' : '+';
        });
    });

    expandAllBtn.addEventListener('click', () => {
        demoCards.forEach(card => {
            if (card.style.display !== 'none') {
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

    // ----------------------------------------------------
    // 2. K-MEANS CLUSTERING
    // ----------------------------------------------------
    const kmeansCanvas = document.getElementById('kmeans-canvas');
    if (kmeansCanvas) {
        const ctx = kmeansCanvas.getContext('2d');
        const generateBtn = document.getElementById('kmeans-generate');
        const stepBtn = document.getElementById('kmeans-step');

        let points = [], centroids = [];
        const k = 3, colors = ['#FF4136', '#0074D9', '#2ECC40'];

        function initKMeans() {
            points = []; centroids = [];
            for (let i = 0; i < 80; i++) points.push({ x: Math.random() * kmeansCanvas.width, y: Math.random() * kmeansCanvas.height, cluster: -1 });
            for (let i = 0; i < k; i++) centroids.push({ x: Math.random() * kmeansCanvas.width, y: Math.random() * kmeansCanvas.height, color: colors[i] });
            drawKMeans();
        }

        function drawKMeans() {
            ctx.clearRect(0, 0, kmeansCanvas.width, kmeansCanvas.height);
            points.forEach(p => {
                ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = p.cluster === -1 ? '#999' : colors[p.cluster]; ctx.fill();
            });
            centroids.forEach(c => {
                ctx.fillStyle = c.color; ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
                ctx.fillRect(c.x - 6, c.y - 6, 12, 12); ctx.strokeRect(c.x - 6, c.y - 6, 12, 12);
            });
        }

        function stepKMeans() {
            points.forEach(p => {
                let minDist = Infinity, clusterIndex = -1;
                centroids.forEach((c, i) => {
                    const dist = Math.hypot(p.x - c.x, p.y - c.y);
                    if (dist < minDist) { minDist = dist; clusterIndex = i; }
                });
                p.cluster = clusterIndex;
            });
            for (let i = 0; i < k; i++) {
                const clusterPoints = points.filter(p => p.cluster === i);
                if (clusterPoints.length > 0) {
                    centroids[i].x = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
                    centroids[i].y = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
                }
            }
            drawKMeans();
        }
        generateBtn.addEventListener('click', initKMeans);
        stepBtn.addEventListener('click', stepKMeans);
        initKMeans();
    }

    // ----------------------------------------------------
    // 3. TEXT TOKENIZER (Versión Avanzada con IDs)
    // ----------------------------------------------------
    const tokenizeBtn = document.getElementById('tokenize-btn');
    if (tokenizeBtn) {
        const tokenizerInput = document.getElementById('tokenizer-input');
        const tokenizerOutput = document.getElementById('tokenizer-output');
        const colors = ['#fca5a5', '#fcd34d', '#86efac', '#93c5fd', '#c4b5fd', '#f9a8d4'];

        tokenizeBtn.addEventListener('click', () => {
            const text = tokenizerInput.value || "Generative AI is revolutionizing technology.";
            tokenizerInput.value = text;
            const tokens = text.match(/\w+|\s+|[^\w\s]+/g) || [];
            
            tokenizerOutput.innerHTML = '';
            tokens.forEach((token) => {
                if (token.trim() === '') return;
                
                const box = document.createElement('div');
                box.style.display = 'flex'; box.style.flexDirection = 'column'; box.style.alignItems = 'center';
                box.style.backgroundColor = colors[token.length % colors.length];
                box.style.padding = '4px 8px'; box.style.borderRadius = '6px';
                
                const tSpan = document.createElement('span');
                tSpan.textContent = token; tSpan.style.fontWeight = 'bold'; tSpan.style.color = '#000';
                
                let fakeId = 0;
                for (let i = 0; i < token.length; i++) fakeId += token.charCodeAt(i) * (i + 1);
                fakeId = (fakeId * 137) % 50000 + 10000;
                
                const idSpan = document.createElement('span');
                idSpan.textContent = fakeId; idSpan.style.fontSize = '11px'; idSpan.style.fontFamily = 'monospace'; idSpan.style.color = '#333';
                
                box.appendChild(tSpan); box.appendChild(idSpan);
                tokenizerOutput.appendChild(box);
            });
        });
    }

    // ----------------------------------------------------
    // 4. OBJECT DETECTION
    // ----------------------------------------------------
    const odCanvas = document.getElementById('od-canvas');
    if (odCanvas) {
        const ctx = odCanvas.getContext('2d');
        const detectBtn = document.getElementById('od-detect-btn');
        const resetBtn = document.getElementById('od-reset-btn');

        function drawSceneOD() {
            ctx.clearRect(0, 0, odCanvas.width, odCanvas.height);
            ctx.fillStyle = '#475569'; ctx.fillRect(40, 60, 80, 40); ctx.fillRect(55, 40, 50, 20);
            ctx.beginPath(); ctx.arc(60, 100, 10, 0, Math.PI * 2); ctx.fillStyle = '#0f172a'; ctx.fill();
            ctx.beginPath(); ctx.arc(100, 100, 10, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ea580c'; ctx.beginPath(); ctx.arc(220, 50, 12, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(210, 65, 20, 40);
        }

        function runInferenceOD() {
            drawSceneOD();
            ctx.lineWidth = 2; ctx.font = "bold 12px Arial";
            // Car
            ctx.strokeStyle = '#22c55e'; ctx.strokeRect(35, 35, 90, 75);
            ctx.fillStyle = '#22c55e'; ctx.fillRect(35, 18, 65, 17);
            ctx.fillStyle = '#fff'; ctx.fillText("Car 98%", 38, 30);
            // Person
            ctx.strokeStyle = '#ef4444'; ctx.strokeRect(200, 35, 40, 75);
            ctx.fillStyle = '#ef4444'; ctx.fillRect(200, 18, 80, 17);
            ctx.fillStyle = '#fff'; ctx.fillText("Person 89%", 203, 30);
        }
        detectBtn.addEventListener('click', runInferenceOD);
        resetBtn.addEventListener('click', drawSceneOD);
        drawSceneOD();
    }

    // ----------------------------------------------------
    // 5. GRADIENT DESCENT
    // ----------------------------------------------------
    const gdCanvas = document.getElementById('gd-canvas');
    if (gdCanvas) {
        const ctx = gdCanvas.getContext('2d');
        let x = -4; 
        const f = (x) => x * x, df = (x) => 2 * x;

        function drawGD() {
            ctx.clearRect(0, 0, gdCanvas.width, gdCanvas.height);
            const cx = gdCanvas.width / 2, cy = gdCanvas.height - 20, scaleX = 20, scaleY = 5;
            ctx.beginPath(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
            for (let i = -5; i <= 5; i += 0.1) {
                let px = cx + i * scaleX, py = cy - f(i) * scaleY;
                if (i === -5) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
            ctx.beginPath(); ctx.arc(cx + x * scaleX, cy - f(x) * scaleY, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#ef4444'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.stroke();
        }
        document.getElementById('gd-step-btn').addEventListener('click', () => { x = x - 0.8 * df(x); drawGD(); });
        document.getElementById('gd-reset-btn').addEventListener('click', () => { x = -4; drawGD(); });
        drawGD();
    }

    // ----------------------------------------------------
    // 6. ACTIVATION FUNCTIONS
    // ----------------------------------------------------
    const afCanvas = document.getElementById('af-canvas');
    if (afCanvas) {
        const ctx = afCanvas.getContext('2d');
        const select = document.getElementById('af-select');

        function drawAF(type) {
            ctx.clearRect(0, 0, afCanvas.width, afCanvas.height);
            const cx = afCanvas.width / 2, cy = afCanvas.height / 2, scale = 30;
            ctx.beginPath(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1;
            ctx.moveTo(0, cy); ctx.lineTo(afCanvas.width, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, afCanvas.height); ctx.stroke();

            ctx.beginPath(); ctx.strokeStyle = '#00599C'; ctx.lineWidth = 3;
            for (let px = 0; px <= afCanvas.width; px++) {
                let x = (px - cx) / scale, y = 0;
                if (type === 'relu') y = Math.max(0, x);
                else if (type === 'sigmoid') y = 1 / (1 + Math.exp(-x));
                else if (type === 'tanh') y = Math.tanh(x);
                let py = cy - y * scale;
                if (px === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
        }
        select.addEventListener('change', (e) => drawAF(e.target.value));
        drawAF(select.value);
    }

    // ----------------------------------------------------
    // 7. RAG PIPELINE (Retrieval-Augmented Generation)
    // ----------------------------------------------------
    const ragBtn = document.getElementById('rag-btn');
    if (ragBtn) {
        const ragInput = document.getElementById('rag-input');
        const step1 = document.getElementById('rag-step1');
        const step2 = document.getElementById('rag-step2');
        const ctxSpan = document.getElementById('rag-context');
        const outSpan = document.getElementById('rag-output');

        // Fake Vector DB Knowledge
        const knowledgeBase = [
            { keywords: ['where', 'work', 'location', 'zaragoza'], text: "He works in Zaragoza." },
            { keywords: ['who', 'what', 'engineer'], text: "Raúl is an AI Engineer." },
            { keywords: ['special', 'skill', 'mlops'], text: "He specializes in MLOps." }
        ];

        ragBtn.addEventListener('click', () => {
            const query = ragInput.value.toLowerCase();
            step1.style.display = 'none';
            step2.style.display = 'none';
            
            ragBtn.textContent = "Searching Vector DB...";
            ragBtn.style.opacity = "0.7";

            setTimeout(() => {
                // Semantic Search Simulation
                let retrieved = "I don't have information about that in my database.";
                for (let doc of knowledgeBase) {
                    if (doc.keywords.some(kw => query.includes(kw))) {
                        retrieved = doc.text;
                        break;
                    }
                }

                step1.style.display = 'block';
                ctxSpan.textContent = `"${retrieved}"`;
                ragBtn.textContent = "Generating Answer...";

                setTimeout(() => {
                    step2.style.display = 'block';
                    if (retrieved.includes("don't have")) {
                        outSpan.textContent = "I'm sorry, I can only answer based on the retrieved context, and I don't see the answer there.";
                    } else {
                        outSpan.textContent = `Based on the context retrieved, ${retrieved.charAt(0).toLowerCase() + retrieved.slice(1)}`;
                    }
                    ragBtn.textContent = "Run RAG Pipeline";
                    ragBtn.style.opacity = "1";
                }, 1000);

            }, 800);
        });
    }

    // ----------------------------------------------------
    // 8. CNN CONVOLUTIONS (Computer Vision)
    // ----------------------------------------------------
    const convCanvas = document.getElementById('conv-canvas');
    if (convCanvas) {
        const ctx = convCanvas.getContext('2d');
        const w = convCanvas.width, h = convCanvas.height;
        let originalImageData;

        // Draw a simple geometric scene
        function drawOriginal() {
            ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#e2e8f0'; ctx.fillRect(20, 20, 60, 60);
            ctx.beginPath(); ctx.arc(100, 100, 30, 0, Math.PI * 2); ctx.fillStyle = '#94a3b8'; ctx.fill();
            ctx.lineWidth = 10; ctx.strokeStyle = '#334155'; ctx.strokeRect(40, 80, 40, 40);
            originalImageData = ctx.getImageData(0, 0, w, h);
        }

        // Mathematical Filters
        const filters = {
            'edge': [ -1, -1, -1,  -1,  8, -1,  -1, -1, -1 ],
            'sharpen': [ 0, -1, 0,  -1, 5, -1,  0, -1, 0 ]
        };

        function applyConvolution(kernel) {
            drawOriginal(); // Reset first
            const src = originalImageData.data;
            const output = ctx.createImageData(w, h);
            const dst = output.data;
            const side = Math.round(Math.sqrt(kernel.length));
            const halfSide = Math.floor(side / 2);

            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const dstOff = (y * w + x) * 4;
                    let r = 0, g = 0, b = 0;

                    for (let cy = 0; cy < side; cy++) {
                        for (let cx = 0; cx < side; cx++) {
                            const scy = y + cy - halfSide;
                            const scx = x + cx - halfSide;
                            if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                                const srcOff = (scy * w + scx) * 4;
                                const wt = kernel[cy * side + cx];
                                r += src[srcOff] * wt;
                                g += src[srcOff + 1] * wt;
                                b += src[srcOff + 2] * wt;
                            }
                        }
                    }
                    dst[dstOff] = r; dst[dstOff + 1] = g; dst[dstOff + 2] = b;
                    dst[dstOff + 3] = 255; // Alpha
                }
            }
            ctx.putImageData(output, 0, 0);
        }

        document.querySelectorAll('.conv-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const f = e.target.getAttribute('data-filter');
                if (f === 'original') drawOriginal();
                else applyConvolution(filters[f]);
            });
        });

        drawOriginal(); // Init
    }
});