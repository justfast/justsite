import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScrollAnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  translateDistance?: number;
  as?: keyof JSX.IntrinsicElements;
}

const ScrollAnimatedElement: React.FC<ScrollAnimatedElementProps> = ({
  children,
  className = '',
  threshold = 0.2,
  translateDistance = 50,
  as: Component = 'div'
}) => {
  const { ref, style } = useScrollAnimation({ threshold, translateDistance });

  return (
    <Component
      ref={ref as any}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
};

export default ScrollAnimatedElement;