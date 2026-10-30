
const scene = document.getElementById('scene');
const openButton = document.getElementById('openButton');
const closeButton = document.getElementById('closeButton');
const overlay = document.getElementById('letterOverlay');
const paper = document.getElementById('paper');
const heartsContainer = document.getElementById('backgroundHearts');

let isOpening = false;
let heartsInterval = null;

// Crear pequeños corazones flotantes
function createHeart() {
    const heart = document.createElement('span');

    heart.className = 'floating-heart';
    heart.textContent = Math.random() > 0.5 ? '♥' : '♡';

    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (12 + Math.random() * 18) + 'px';
    heart.style.animationDuration = (7 + Math.random() * 7) + 's';

    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 15000);
}

// Animación ambiental
heartsInterval = setInterval(createHeart, 1100);

// Abrir la carta
openButton.addEventListener('click', () => {
    if (isOpening) return;

    isOpening = true;

    scene.classList.add('is-opening');

    // Mostrar la carta después de la apertura del sobre
    setTimeout(() => {
        overlay.classList.add('visible');

        // Crear una pequeña lluvia de corazones
        for (let i = 0; i < 12; i++) {
            setTimeout(createHeart, i * 130);
        }

    }, 1050);

    // Retirar el sobre de la escena
    setTimeout(() => {
        scene.style.visibility = 'hidden';
        scene.style.pointerEvents = 'none';
    }, 2100);
});

// Cerrar la carta
function closeLetter() {
    overlay.classList.remove('visible');

    setTimeout(() => {
        scene.style.visibility = 'visible';
        scene.style.pointerEvents = 'auto';
        scene.classList.remove('is-opening');

        isOpening = false;
    }, 750);
}

closeButton.addEventListener('click', closeLetter);

// Cerrar pulsando fuera del papel
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        closeLetter();
    }
});

// Cerrar con Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('visible')) {
        closeLetter();
    }
});