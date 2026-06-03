// 🔹 MODO
let modoActual = "survivor";

// 🔹 DICCIONARIOS DE TRADUCCIÓN (Nombres con espacios y tildes)
const TRADUCCION_PERKS = {
    "ultimoenfrentamiento": "Último Enfrentamiento",
    "caidaequilibrada": "Caída Equilibrada",
    "demuestraloquevales": "Demuestra lo que Vales",
    "cuesteloquecueste": "Cueste lo que Cueste",
    "granadaaturdidora": "Granada Aturdidora",
    "voluntaddehierro": "Voluntad de Hierro",
    "postratamiento": "Postratamiento",
    "velocidadsilenciosa": "Velocidad Silenciosa",
    "minaexplosiva": "Mina Explosiva",
    "giroargumental": "Giro Argumental",
    "construccionduradera": "Construcción Duradera",
    "exitoarrollador": "Éxito Arrollador",
    "sistemadeespionaje": "Sistema de Espionaje",
    "instintodesaqueador": "Instinto de Saqueador",
    "autopreservacion": "Autopreservación",
    "conexionempatica": "Conexión Empática",
    "escalofrios": "Escalofríos",
    "liberacion": "Liberación",
    "luchadepoderes": "Lucha de Poderes",
    "cincopasosadelante": "Cinco Pasos Adelante",
    "estadodeflujo": "Estado de Flujo",
    "adrenalina": "Adrenalina",
    "agilidad": "Agilidad",
    "alerta": "Alerta",
    "autodidacta": "Autodidacta",
    "bailaconmigo": "Baila Conmigo",
    "camaraderia": "Camaradería",
    "dejavu": "Deja Vu",
    "distraccion": "Distracción",
    "dramaturgia": "Dramaturgia",
    "elegancia": "Elegancia",
    "engaño": "Engaño",
    "fajador": "Fajador",
    "fijacion": "Fijación",
    "fuerzainterior": "Fuerza Interior",
    "defrente": "De Frente",
    "golpedecisivo": "Golpe Decisivo",
    "inquebrantable": "Inquebrantable",
    "nosvemos": "Nos Vemos",
    "oportunidades": "Oportunidades",
    "pasion": "Pasión",
    "resiliencia": "Resiliencia",
    "resurgimiento", "Resurgimiento",
    "serenidad": "Serenidad",
    "tenacidad": "Tenacidad",
    "viarapida": "Vía Rápida",
    "vigilia": "Vigilia",
    "despierta": "Despierta"
};

const TRADUCCION_KILLERS = {
    "ghostface": "Ghost Face",
    "deathslinger": "Deathslinger",
    "executioner": "The Executioner",
    "mastermind": "The Mastermind",
    "unknown": "The Unknown",
    "trapper": "The Trapper",
    "wraith": "The Wraith",
    "hillbilly": "The Hillbilly",
    "nurse": "The Nurse",
    "shape": "The Shape",
    "hag": "The Hag",
    "doctor": "The Doctor",
    "huntress": "The Huntress",
    "cannibal": "The Cannibal",
    "nightmare": "The Nightmare",
    "pig": "The Pig",
    "clown": "The Clown",
    "spirit": "The Spirit",
    "legion": "The Legion",
    "plague": "The Plague",
    "demogorgon": "The Demogorgon",
    "oni": "The Oni",
    "blight": "The Blight",
    "twins": "The Twins",
    "trickster": "The Trickster",
    "nemesis": "The Nemesis",
    "artist": "The Artist",
    "onryo": "The Onryo",
    "dredge": "The Dredge",
    "knight": "The Knight",
    "springtrap": "Springtrap",
    "chucky": "Chucky",
    "dracula": "Dracula",
    "ghoul": "The Ghoul"
};

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
    "escalofrios", "liberacion", "luchadepoderes", "nosvemos", "pasion", "elegancia", "cincopasosadelante",
    "estadodeflujo", "ultimoenfrentamiento"
];

let listaMezclada = [];
let seleccionadas = new Set(); 
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 🔹 CAMBIAR MODO
function cambiarModo(modo) {
    modoActual = modo;
    seleccionadas.clear();
    document.getElementById('resultado').className = 'resultado-oculto';
    cargarPerksPredefinidas();
}

// 🔹 VOLUMEN
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
        musicaFondo.loop = true; 
        musicaFondo.volume = 0.02;
        musicaFondo.play().catch(error => {
            console.log("Bloqueo de audio:", error);
        });
    }
}

const risaAudio = new Audio('risa.mp3');
risaAudio.loop = false;
risaAudio.volume = 0.02;

// 🔹 SONIDOS
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

// 🔹 CARGAR PERKS PREDEFINIDAS
function cargarPerksPredefinidas() {
    const contenedor = document.getElementById('mosaico');
    if(!contenedor) return;

    contenedor.innerHTML = ''; 

    const lista = modoActual === "survivor" ? MIS_PERKS : MIS_KILLERS;
    const carpeta = modoActual === "survivor" ? "perks" : "killers";
    const diccionario = modoActual === "survivor" ? TRADUCCION_PERKS : TRADUCCION_KILLERS;

    listaMezclada = [...lista].sort(() => Math.random() - 0.5);

    listaMezclada.forEach((nombre, index) => {
        const div = document.createElement('div');
        div.className = 'perk-card';
        div.id = `perk-${index}`;
        div.style.backgroundImage = `url('${carpeta}/${nombre}.png')`;
        
        // Muestra el nombre bonito en el dataset (para tooltips si usas)
        const nombreBonito = diccionario[nombre] || nombre;
        div.dataset.nombre = nombreBonito;
        
        contenedor.appendChild(div);
    });
}

// 🔹 INICIA LA RULETA
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
    let retraso = 100; 

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

        if (transcurrido > tiempoTotalMinimo * 0.6) {
            retraso *= 1.15; 
        }

        if (transcurrido < tiempoTotalMinimo || retraso < 900) {
            setTimeout(animarConTension, retraso);
        } else {
            setTimeout(() => {
                if (!seleccionadas.has(nuevoIdx)) {
                    cards[nuevoIdx].classList.remove('activa');
                }

                let idxFinal;
                do { 
                    idxFinal = Math.floor(Math.random() * cards.length); 
                } while (idxFinal === nuevoIdx);

                cards[idxFinal].classList.add('activa');
                playTickSound();

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

            }, 1200); 
        }
    }
    animarConTension();
}

// 🔹 FINALIZAR RULETA (Con nombres formateados)
function finalizarRuleta(idx) {
    const nombreOriginal = listaMezclada[idx];
    const carpeta = modoActual === "survivor" ? "perks" : "killers";
    const diccionario = modoActual === "survivor" ? TRADUCCION_PERKS : TRADUCCION_KILLERS;

    // Buscar traducción limpia o usar la original si no existe
    const nombreMostrar = diccionario[nombreOriginal] || nombreOriginal;

    document.getElementById('nombreGanador').innerText = nombreMostrar.toUpperCase();
    document.getElementById('contenedorImagenGanadora').style.backgroundImage =
        `url('${carpeta}/${nombreOriginal}.png')`;

    document.getElementById('resultado').className = 'resultado-visible';
    
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

    let tiempoTotal = 2000;
    let inicio = Date.now();
    let idxActual = 0;

    function animar() {
        idxActual = Math.floor(Math.random() * opciones.length);
        nombre.innerText = opciones[idxActual];

        if (Date.now() - inicio < tiempoTotal) {
            setTimeout(animar, 80);
        } else {
            nombre.innerText = opciones[idxActual];
        }
    }

    setTimeout(() => {
        resultadoDiv.className = 'resultado-visible';
