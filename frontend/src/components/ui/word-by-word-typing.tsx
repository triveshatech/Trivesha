import { useEffect, useState } from "react";

interface WordByWordTypingProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
  highlightWords?: { [key: string]: string }; // Map of words to highlight with CSS classes
}

export const WordByWordTyping: React.FC<WordByWordTypingProps> = ({
  text,
  className = "",
  speed = 150,
  startDelay = 0,
  showCursor = true,
  onComplete,
  highlightWords = {}
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showTypingCursor, setShowTypingCursor] = useState(false);

  // Split text into words while preserving spaces and line breaks
  const words = text.split(/(\s+)/);

  useEffect(() => {
    if (isComplete) return;

    const startTimer = setTimeout(() => {
      setShowTypingCursor(true);
      
      const interval = setInterval(() => {
        setWordIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          
          if (nextIndex >= words.length) {
            clearInterval(interval);
            setIsComplete(true);
            setShowTypingCursor(false);
            if (onComplete) onComplete();
            return prevIndex;
          }
          
          // Update displayed text
          const currentText = words.slice(0, nextIndex).join('');
          setDisplayedText(currentText);
          
          return nextIndex;
        });
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [words, speed, startDelay, onComplete, isComplete]);

  const renderDisplayedText = () => {
    if (!displayedText) return null;

    // Split displayed text into words for highlighting
    const displayedWords = displayedText.split(/(\s+)/);
    
    return displayedWords.map((word, index) => {
      const cleanWord = word.trim().replace(/[.,!?;:]/g, ''); // Remove punctuation for matching
      const highlightClass = highlightWords[cleanWord];
      
      if (highlightClass && word.trim()) {
        return (
          <span key={index} className={highlightClass}>
            {word}
          </span>
        );
      }
      
      // Handle line breaks
      if (word.includes('\n')) {
        return word.split('\n').map((part, partIndex, parts) => (
          <span key={`${index}-${partIndex}`}>
            {part}
            {partIndex < parts.length - 1 && <br />}
          </span>
        ));
      }
      
      return <span key={index}>{word}</span>;
    });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Faint background text */}
      <div className="text-white/10 whitespace-pre-wrap leading-relaxed">
        {text}
      </div>
      
      {/* Typing overlay */}
      <div className="absolute top-0 left-0 text-zinc-300 whitespace-pre-wrap leading-relaxed">
        {renderDisplayedText()}
        {showTypingCursor && (
          <span className="border-r-2 border-white ml-1 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default WordByWordTyping;
