// --- UNIQUE SNOWFLAKES & FRIENDS SYSTEM ---
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// List of your community / 2G friends
const friendsList = [
    "Alex 2G", "Kevin 2G", "Brian", "Justin", "Brandon", 
    "Daniel", "Eric", "Jason", "Andrew", "Ryan"
];

class Snowflake {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.size = Math.random() * 8 + 6; // Bigger snowflakes for friends
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.isFriendSnowflake = Math.random() > 0.6; // 40% chance to be a clickable friend snowflake
        this.friendName = this.isFriendSnowflake ? friendsList[Math.floor(Math.random() * friendsList.length)] : null;
        this.angle = Math.random() * Math.PI;
        this.spin = Math.random() * 0.02 - 0.01;
    }
    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.angle) + this.speedX;
        this.angle += this.spin;

        if (this.y > height + 20) {
            this.reset();
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.isFriendSnowflake ? '#a5f3fc' : 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = this.isFriendSnowflake ? 12 : 4;
        ctx.shadowColor = '#00ffff';

        // Draw unique pixelated snowflake shape
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        if (this.isFriendSnowflake) {
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(-this.size, -this.size, this.size * 2, this.size * 2);
        }
        ctx.restore();
    }
}

const snowflakes = Array.from({ length: 50 }, () => new Snowflake());

function animateSnow() {
    ctx.clearRect(0, 0, width, height);
    snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
    });
    requestAnimationFrame(animateSnow);
}
animateSnow();

// --- INTERACTIVE CLICK DETECTION FOR FRIEND SNOWFLAKES ---
const namePopup = document.getElementById('namePopup');
const friendNameSpan = document.getElementById('friendName');

window.addEventListener('click', (e) => {
    // Check if clicked near any friend snowflake
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    snowflakes.forEach(flake => {
        if (flake.isFriendSnowflake) {
            const dist = Math.hypot(flake.x - clickX, flake.y - clickY);
            if (dist < 25) {
                triggerDuelPopup(flake.friendName);
            }
        }
    });
});

function triggerDuelPopup(name) {
    friendNameSpan.textContent = name;
    namePopup.classList.add('active');
    setTimeout(() => {
        namePopup.classList.remove('active');
    }, 2500);
}

// --- BOOK INTERACTION & CYCLE LOGIC ---
const pixelBook = document.getElementById('pixelBook');
const bookModal = document.getElementById('bookModal');
const closeBookBtn = document.getElementById('closeBookBtn');
const videoContainer = document.getElementById('videoContainer');
const homeAloneVid = document.getElementById('homeAloneVid');

let bookClickState = 0; // 0: closed/flying, 1: text open, 2: video active

pixelBook.addEventListener('click', () => {
    pixelBook.classList.remove('flying');
    bookModal.classList.remove('hidden');
    bookClickState = 1;
});

// Clicking inside the open book cycles to the video or closes
bookModal.addEventListener('click', (e) => {
    if (e.target === bookModal || e.target === closeBookBtn) {
        closeBook();
        return;
    }

    if (bookClickState === 1) {
        // Switch to Home Alone video state
        document.querySelector('.left-page').style.display = 'none';
        videoContainer.classList.remove('hidden');
        homeAloneVid.play();
        bookClickState = 2;
    } else if (bookClickState === 2) {
        // Complete cycle: close modal and let the book fly away again
        closeBook();
    }
});

function closeBook() {
    bookModal.classList.add('hidden');
    videoContainer.classList.add('hidden');
    homeAloneVid.pause();
    homeAloneVid.currentTime = 0;
    document.querySelector('.left-page').style.display = 'flex';
    bookClickState = 0;
    pixelBook.classList.add('flying');
}

// --- BACKGROUND MUSIC CONTROLLER ---
const bgAudio = document.getElementById('bgAudio');
const musicBtns = document.querySelectorAll('.music-btn');

musicBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        musicBtns.forEach(b => b.classList.remove('active'));
        const targetBtn = e.currentTarget;
        targetBtn.classList.add('active');
        
        const track = targetBtn.getAttribute('data-track');
        bgAudio.src = track;
        bgAudio.play().catch(() => {
            console.log("Audio autoplay restricted until user interaction.");
        });
    });
});