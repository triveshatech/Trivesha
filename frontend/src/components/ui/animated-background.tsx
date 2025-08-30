import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  closest?: Point[];
  active?: number;
  circle?: Circle;
}

interface Circle {
  pos: Point;
  radius: number;
  color: string;
  active?: number;
  draw(): void;
}

interface Target {
  x: number;
  y: number;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const pointsRef = useRef<Point[]>([]);
  const targetRef = useRef<Target>({ x: 0, y: 0 });
  const animateHeaderRef = useRef<boolean>(true);

  useEffect(() => {
    let width: number, height: number, ctx: CanvasRenderingContext2D;

    const initHeader = () => {
      if (!canvasRef.current || !containerRef.current) return;

      width = window.innerWidth;
      height = window.innerHeight;
      targetRef.current = { x: width / 2, y: height / 2 };

      const container = containerRef.current;
      container.style.height = height + 'px';

      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d')!;

      // Create points
      const points: Point[] = [];
      for (let x = 0; x < width; x = x + width / 20) {
        for (let y = 0; y < height; y = y + height / 20) {
          const px = x + Math.random() * width / 20;
          const py = y + Math.random() * height / 20;
          const p: Point = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      // For each point find the 5 closest points
      for (let i = 0; i < points.length; i++) {
        const closest: Point[] = [];
        const p1 = points[i];
        for (let j = 0; j < points.length; j++) {
          const p2 = points[j];
          if (!(p1 === p2)) {
            let placed = false;
            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] === undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }

            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        }
        p1.closest = closest;
      }

      // Assign a circle to each point
      for (let i = 0; i < points.length; i++) {
        const c = CircleClass(points[i], 2 + Math.random() * 2, 'rgba(45, 212, 191, 0.3)'); // Using teal color
        points[i].circle = c;
      }

      pointsRef.current = points;
    };

    const CircleClass = function(pos: Point, rad: number, color: string): Circle {
      const circle = {
        pos: pos,
        radius: rad,
        color: color,
        active: 0,
        draw: function() {
          if (!this.active) return;
          ctx.beginPath();
          ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = `rgba(45, 212, 191, ${this.active})`; // Teal color with alpha
          ctx.fill();
        }
      };
      return circle;
    };

    const mouseMove = (e: MouseEvent) => {
      let posx = 0, posy = 0;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      targetRef.current.x = posx;
      targetRef.current.y = posy;
    };

    const scrollCheck = () => {
      if (document.body.scrollTop > height) {
        animateHeaderRef.current = false;
      } else {
        animateHeaderRef.current = true;
      }
    };

    const resize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      
      width = window.innerWidth;
      height = window.innerHeight;
      containerRef.current.style.height = height + 'px';
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      
      // Reinitialize with new dimensions
      initHeader();
    };

    const shiftPoint = (p: Point) => {
      // Simple animation without TweenLite - using CSS animations and timeouts
      const animatePoint = () => {
        const newX = p.originX - 50 + Math.random() * 100;
        const newY = p.originY - 50 + Math.random() * 100;
        
        // Smooth transition
        const duration = 1000 + Math.random() * 1000;
        const startTime = Date.now();
        const startX = p.x;
        const startY = p.y;
        
        const updatePosition = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function (easeInOutCirc)
          const eased = progress < 0.5 
            ? (1 - Math.sqrt(1 - Math.pow(2 * progress, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * progress + 2, 2)) + 1) / 2;
          
          p.x = startX + (newX - startX) * eased;
          p.y = startY + (newY - startY) * eased;
          
          if (progress < 1) {
            requestAnimationFrame(updatePosition);
          } else {
            setTimeout(() => shiftPoint(p), Math.random() * 2000);
          }
        };
        
        updatePosition();
      };
      
      setTimeout(animatePoint, Math.random() * 1000);
    };

    const drawLines = (p: Point) => {
      if (!p.active || !p.closest) return;
      for (let i = 0; i < p.closest.length; i++) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = `rgba(45, 212, 191, ${p.active})`; // Teal color
        ctx.stroke();
      }
    };

    const getDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }): number => {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    const animate = () => {
      if (animateHeaderRef.current && ctx) {
        ctx.clearRect(0, 0, width, height);
        const points = pointsRef.current;
        
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          // Detect points in range
          const distance = Math.abs(getDistance(targetRef.current, point));
          
          if (distance < 4000) {
            point.active = 0.3;
            if (point.circle) point.circle.active = 0.6;
          } else if (distance < 20000) {
            point.active = 0.1;
            if (point.circle) point.circle.active = 0.3;
          } else if (distance < 40000) {
            point.active = 0.02;
            if (point.circle) point.circle.active = 0.1;
          } else {
            point.active = 0;
            if (point.circle) point.circle.active = 0;
          }

          drawLines(point);
          if (point.circle) point.circle.draw();
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const initAnimation = () => {
      animate();
      pointsRef.current.forEach(point => shiftPoint(point));
    };

    const addListeners = () => {
      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
    };

    const removeListeners = () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', scrollCheck);
      window.removeEventListener('resize', resize);
    };

    // Initialize everything
    initHeader();
    initAnimation();
    addListeners();

    // Cleanup function
    return () => {
      removeListeners();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #000000 50%, #1f2937 100%)',
        zIndex: 1
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default AnimatedBackground;
