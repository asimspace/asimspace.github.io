import { useEffect, useRef } from 'react';

const PopperEffect = ({ trigger }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
      constructor() {
        // Start from bottom left area, move to top right
        this.x = Math.random() * (window.innerWidth * 0.3);
        this.y = window.innerHeight + 10;
        this.vx = (Math.random() * 8 + 4); // Move right
        this.vy = -(Math.random() * 10 + 8); // Move up faster
        this.life = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.size = Math.random() * 6 + 3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        
        // Random colors - festive colors
        const colors = ['#FF6B6B', '#FFA500', '#FFD700', '#00D4FF', '#00FF88', '#FF00FF'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.vy;
        this.x += this.vx;
        this.vy += 0.15; // Slightly increased gravity
        this.vx *= 0.98; // Air resistance
        this.life -= this.decay;
        this.rotation += this.rotationSpeed;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life); // Ensure alpha doesn't go negative
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    // Create particles
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);

        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        requestAnimationFrame(animate);
      } else {
        // Ensure canvas is completely cleared when animation is done
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5000,
      }}
    />
  );
};

export default PopperEffect;
