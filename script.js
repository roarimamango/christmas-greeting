// Community Member Database (Using high-res portraits for the jarring real-face effect)
const COMMUNITY = [
  { name: "BROTHER 1", portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" },
  { name: "BROTHER 2", portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80" },
  { name: "BROTHER 3", portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80" },
  { name: "BROTHER 4", portrait: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80" },
  { name: "BROTHER 5", portrait: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80" },
  { name: "BROTHER 6", portrait: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80" }
];

// Canvas Game Engine (Warm Night, Pixel Moon, Street Lamps, Sparse Snow, Bokeh)
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Sparse Snowflakes & Warm Bokeh Particles
const particles = [];

// Bokeh Bubbles (Warm Gold/Amber)
for (let i = 0; i < 12; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 30 + 15,
    speedY: Math.random() * 0.3 + 0.1,
    speedX: Math.random() * 0.2 - 0.1,
    opacity: Math.random() * 0.2 + 0.05,
    type: 'bokeh'
  });
}

// Sparse Snowflakes
for (let i = 0; i < 45; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 2.5 + 1,
    speedY: Math.random() * 1.2 + 0.4,
    speedX: Math.random() * 0.5 - 0.25,
    opacity: Math.random() * 0.7 + 0.3,
    type: 'snow'
  });
}

function runGameLoop() {
  const w = canvas.width;
  const h = canvas.height;

  // Warm Twilight / Night Sky Gradient
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#090d16');
  sky.addColorStop(0.5, '#171e2e');
  sky.addColorStop(1, '#2d1b18'); // Warm cozy ground gradient tint
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Pixel Moon in the Sky
  ctx.fillStyle = '#fef08a';
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 30;
  ctx.beginPath();
  ctx.arc(w - 120, 100, 35, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0; // Reset shadow

  // Warm Parallax Pine Trees & Hills
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let x = 0; x <= w; x += 80) {
    ctx.lineTo(x, h - 220 - Math.sin(x * 0.005) * 80);
  }
  ctx.lineTo(w, h);
  ctx.fill();

  // Foreground Warm Ground Line
  ctx.fillStyle = '#331818';
  ctx.fillRect(0, h - 70, w, 70);

  // Render Particles (Bokeh & Snow)
  particles.forEach(p => {
    p.y += p.speedY;
    p.x += p.speedX;
    if (p.y > h + p.size) { p.y = -30; p.x = Math.random() * w; }
    if (p.x > w) p.x = 0;
    if (p.x < 0) p.x = w;

    if (p.type === 'bokeh') {
      ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  requestAnimationFrame(runGameLoop);
}
runGameLoop();

// Generate Sparse, Jarring Real-Face Snowflakes
const snowLayer = document.getElementById('snowflake-layer');
COMMUNITY.forEach((friend, index) => {
  const node = document.createElement('div');
  node.className = 'friend-node';
  node.innerHTML = `<div class="friend-thumb" style="background-image: url('${friend.portrait}')"></div>`;
  
  // Position across the screen neatly
  const posX = (window.innerWidth / (COMMUNITY.length + 1)) * (index + 1);
  const posY = 180 + Math.random() * (window.innerHeight - 340);
  node.style.left = `${posX}px`;
  node.style.top = `${posY}px`;

  node.addEventListener('click', (e) => {
    e.stopPropagation();
    openHologram(friend);
  });

  snowLayer.appendChild(node);
});

// Hologram Modal Logic
const modal = document.getElementById('hologram-modal');
const holoName = document.getElementById('holo-name');
const holoPortrait = document.getElementById('holo-portrait');

function openHologram(friend) {
  holoName.textContent = friend.name;
  holoPortrait.style.backgroundImage = `url('${friend.portrait}')`;
  modal.classList.remove('modal-hidden');
}

modal.addEventListener('click', () => {
  modal.classList.add('modal-hidden');
});

// Grimoire State Machine (Book -> Home Alone Video -> Reset)
const grimoireContainer = document.getElementById('grimoire-container');
const flashCore = document.getElementById('flash-core');
const messagePane = document.getElementById('message-pane');
const screenPane = document.getElementById('screen-pane');
const homealoneIframe = document.getElementById('homealone-iframe');

let cardState = 0; // 0: Flying, 1: Open Greeting, 2: Home Alone Video

grimoireContainer.addEventListener('click', () => {
  if (cardState === 0) {
    // Warm Flash & Open Book
    flashCore.classList.add('active');
    setTimeout(() => flashCore.classList.remove('active'), 600);

    grimoireContainer.classList.remove('flying');
    grimoireContainer.classList.add('open');
    messagePane.style.display = 'flex';
    screenPane.style.display = 'none';
    cardState = 1;

  } else if (cardState === 1) {
    // Switch to Home Alone Twist
    messagePane.style.display = 'none';
    screenPane.style.display = 'block';
    homealoneIframe.src = "https://www.youtube.com/embed/rC_Yg_U2N48?autoplay=1&enablejsapi=1";
    cardState = 2;

  } else if (cardState === 2) {
    // Close Book & Resume Flight
    homealoneIframe.src = "https://www.youtube.com/embed/rC_Yg_U2N48?enablejsapi=1";
    grimoireContainer.classList.remove('open');
    setTimeout(() => {
      grimoireContainer.classList.add('flying');
      cardState = 0;
    }, 1000);
  }
});

// 1, 2, OFF Music Toggle Engine
const audio1 = document.getElementById('audio-1');
const audio2 = document.getElementById('audio-2');
const trackBtns = document.querySelectorAll('.track-btn');

trackBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const track = btn.getAttribute('data-track');

    // Stop all audio first
    audio1.pause();
    audio2.pause();
    trackBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (track === '1') {
      audio1.play().catch(() => {});
    } else if (track === '2') {
      audio2.play().catch(() => {});
    }
    // If 'off', both remain paused and OFF button stays highlighted
  });
});