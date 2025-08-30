interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = "", width = 32, height = 32 }: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* T letter shape with modern styling */}
      <rect
        x="4"
        y="6"
        width="24"
        height="4"
        rx="2"
        fill="currentColor"
      />
      <rect
        x="14"
        y="6"
        width="4"
        height="20"
        rx="2"
        fill="currentColor"
      />
      
      {/* Accent dots for brand recognition */}
      <circle cx="8" cy="24" r="2" fill="#FF6B35" />
      <circle cx="24" cy="24" r="2" fill="#FFC107" />
      
      {/* Subtle gradient overlay */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
