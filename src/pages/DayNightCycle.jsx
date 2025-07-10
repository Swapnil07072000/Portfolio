import React, { useRef, useEffect } from 'react';

const DayNightCycleBackground = () => {
  const canvasRef = useRef(null);
  const centerRef = useRef({ centerX: 0, centerY: 0, radius: 0 });
  let shootingStar = null;
  const moonCratersRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const padding = 60;
      const maxRadiusX = (width / 2) - padding;
      const maxRadiusY = height * 0.5;
      const radius = Math.min(maxRadiusX, maxRadiusY);

      centerRef.current.centerX = width / 2;
      centerRef.current.centerY = height * 0.7;
      centerRef.current.radius = radius;
    };

    resize();
    window.addEventListener('resize', resize);

    const starsCount = 100;
    const stars = [];

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < starsCount; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 1.2 + 0.5,
          alpha: Math.random(),
          phase: Math.random() * Math.PI * 2, // for flicker effect
        });
      }
    };
    initStars();

    const generateMoonCraters = () => {
      const craterCount = 6;
      const craters = [];
      const moonRadius = 40;

      for (let i = 0; i < craterCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * moonRadius * 1.2;
        const r = Math.random() * 3 + 1.5;

        craters.push({
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          r,
        });
      }

      moonCratersRef.current = craters;
    };

generateMoonCraters();


    const startShootingStarTimer = () => {
      setInterval(() => {
        const startX = Math.random() * canvas.width / (window.devicePixelRatio || 1);
        const startY = Math.random() * canvas.height * 0.3;

        shootingStar = {
          x: startX,
          y: startY,
          vx: -2,
          vy: 1.5,
          length: 80,
          alpha: 1,
        };
      }, 10000);
    };
    startShootingStarTimer();

    const lerpColor = (c0, c1, t) => {
      const hexToRgb = hex => hex.match(/\w\w/g).map(x => parseInt(x, 16));
      const rgbToHex = (r, g, b) =>
        '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
      const [r0, g0, b0] = hexToRgb(c0);
      const [r1, g1, b1] = hexToRgb(c1);
      return rgbToHex(
        Math.round(r0 + (r1 - r0) * t),
        Math.round(g0 + (g1 - g0) * t),
        Math.round(b0 + (b1 - b0) * t)
      );
    };

    const drawCircle = (x, y, radius, color, glow = false) => {
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = glow ? color : 'transparent';
      ctx.shadowBlur = glow ? 20 : 0;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawMoon = (x, y, radius) => {
      ctx.save();

      // Draw main moon body
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.shadowColor = '#ffffff88';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw static craters
      moonCratersRef.current.forEach(crater => {
        ctx.beginPath();
        ctx.arc(x + crater.dx, y + crater.dy, crater.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fill();
      });

      ctx.restore();
    };



    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, width, height);

      const now = new Date(); // Live time
      // const now = new Date("2025-07-07 21:30:00");
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const t = (hours + minutes / 60 + seconds / 3600) / 24;

      const { centerX, centerY, radius } = centerRef.current;

      const nightColor = '#0b0c22';
      const dayColor = '#87ceeb';

      let skyFactor = 0;
      if (t >= 0.25 && t <= 0.333) {
        skyFactor = (t - 0.25) / (0.333 - 0.25);
      } else if (t > 0.333 && t < 0.75) {
        skyFactor = 1;
      } else if (t < 0.25) {
        skyFactor = 0;
      } else {
        skyFactor = 1 - (t - 0.75) / (1 - 0.75);
      }

      ctx.fillStyle = lerpColor(nightColor, dayColor, skyFactor);
      ctx.fillRect(0, 0, width, height);

      if (skyFactor < 1) {
        const time = performance.now() / 1000;
        stars.forEach(star => {
          const colorPhase = (Math.sin(time * 2 + star.phase) + 1) / 2;
          const midColor = lerpColor('#ffffcc', '#ffffff', colorPhase); // warm white to white
          const finalColor = lerpColor(midColor, '#ccffcc', colorPhase); // mix with pale lime

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
          ctx.fillStyle = finalColor;
          ctx.globalAlpha = (1 - skyFactor) * star.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      }

      const sunVisible = t >= 0.25 && t <= 0.75;
      const moonVisible = !sunVisible;

      if (sunVisible) {
        const sunProgress = (t - 0.25) / 0.5;
        const angle = Math.PI * (1 - sunProgress);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY - radius * Math.sin(angle);
        drawCircle(x, y, 60, 'yellow', true);
        
      }

      if (moonVisible) {
        const moonProgress = t >= 0.75 ? (t - 0.75) / 0.5 : (t + 0.25) / 0.5;
        const angle = Math.PI * (1 - moonProgress);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY - radius * Math.sin(angle);
        drawMoon(x, y, 40);
      }

      if (shootingStar && !sunVisible && skyFactor < 0.1) {
        const { x, y, vx, vy, length, alpha } = shootingStar;

        const gradient = ctx.createLinearGradient(x, y, x + length * -vx, y + length * -vy);
        gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(x, y);
        ctx.lineTo(x + length * -vx, y + length * -vy);
        ctx.stroke();

        shootingStar.x += vx;
        shootingStar.y += vy;
        shootingStar.alpha -= 0.02;

        if (shootingStar.alpha <= 0 || shootingStar.x < 0 || shootingStar.y > canvas.height) {
          shootingStar = null;
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default DayNightCycleBackground;
