import React, { useRef, useEffect } from 'react';

const DayNightCycleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
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
          y: Math.random() * window.innerHeight * 0.7, // top 70% for sky
          radius: Math.random() * 1.2 + 0.5,
          alpha: Math.random(),
        });
      }
    };
    initStars();

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
      // Uncomment and adjust if you want a crescent moon effect
      // ctx.arc(x + radius * 0.4, y - radius * 0.1, radius * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    };

    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, width, height);
        // const now = new Date("2025-06-09 23:00:00");
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const t = (hours + minutes / 60 + seconds / 3600) / 24;

      
      const radius = height/2;
      const centerX = width / 2;
      const centerY = height * 0.9;
    
      const nightColor = '#0b0c22';
      const dayColor = '#87ceeb';

      // Improved skyFactor for stars fading
      let skyFactor = 0;
      if (t >= 0.25 && t <= 0.333) {
        // 6 AM to 8 AM fade out stars
        skyFactor = (t - 0.25) / (0.333 - 0.25);
      } else if (t > 0.333 && t < 0.75) {
        // Daytime - no stars
        skyFactor = 1;
      } else if (t < 0.25) {
        // Night before 6 AM - stars fully visible
        skyFactor = 0;
      } else {
        // 6 PM to midnight fade stars back in
        skyFactor = 1 - (t - 0.75) / (1 - 0.75);
      }

      ctx.fillStyle = lerpColor(nightColor, dayColor, skyFactor);
      ctx.fillRect(0, 0, width, height);

      // Draw stars with alpha fading as sun rises
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
