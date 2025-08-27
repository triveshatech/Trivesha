import React, { useEffect, useState } from 'react';
import '../../styles/contact-stars.css';

interface Star {
  id: number;
  left: number;
  top: number;
  size: 'small' | 'medium' | 'large' | 'tiny';
  color: 'white' | 'teal' | 'blue';
  delay: number;
  isGlowing?: boolean;
  isInteractive?: boolean;
}

interface Pattern {
  id: number;
  left: number;
  top: number;
  type: 'triangle' | 'diamond' | 'circle';
  isFloating?: boolean;
}

interface ContactStarsProps {
  section?: 'hero' | 'form' | 'general';
  density?: 'low' | 'medium' | 'high';
}

const ContactStars: React.FC<ContactStarsProps> = ({ 
  section = 'general', 
  density = 'medium' 
}) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [shootingStars, setShootingStars] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (section === 'hero') {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [section]);

  // Generate stars based on density and section
  useEffect(() => {
    const generateStars = () => {
      const starCount = density === 'low' ? 8 : density === 'medium' ? 15 : 25;
      const newStars: Star[] = [];

      for (let i = 0; i < starCount; i++) {
        const star: Star = {
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: ['tiny', 'small', 'medium', 'large'][Math.floor(Math.random() * 4)] as Star['size'],
          color: ['white', 'teal', 'blue'][Math.floor(Math.random() * 3)] as Star['color'],
          delay: Math.random() * 3,
          isGlowing: Math.random() > 0.7,
          isInteractive: section === 'hero' && Math.random() > 0.6,
        };
        newStars.push(star);
      }

      setStars(newStars);
    };

    const generatePatterns = () => {
      const patternCount = density === 'low' ? 3 : density === 'medium' ? 6 : 10;
      const newPatterns: Pattern[] = [];

      for (let i = 0; i < patternCount; i++) {
        const pattern: Pattern = {
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          type: ['triangle', 'diamond', 'circle'][Math.floor(Math.random() * 3)] as Pattern['type'],
          isFloating: Math.random() > 0.5,
        };
        newPatterns.push(pattern);
      }

      setPatterns(newPatterns);
    };

    generateStars();
    generatePatterns();
  }, [density, section]);

  // Generate shooting stars periodically
  useEffect(() => {
    const generateShootingStar = () => {
      const id = Date.now();
      setShootingStars(prev => [...prev, id]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(starId => starId !== id));
      }, 3000);
    };

    const interval = setInterval(generateShootingStar, 8000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStarClick = (starId: number) => {
    // Add a little magic dust effect on click
    const star = stars.find(s => s.id === starId);
    if (star) {
      // Create temporary magic dust particles
      const dustCount = 5;
      for (let i = 0; i < dustCount; i++) {
        const dust = document.createElement('div');
        dust.className = 'magic-dust';
        dust.style.left = `${star.left}%`;
        dust.style.top = `${star.top}%`;
        dust.style.animationDelay = `${i * 0.1}s`;
        
        const container = document.querySelector('.contact-stars');
        if (container) {
          container.appendChild(dust);
          setTimeout(() => {
            if (container.contains(dust)) {
              container.removeChild(dust);
            }
          }, 4000);
        }
      }
    }
  };

  const sectionClass = section === 'hero' ? 'hero-stars' : 
                     section === 'form' ? 'form-stars form-section' : 
                     'floating-stars';

  return (
    <div className={`contact-stars ${sectionClass}`}>
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.size} ${star.color} ${star.isGlowing ? 'glowing' : ''} ${star.isInteractive ? 'interactive-star' : ''}`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
          }}
          onClick={star.isInteractive ? () => handleStarClick(star.id) : undefined}
        />
      ))}

      {/* Geometric Patterns */}
      {patterns.map((pattern) => (
        <div
          key={pattern.id}
          className={`geometric-pattern ${pattern.type} ${pattern.isFloating ? 'floating' : ''}`}
          style={{
            left: `${pattern.left}%`,
            top: `${pattern.top}%`,
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((id) => (
        <div
          key={id}
          className="shooting-star"
          style={{
            left: `${Math.random() * 50}%`,
            top: `${20 + Math.random() * 30}%`,
          }}
        />
      ))}

      {/* Constellation Lines (only for hero section) */}
      {section === 'hero' && (
        <>
          <div
            className="constellation-line"
            style={{
              left: '20%',
              top: '30%',
              width: '15%',
              transform: 'rotate(25deg)',
              animationDelay: '1s',
            }}
          />
          <div
            className="constellation-line"
            style={{
              left: '60%',
              top: '20%',
              width: '12%',
              transform: 'rotate(-15deg)',
              animationDelay: '2.5s',
            }}
          />
          <div
            className="constellation-line"
            style={{
              left: '75%',
              top: '60%',
              width: '18%',
              transform: 'rotate(45deg)',
              animationDelay: '4s',
            }}
          />
        </>
      )}

      {/* Star connections (subtle lines between some stars) */}
      {section !== 'form' && stars.length > 5 && (
        <>
          {[...Array(3)].map((_, i) => {
            const star1 = stars[i * 2];
            const star2 = stars[i * 2 + 1];
            if (!star1 || !star2) return null;

            const dx = star2.left - star1.left;
            const dy = star2.top - star1.top;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            return (
              <div
                key={`connection-${i}`}
                className="star-connection"
                style={{
                  left: `${star1.left}%`,
                  top: `${star1.top}%`,
                  width: `${length}%`,
                  height: '1px',
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: '0 0',
                  animationDelay: `${i * 2}s`,
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ContactStars;
