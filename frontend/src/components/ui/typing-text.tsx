import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  className = "",
  speed = 100,
  startDelay = 0,
  showCursor = true,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingCursor, setShowTypingCursor] = useState(false);

  useEffect(() => {
    const startTyping = setTimeout(() => {
      setIsTyping(true);
      setShowTypingCursor(true);
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          if (onComplete) onComplete();
          
          // Keep cursor blinking for a bit after completion
          setTimeout(() => {
            setShowTypingCursor(false);
          }, 2000);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, startDelay);

    return () => clearTimeout(startTyping);
  }, [text, speed, startDelay, onComplete]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Faint background text */}
      <span className="text-white/20">{text}</span>
      
      {/* Typing overlay */}
      <span 
        className="absolute top-0 left-0 text-white overflow-hidden whitespace-nowrap"
        style={{ width: `${(displayedText.length / text.length) * 100}%` }}
      >
        {displayedText}
        {showTypingCursor && (
          <span className="border-r-2 border-white ml-1 animate-pulse" />
        )}
      </span>
    </span>
  );
};

export default TypingText;
