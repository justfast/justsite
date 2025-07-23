import { useState, useEffect } from 'react';

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  delay?: number;
  startTyping?: boolean;
}

export const useTypingEffect = ({ text, speed = 100, delay = 0, startTyping = true }: UseTypingEffectOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset dello stato quando il testo cambia
    setDisplayedText('');
    setIsComplete(false);
    
    // Non avviare l'effetto se startTyping è false
    if (!startTyping) return;
    
    let timeoutId: NodeJS.Timeout;
    let typingTimer: NodeJS.Timeout;
    
    if (delay > 0) {
      timeoutId = setTimeout(() => {
        beginTyping();
      }, delay);
    } else {
      beginTyping();
    }

    function beginTyping() {
      let index = 0;
      typingTimer = setInterval(() => {
        setDisplayedText(text.slice(0, index));
        index++;
        if (index > text.length) {
          clearInterval(typingTimer);
          setIsComplete(true);
        }
      }, speed);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (typingTimer) clearInterval(typingTimer);
    };
  }, [text, speed, delay, startTyping]);

  return { displayedText, isComplete };
};