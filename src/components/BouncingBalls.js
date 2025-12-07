import { useEffect, useRef } from 'react';

const BouncingBalls = ({ isGenerating }) => {
  const canvasRef = useRef(null);
  const ballsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Ball {
      constructor() {
        this.radius = 30 + Math.random() * 20;
        this.x = Math.random() * (canvas.width - 2 * this.radius) + this.radius;
        this.y = Math.random() * (canvas.height - 2 * this.radius) + this.radius;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.number = Math.floor(Math.random() * 75) + 1;
        this.color = `hsla(${Math.random() * 360}, 70%, 50%, 0.02)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls with friction
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
          this.vx *= -0.95;
          this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        }

        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
          this.vy *= -0.95;
          this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }

        // Apply gravity
        this.vy += 0.2;

        // Slow down over time (air resistance)
        this.vx *= 0.998;
        this.vy *= 0.998;
      }

      draw(ctx) {
        // Draw simple solid ball
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw number inside ball
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.number, this.x, this.y);
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isGenerating && ballsRef.current.length === 0) {
        // Create 5 balls
        for (let i = 0; i < 75; i++) {
          ballsRef.current.push(new Ball());
        }
      }

      if (!isGenerating && ballsRef.current.length > 0) {
        // Fade out balls
        ballsRef.current = ballsRef.current.filter(ball => {
          ball.update();
          ball.draw(ctx);
          return ball.vy < 0.1 && ball.vx < 0.1; // Keep only if still moving
        });

        if (ballsRef.current.length === 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      } else if (isGenerating) {
        ballsRef.current.forEach(ball => {
          ball.update();
          ball.draw(ctx);
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isGenerating]);

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
        zIndex: -1,
      }}
    />
  );
};

export default BouncingBalls;
