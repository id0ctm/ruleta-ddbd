// 🔹 MODO
let modoActual = "survivor";

// 🔹 KILLERS
const MIS_KILLERS = [
    "trapper","wraith","hillbilly","nurse","shape",
    "hag","doctor","huntress","cannibal","nightmare",
    "pig","clown","spirit","legion","plague",
    "ghostface","demogorgon","oni","deathslinger",
    "executioner","blight","twins","trickster",
    "nemesis","artist","onryo",
    "dredge","mastermind","knight","springtrap",
    "chucky","dracula","unknown","ghoul"
];

// 🔹 CAMBIAR MODO
function cambiarModo(modo) {
    modoActual = modo;
    seleccionadas.clear();
    document.getElementById('resultado').className = 'resultado-oculto';
    cargarPerksPredefinidas(); // 👈 reutilizamos tu función original
}

// 🔹 VOLUMEN (sin romper nada)
const volumenSlider = document.getElementById('volumenControl');

if (volumenSlider) {
    volumenSlider.addEventListener('input', (e) => {
        const vol = e.target.value;
        if (musicaFondo) musicaFondo.volume = vol;
        risaAudio.volume = vol * 0.2;
    });
}

// 🔹 AUDIO ORIGINAL
const musicaFondo = document.getElementById('musicaFondo');

function reproducirMusica() {
    if (musicaFondo && musicaFondo.paused) {
        musicaFondo.loop = true; // 🔁 Esto asegura que siga sonando siempre
        musicaFondo.volume = 0.02;
        musicaFondo.play().catch(error => {
            console.log("Bloqueo de audio:", error);
        });
    }
}

const risaAudio = new Audio('risa.mp3');
risaAudio.loop = false;
risaAudio.volume = 0.02;

// 🔹 PERKS ORIGINALES
const MIS_PERKS = [
    "tenacidad", "resiliencia", "caidaequilibrada", "fajador", "adrenalina", 
    "cuesteloquecueste", "dejavu", "distraccion", "oportunidades", "granadaaturdidora", 
    "voluntaddehierro", "esprint", "alerta", "demuestraloquevales", "postratamiento", 
    "autodidacta", "bailaconmigo", "fijacion", "serenidad", "fuerzainterior", 
    "defrente", "golpedecisivo", "velocidadsilenciosa", "minaexplosiva", "giroargumental", 
    "inquebrantable", "construccionduradera", "dramaturgia", "exitoarrollador", "agilidad", 
    "engaño", "resurgimiento", "despierta", "viarapida", "sistemadeespionaje", 
    "vigilia", "instintodesaqueador", "autopreservacion", "camaraderia", "conexionempatica", 
    "escalofrios", "liberacion", "luchadepoderes", "nosvemos", "pasion", "elegancia", "cincopasosadelante", "estadodeflujo"
];

let listaMezclada = [];
let seleccionadas = new Set(); 
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 🔹 SONIDOS (igual)
function playTickSound() {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

function playSuccessSound() {
    const notas = [440, 554, 659];
    notas.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + (i * 0.1));
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime + (i * 0.1));
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + (i * 0.1) + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + (i * 0.1));
        osc.stop(audioCtx.currentTime + (i * 0.1) + 0.5);
    });
}

// 🔹 TU FUNCIÓN ORIGINAL (MODIFICADA SOLO AQUÍ)
function cargarPerksPredefinidas() {
    const contenedor = document.getElementById('mosaico');
    if(!contenedor) return;

    contenedor.innerHTML = ''; 

    // 👇 SOLO ESTO CAMBIA
    const lista = modoActual === "survivor" ? MIS_PERKS : MIS_KILLERS;
    const carpeta = modoActual === "survivor" ? "perks" : "killers";

    listaMezclada = [...lista].sort(() => Math.random() - 0.5);

    listaMezclada.forEach((nombre, index) => {
        const div = document.createElement('div');
        div.className = 'perk-card';
        div.id = `perk-${index}`;
        div.style.backgroundImage = `url('${carpeta}/${nombre}.png')`;
        div.dataset.nombre = nombre.replace(/([A-Z])/g, ' $1').trim();
        contenedor.appendChild(div);
    });
}

//🔹 INICIA LA RULETA
function iniciarRuletaAleatoria() {
    document.getElementById('mosaico').classList.add('ruleta-activa');
    reproducirMusica();
    risaAudio.currentTime = 0;
    risaAudio.play();

    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const cards = document.querySelectorAll('.perk-card');
    const btn = document.getElementById('btnGirar');
    let tiempoInput = parseFloat(document.getElementById('inputTiempo').value);
    const tiempoTotalMinimo = (isNaN(tiempoInput) || tiempoInput <= 0 ? 3 : tiempoInput) * 1000; 
    
    document.getElementById('resultado').className = 'resultado-oculto';
    btn.disabled = true;

    const inicio = Date.now();
    let ultimaCardIdx = -1;
    
    // 🚀 INICIO ULTRA RÁPIDO (Tu ajuste de 10)
    let retraso = 10; 

    function animarConTension() {
        if (ultimaCardIdx !== -1) {
            if (!seleccionadas.has(ultimaCardIdx)) {
                cards[ultimaCardIdx].classList.remove('activa');
            }
        }

        let nuevoIdx;
        do { 
            nuevoIdx = Math.floor(Math.random() * cards.length); 
        } while (nuevoIdx === ultimaCardIdx);

        cards[nuevoIdx].classList.add('activa');
        playTickSound();
        ultimaCardIdx = nuevoIdx;

        let transcurrido = Date.now() - inicio;

        // 📈 FRENO PROGRESIVO
        if (transcurrido > tiempoTotalMinimo * 0.6) {
            retraso *= 1.15; 
        }

        // Condición de parada para el bucle principal (cuando llega a 900ms de lentitud)
        if (transcurrido < tiempoTotalMinimo || retraso < 900) {
            setTimeout(animarConTension, retraso);
        } else {
            // 🎭 EL TOQUE FINAL DE SUSPENSO (EL ENGAÑO)
            // Se queda "congelado" en la penúltima carta por 1.2 segundos
            setTimeout(() => {
                
                // Quitamos el brillo de la carta donde parecía que iba a quedar
                if (!seleccionadas.has(nuevoIdx)) {
                    cards[nuevoIdx].classList.remove('activa');
                }

                // Hacemos el SALTO FINAL inesperado
                let idxFinal;
                do { 
                    idxFinal = Math.floor(Math.random() * cards.length); 
                } while (idxFinal === nuevoIdx);

                cards[idxFinal].classList.add('activa');
                playTickSound(); // Último sonido de confirmación

                // Pausa de medio segundo antes de procesar el resultado definitivo
                setTimeout(() => {
                    if (seleccionadas.has(idxFinal)) {
                        seleccionadas.delete(idxFinal);
                        cards[idxFinal].classList.remove('activa');
                    } else {
                        seleccionadas.add(idxFinal);
                        cards[idxFinal].classList.add('activa');
                    }

                    finalizarRuleta(idxFinal);
                    document.getElementById('mosaico').classList.remove('ruleta-activa');
                    risaAudio.pause();
                    risaAudio.currentTime = 0;
                    playSuccessSound();
                    btn.disabled = false;
                }, 500);

            }, 1200); // ⏱️ Duración del "engaño" antes del último salto
        }
    }
    animarConTension();
}
// 🔹 RESTO IGUAL
function finalizarRuleta(idx) {
    const nombre = listaMezclada[idx];
    const carpeta = modoActual === "survivor" ? "perks" : "killers";

    document.getElementById('nombreGanador').innerText = nombre.toUpperCase();
    document.getElementById('contenedorImagenGanadora').style.backgroundImage =
        `url('${carpeta}/${nombre}.png')`;

    document.getElementById('resultado').className = 'resultado-visible';
    // 🔽 SOLO PARA KILLER
    if (modoActual === "killer") {
        ruletaCantidadPerksKiller();
    }
}

function cerrarResultado() {
    document.getElementById('resultado').className = 'resultado-oculto';
}

function reiniciarBuild() {
    document.getElementById('btnGirar').disabled = false;
    risaAudio.pause();
    risaAudio.currentTime = 0;
    seleccionadas.clear();
    document.querySelectorAll('.perk-card').forEach(c => c.classList.remove('activa'));
}

function mezclarPerks() {
    seleccionadas.clear();
    cargarPerksPredefinidas();
}

function ruletaCantidadPerksKiller() {
    const opciones = ["0 PERKS", "1 PERK", "2 PERKS", "3 PERKS", "4 PERKS"];
    const resultadoDiv = document.getElementById('resultado');
    const nombre = document.getElementById('nombreGanador');
    const imagen = document.getElementById('contenedorImagenGanadora');

    let tiempoTotal = 2000;
    let inicio = Date.now();
    let idxActual = 0;

    function animar() {
        idxActual = Math.floor(Math.random() * opciones.length);
        nombre.innerText = opciones[idxActual];

        if (Date.now() - inicio < tiempoTotal) {
            setTimeout(animar, 80);
        } else {
            // resultado final
            nombre.innerText = opciones[idxActual];
        }
    }

    // pequeño delay para que primero veas el killer
    setTimeout(() => {
        resultadoDiv.className = 'resultado-visible';
        animar();
    }, 800);
}
