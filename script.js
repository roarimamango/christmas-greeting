// Community Member Fillers (Easily swap names and portraits later!)
const COMMUNITY = [
  { name: "BROTHER 1", portrait: "https://api.dicebear.com/7.x/pixel-art/svg?seed=FriendAlpha" },
  { name: "BROTHER 2", portrait: "https://api.dicebear.com/7.x/pixel-art/svg?seed=FriendBeta" },
  { name: "BROTHER 3", portrait: "https://api.dicebear.com/7.x/pixel-art/svg?seed=FriendGamma" },
  { name: "BROTHER 4", portrait: "https://api.dicebear.com/7.x/pixel-art/svg?seed=FriendDelta" },
  { name: "BROTHER 5", portrait: "https://api.dicebear.com/7.x/pixel-art/svg?seed=FriendEpsilon" },
  { name: "BROTHER 6", portrait: "https://api.dicebear.com/7.x/pixel-art/svg?seed=FriendZeta" }
];

// Canvas Game Engine Setup (Snow + Bokeh Bubbles + Parallax)
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Systems: Snowflakes + Bokeh Depth Bubbles + Magical Embers
const particles = [];

// Create Bokeh Bubbles
for (let i = 0; i < 18; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 35 + 15,
    speedY: Math.random() * 0.4 + 0.1,
    speedX: Math.random() * 0.2 - 0.1,
    opacity: Math.random() * 0.25 + 0.05,
    type: 'bokeh'
  });
}

// Create Snowflakes
for (let i = 0; i < 90; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 3 + 1,
    speedY: Math.random() * 1.8 + 0.6,
    speedX: Math.random() * 0.8 - 0.4,
    opacity: Math.random() * 0.8 + 0.2,
    type: 'snow'
  });
}

function runGameLoop() {
  const w = canvas.width;
  const h = canvas.height;

  // Rich Twilight Atmosphere Gradient
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#020617');
  sky.addColorStop(0.4, '#090d19');
  sky.addColorStop(1, '#1b1d42');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Parallax Mountain Range (Layer 1)
  ctx.fillStyle = '#172033';
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let x = 0; x <= w; x += 70) {
    ctx.lineTo(x, h - 240 - Math.sin(x * 0.005) * 110);
  }
  ctx.lineTo(w, h);
  ctx.fill();

  // Parallax Snowy Hills & Pines (Layer 2)
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let x = 0; x <= w; x += 50) {
    ctx.lineTo(x, h - 120 - Math.cos(x * 0.01) * 45);
  }
  ctx.lineTo(w, h);
  ctx.fill();

  // Render Bokeh & Snow Particles
  particles.forEach(p => {
    p.y += p.speedY;
    p.x += p.speedX;
    if (p.y > h + p.size) { p.y = -50; p.x = Math.random() * w; }
    if (p.x > w) p.x = 0;
    if (p.x < 0) p.x = w;

    if (p.type === 'bokeh') {
      ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity})`;
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

// Generate Interactive Community Snowflakes with Embedded Face Previews
const snowLayer = document.getElementById('snowflake-layer');
COMMUNITY.forEach((friend, index) => {
  const node = document.createElement('div');
  node.className = 'friend-node';
  node.innerHTML = `<div class="friend-thumb" style="background-image: url('${friend.portrait}')"></div>`;
  
  const posX = (window.innerWidth / (COMMUNITY.length + 1)) * (index + 1);
  const posY = 150 + Math.random() * (window.innerHeight - 320);
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
    // Open Book with Flash
    flashCore.classList.add('active');
    setTimeout(() => flashCore.classList.remove('active'), 500);

    grimoireContainer.classList.remove('flying');
    grimoireContainer.classList.add('open');
    messagePane.style.display = 'flex';
    screenPane.style.display = 'none';
    cardState = 1;

  } else if (cardState === 1) {
    // Switch to Home Alone Video Twist
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

// Dual Audio Track Engine
const audioCozy = document.getElementById('audio-cozy');
const audioHype = document.getElementById('audio-hype');
const btnHoliday = document.getElementById('btn-holiday');
const btnDevil = document.getElementById('btn-devil');

btnHoliday.addEventListener('click', () => toggleTrack(audioCozy, btnHoliday, audioHype, btnDevil));
btnDevil.addEventListener('click', () => toggleTrack(audioHype, btnDevil, audioCozy, btnHoliday));

function toggleTrack(activeAudio, activeBtn, otherAudio, otherBtn) {
  otherAudio.pause();
  otherBtn.classList.remove('active');

  if (activeAudio.paused) {
    activeAudio.play().catch(() => {});
    activeBtn.classList.add('active');
  } else {
    activeAudio.pause();
    activeBtn.classList.remove('active');
  }
}