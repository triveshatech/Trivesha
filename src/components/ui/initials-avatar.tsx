import React from 'react';

interface InitialsAvatarProps {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
}

// Simple initials avatar: if an image src exists and is not the default placeholder, show it; otherwise render first letter.
const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ name, src, size = 48, className = '' }) => {
  const first = name ? name.trim().charAt(0).toUpperCase() : '?';
  const isPlaceholder = !src || src === '/placeholder.svg' || src === 'placeholder.svg';

  const bgStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(45,212,191,0.12), rgba(94,234,212,0.08))',
    color: '#E6FAF6'
  };

  const sizePx = `${size}px`;

  if (!isPlaceholder) {
    return (
      <div className={`rounded-full overflow-hidden ${className}`} style={{ width: sizePx, height: sizePx }}>
        <img src={src as string} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold ${className}`}
      style={{ width: sizePx, height: sizePx, ...bgStyle }}
      aria-hidden
    >
      <span className="text-lg select-none" style={{ fontSize: Math.round(size * 0.45) }}>{first}</span>
    </div>
  );
};

export default InitialsAvatar;
