import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationState {
  opacity: number;
  translateY: number;
  isVisible: boolean;
}

interface UseScrollAnimationOptions {
  threshold?: number;
  translateDistance?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.2, translateDistance = 50 } = options;
  const elementRef = useRef<HTMLElement>(null);
  const [animationState, setAnimationState] = useState<ScrollAnimationState>({
    opacity: 0,
    translateY: translateDistance,
    isVisible: false
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate viewport zones
      const topZone = viewportHeight * threshold; // Top 20%
      const bottomZone = viewportHeight * (1 - threshold); // Bottom 20%
      
      // Element position relative to viewport
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      const elementCenter = (elementTop + elementBottom) / 2;
      
      // Check if element is in middle zone (60%)
      const isInMiddleZone = elementTop <= bottomZone && elementBottom >= topZone;
      
      if (isInMiddleZone) {
        // Element is in the visible zone
        setAnimationState({
          opacity: 1,
          translateY: 0,
          isVisible: true
        });
      } else {
        // Element is in fade zones
        let opacity = 0;
        let translateY = 0;
        
        if (elementBottom < topZone) {
          // Element is above viewport (exited upward)
          const distance = topZone - elementBottom;
          const maxDistance = viewportHeight * threshold;
          const progress = Math.min(distance / maxDistance, 1);
          
          opacity = Math.max(1 - progress, 0);
          translateY = -translateDistance * progress;
        } else if (elementTop > bottomZone) {
          // Element is below viewport (exited downward)
          const distance = elementTop - bottomZone;
          const maxDistance = viewportHeight * threshold;
          const progress = Math.min(distance / maxDistance, 1);
          
          opacity = Math.max(1 - progress, 0);
          translateY = translateDistance * progress;
        } else {
          // Element is entering from top or bottom
          if (elementCenter < viewportHeight / 2) {
            // Coming from top
            const progress = Math.max(0, (topZone - elementTop) / (viewportHeight * threshold));
            opacity = Math.max(1 - progress, 0);
            translateY = -translateDistance * progress;
          } else {
            // Coming from bottom
            const progress = Math.max(0, (elementBottom - bottomZone) / (viewportHeight * threshold));
            opacity = Math.max(1 - progress, 0);
            translateY = translateDistance * progress;
          }
        }
        
        setAnimationState({
          opacity,
          translateY,
          isVisible: opacity > 0
        });
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [threshold, translateDistance]);

  return {
    ref: elementRef,
    style: {
      opacity: animationState.opacity,
      transform: `translateY(${animationState.translateY}px)`,
      transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
    },
    isVisible: animationState.isVisible
  };
};