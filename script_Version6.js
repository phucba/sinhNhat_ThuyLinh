// --- Lời chúc hiệu ứng typewriter ---
const greetings = [
  "Chúc mừng sinh nhật Thùy Linh!ハート ",
  "Chúc Em tuổi mới thật nhiều niềm vui, sức khỏe.",
  "Tuổi mới, mong mọi điều tốt đẹp sẽ đến <3.",
  "Luôn tỏa sáng, luôn hạnh phúc!",
  "Sinh nhật vui vẻ nhé! iu Em"
];

const typewriterContainer = document.getElementById("typewriter-container");
const typewriterDiv = document.getElementById("typewriter");
const cakeContainer = document.getElementById("cake-container");
let currentLine = 0;
let charIndex = 0;

function typeLine() {
  if (currentLine >= greetings.length) {
    setTimeout(() => {
      typewriterContainer.classList.add("hidden");
      cakeContainer.classList.remove("hidden");
    }, 600);
    return;
  }
  const line = greetings[currentLine];
  let html = "";
  for (let i = 0; i < charIndex; i++) {
    html += line[i];
  }
  typewriterDiv.innerHTML = html + '<span class="cursor" style="font-weight: bold;">|</span>';
  if (charIndex < line.length) {
    charIndex++;
    setTimeout(typeLine, 36 + Math.random()*44);
  } else {
    typewriterDiv.innerHTML = html;
    currentLine++;
    charIndex = 0;
    setTimeout(typeLine, 720);
  }
}
window.addEventListener("DOMContentLoaded", typeLine);

// --- Pháo hoa đơn giản ---
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let fireworks = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomColor() {
  const colors = ["#ffb347", "#f47fff", "#40e0d0", "#ffd700", "#ff69b4", "#aaffc3", "#e7baff"];
  return colors[Math.floor(Math.random() * colors.length)];
}
class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    for (let i = 0; i < 32 + Math.random()*16; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = 2.5 + Math.random() * 2.5;
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: randomColor(),
        alpha: 1,
        radius: 2.1 + Math.random() * 2.2
      });
    }
  }
  update() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.97;
      p.vy *= 0.97;
      p.vy += 0.045;
      p.alpha *= 0.96;
    });
  }
  draw(ctx) {
    this.particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 13;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
  isDead() {
    return this.particles.every(p => p.alpha < 0.13);
  }
}
function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach(fw => {
    fw.update();
    fw.draw(ctx);
  });
  fireworks = fireworks.filter(fw => !fw.isDead());
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

function launchFirework(x, y) {
  fireworks.push(new Firework(x, y));
}

// --- Tắt nến và pháo hoa ---
const flame = document.getElementById("flame");
const wishBtn = document.getElementById("wish-btn");
const wishResult = document.getElementById("wish-result");
let candleLit = true;

wishBtn.addEventListener('click', function() {
  if (!candleLit) return;
  candleLit = false;
  flame.style.display = "none";
  wishResult.innerHTML = "Chúc mừng sinh nhật! 🎉,người bạn gái mà anh k ngờ tới nhất. Cảm ơn em đến bên anh! Chúng ta cùng cố gắng để về chung một nhà nhé! hihi";
  for (let i = 0; i < 6; i++) {
    setTimeout(() =>
      launchFirework(
        window.innerWidth * (0.18 + 0.64*Math.random()),
        window.innerHeight * (0.25 + 0.26*Math.random())
      ), i*330
    );
  }
});

// Click canvas để nổ pháo hoa bất kỳ chỗ nào
canvas.addEventListener('click', (e) => {
  launchFirework(e.clientX, e.clientY);
});
