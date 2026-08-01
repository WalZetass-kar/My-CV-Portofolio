import React, { useEffect, useRef } from 'react';

export const FloatingParticles3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Particle class with 3D projection (x, y, z)
    interface Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      vz: number;
    }

    const particles: Particle[] = [];
    const numParticles = 65;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * 800 + 100,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#10b981' : '#06b6d4',
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.8,
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - width / 2;
      mouseY = e.clientY - rect.top - height / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      const fov = 350;

      // Draw particle nodes & connecting 3D lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx + mouseX * 0.0003;
        p.y += p.vy + mouseY * 0.0003;
        p.z += p.vz;

        if (p.z <= 10) p.z = 800;
        if (p.z > 800) p.z = 10;

        // 3D Perspective Projection
        const scale = fov / (fov + p.z);
        const projX = p.x * scale + width / 2;
        const projY = p.y * scale + height / 2;
        const projSize = p.size * scale * 1.8;

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          ctx.beginPath();
          ctx.arc(projX, projY, projSize, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(1, scale * 1.2);
          ctx.fill();

          // Connect nearby 3D points
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dz = p.z - p2.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 180) {
              const scale2 = fov / (fov + p2.z);
              const projX2 = p2.x * scale2 + width / 2;
              const projY2 = p2.y * scale2 + height / 2;

              ctx.beginPath();
              ctx.moveTo(projX, projY);
              ctx.lineTo(projX2, projY2);
              ctx.strokeStyle = '#10b981';
              ctx.globalAlpha = (1 - dist / 180) * 0.25 * scale;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-35"
    />
  );
};
