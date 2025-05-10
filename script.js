const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
canvas.width  = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const meteors = [];
const meteorImg = new Image();
meteorImg.src = 'images/meteor.png';

// عند النقر: أضف نيزك جديد
canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  meteors.push({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 4 + 2,
    size: 30 + Math.random() * 20
  });
});

function update() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // رسم كل نيزك وتحريك
  for (let i = meteors.length-1; i >= 0; i--) {
    const m = meteors[i];
    m.x += m.vx;
    m.y += m.vy;
    ctx.drawImage(meteorImg, m.x, m.y, m.size, m.size);
    // إذا خرج من المشهد، احذفه
    if (m.y > canvas.height || m.x < -m.size || m.x > canvas.width + m.size) {
      meteors.splice(i,1);
    }
  }
  requestAnimationFrame(update);
}

// ابدأ التحديث بعد تحميل الصورة
meteorImg.onload = () => update();
