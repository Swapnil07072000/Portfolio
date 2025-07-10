import React, { useRef, useEffect } from 'react';

const DayNightCycleBackground = () => {
  const canvasRef = useRef(null);
  const centerRef = useRef({ centerX: 0, centerY: 0, radius: 0 });
  let shootingStar = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Adjust orbit radius and center to keep sun/moon fully visible on all screens
      const horizontalPadding = 60; // enough padding for sun/moon radius + margin
      const maxRadiusX = (width / 2) - horizontalPadding;
      const maxRadiusY = height * 0.5; // vertical radius limited to half viewport height
      const radius = Math.min(maxRadiusX, maxRadiusY);

      centerRef.current.centerX = width / 2;
      centerRef.current.centerY = height * 0.65; // move orbit center higher than before
      centerRef.current.radius = radius;
    };

    resize();
    window.addEventListener('resize', resize);

    // Stars parameters
    const starsCount = 100;
    const stars = [];

    // Initialize stars randomly on canvas
    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < starsCount; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 1.2 + 0.5,
          alpha: Math.random(),
        });
      }
    };
    initStars();

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
      const hexToRgb = (hex) => hex.match(/\w\w/g).map(x => parseInt(x, 16));
      const rgbToHex = (r, g, b) =>
        '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
      const c0rgb = hexToRgb(c0);
      const c1rgb = hexToRgb(c1);
      const r = Math.round(c0rgb[0] + (c1rgb[0] - c0rgb[0]) * t);
      const g = Math.round(c0rgb[1] + (c1rgb[1] - c0rgb[1]) * t);
      const b = Math.round(c0rgb[2] + (c1rgb[2] - c0rgb[2]) * t);
      return rgbToHex(r, g, b);
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
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      // You can enable crescent effect here if wanted
      // ctx.arc(x + radius * 0.4, y - radius * 0.1, radius * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    };

    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, width, height);
      // const now = new Date("2025-07-07 02:00:00");
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const t = (hours + minutes / 60 + seconds / 3600) / 24;

      const { centerX, centerY, radius } = centerRef.current;

      const nightColor = '#0b0c22';
      const dayColor = '#87ceeb';

      // Stars fade logic
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
        stars.forEach(star => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(255, 255, 255, ${(1 - skyFactor) * star.alpha})`;
          ctx.fill();
        });
      }

      const sunVisible = t >= 0.25 && t <= 0.75;
      const moonVisible = !sunVisible;

      if (sunVisible) {
        const sunProgress = (t - 0.25) / 0.5;
        const sunAngle = Math.PI * (1 - sunProgress);
        const sunX = centerX + radius * Math.cos(sunAngle);
        const sunY = centerY - radius * Math.sin(sunAngle);
        drawCircle(sunX, sunY, 60, 'yellow', true);
      }

      if (moonVisible) {
        let moonProgress;
        if (t >= 0.75) {
          moonProgress = (t - 0.75) / 0.5;
        } else {
          moonProgress = (t + 0.25) / 0.5;
        }

        const moonAngle = Math.PI * (1 - moonProgress);
        const moonX = centerX + radius * Math.cos(moonAngle);
        const moonY = centerY - radius * Math.sin(moonAngle);

        drawMoon(moonX, moonY, 40);
      }

      if (shootingStar && !sunVisible && skyFactor < 0.1) {
        const { x, y, vx, vy, length } = shootingStar;

        const gradient = ctx.createLinearGradient(x, y, x + length * -vx, y + length * -vy);
        gradient.addColorStop(0, `rgba(255,255,255,${shootingStar.alpha})`);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(x, y);
        ctx.lineTo(x + length * -vx, y + length * -vy);
        ctx.stroke();

        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.alpha -= 0.002;

        if (shootingStar.alpha <= 0) {
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
      style={{ display: 'flex' }}
    />
  );
};

export default DayNightCycleBackground;
