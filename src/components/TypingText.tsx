import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTypingEffect } from '../hooks/useTypingEffect';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  threshold?: number;
  onComplete?: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = '', 
  showCursor = true,
  threshold = 0.1,
  onComplete
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true
  });

  // Avvia l'effetto di digitazione solo quando l'elemento è visibile
  const { displayedText, isComplete } = useTypingEffect({ 
    text, 
    speed, 
    delay, 
    startTyping: hasStarted || inView 
  });

  // Chiama onComplete quando la digitazione è completata
  React.useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  // Quando l'elemento diventa visibile, imposta hasStarted a true
  React.useEffect(() => {
    if (inView && !hasStarted) {
      setHasStarted(true);
    }
  }, [inView, hasStarted]);

  return (
    <span ref={ref} className={`${className} relative inline-block`}>
      <span 
        className="bg-gradient-to-r from-red-500 via-white to-orange-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]"
        style={{
          backgroundImage: 'linear-gradient(45deg, #ef4444, #ffffff, #f97316, #ef4444)',
          backgroundSize: '200% 200%',
          animation: 'gradient-flow 3s ease-in-out infinite'
        }}
      >
        {hasStarted ? displayedText : ''}
      </span>
      {showCursor && hasStarted && !isComplete && (
        <span className="animate-pulse text-red-600">|</span>
      )}
      <style jsx>{`
        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </span>
  );
};

export default TypingText;