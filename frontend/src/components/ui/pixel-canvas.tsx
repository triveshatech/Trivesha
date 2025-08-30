import React, { useEffect, useRef } from 'react';
import '../../styles/pixel-canvas.css';

interface PixelCanvasProps {
  gap?: number;
  speed?: number; // kept for compatibility but not used for per-pixel JS animations
  colors?: string[];
  theme?: 'teal' | 'orange' | 'blue' | 'purple' | 'green' | 'pink';
  noFocus?: boolean;
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({ 
  gap = 4, 
  speed = 30, 
  colors = [],
  theme = 'teal',
  noFocus = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

  const rafId: number | null = null;
  let resizeTimer: number | null = null;

    const defaultColors = theme === 'teal' ? ['#2DD4BF', '#5EEAD4', '#14B8A6'] :
                         theme === 'orange' ? ['#FF7849', '#FF8B61', '#FFB088'] :
                         theme === 'blue' ? ['#3B82F6', '#60A5FA', '#93C5FD'] :
                         theme === 'purple' ? ['#8B5CF6', '#A78BFA', '#C4B5FD'] :
                         theme === 'green' ? ['#10B981', '#34D399', '#6EE7B7'] :
                         ['#EC4899', '#F472B6', '#F9A8D4'];

    const palette = colors.length > 0 ? colors : defaultColors;

    const devicePixelRatio = window.devicePixelRatio || 1;

    const drawParticles = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(0, Math.floor(rect.width));
      const height = Math.max(0, Math.floor(rect.height));

      // Resize canvas for device pixel ratio
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Particle sizing
      const pixelSize = 3; // visual size in px
      const totalGap = gap;
      const spacing = pixelSize + totalGap;

      const cols = Math.max(2, Math.floor(width / spacing));
      const rows = Math.max(2, Math.floor(height / spacing));

      // center reference
      const centerX = cols / 2;
      const centerY = rows / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing + (spacing - pixelSize) / 2;
          const y = r * spacing + (spacing - pixelSize) / 2;

          // small chance to skip drawing to keep particle count low
          if (Math.random() > 0.95) continue;

          const color = palette[Math.floor(Math.random() * palette.length)];
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.18 + Math.random() * 0.18; // subtle variation

          // occasional brighter particle
          if (Math.random() > 0.88) {
            ctx.globalAlpha = 0.35;
            ctx.beginPath();
            ctx.arc(x + pixelSize / 2, y + pixelSize / 2, pixelSize * 0.9, 0, Math.PI * 2);
            ctx.fill();
            // small glow using shadow on the brighter ones
            ctx.save();
            ctx.shadowBlur = 6;
            ctx.shadowColor = color;
            ctx.fill();
            ctx.restore();
          } else {
            ctx.fillRect(x, y, pixelSize, pixelSize);
          }
        }
      }

      ctx.restore();
    };

    // draw initially
    drawParticles();

    const resizeObserver = new ResizeObserver(() => {
      // debounce resize to avoid frequent heavy redraws
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        drawParticles();
      }, 120) as unknown as number;
    });

    resizeObserver.observe(container);

    return () => {
  if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [gap, speed, colors, theme]);

  return (
    <div ref={containerRef} className={`pixel-canvas-wrapper ${noFocus ? 'no-focus' : ''}`} data-theme={theme}>
      <canvas ref={canvasRef} className="pixel-canvas" aria-hidden />
    </div>
  );
};

export default PixelCanvas;
