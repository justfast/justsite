import React, { useState, useEffect } from 'react';
import { ChevronRight, Play } from 'lucide-react';
import TypingText from './TypingText';
import ScrollAnimatedElement from './ScrollAnimatedElement';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'deleting' | 'finished'>('typing');
  const [guidaColorStyle, setGuidaColorStyle] = useState({ color: 'white' });
  
  const fullText = 'NON GIOCARE. GUIDA DAVVERO.';
  const deleteText = 'NON GIOCARE.';
  const finalText = 'GUIDA DAVVERO.';
  
  useEffect(() => {
    if (phase === 'typing') {
      let index = 0;
      const typingTimer = setInterval(() => {
        setDisplayText(fullText.slice(0, index));
        index++;
        if (index > fullText.length) {
          clearInterval(typingTimer);
          setPhase('waiting');
          setTimeout(() => setPhase('deleting'), 2000);
        }
      }, 100);
      return () => clearInterval(typingTimer);
    }
    
    if (phase === 'deleting') {
      let index = deleteText.length;
      const totalDeletionTime = deleteText.length * 150; // 1800ms
      let startTime = Date.now();
      
      // Avvia la transizione graduale del colore
       const colorTransition = setInterval(() => {
         const elapsed = Date.now() - startTime;
         const progress = Math.min(elapsed / totalDeletionTime, 1);
         
         if (progress >= 1) {
           setGuidaColorStyle({ color: '#dc2626' }); // red-600
           clearInterval(colorTransition);
         } else {
           // Transizione graduale da bianco (255,255,255) a rosso (220,38,38)
           const red = Math.round(255 + (220 - 255) * progress);
           const green = Math.round(255 + (38 - 255) * progress);
           const blue = Math.round(255 + (38 - 255) * progress);
           setGuidaColorStyle({ 
             color: `rgb(${red}, ${green}, ${blue})`,
             transition: 'color 0.05s ease-out'
           });
         }
       }, 50);
      
      const deletingTimer = setInterval(() => {
        const remainingDelete = deleteText.slice(0, index);
        setDisplayText(remainingDelete + ' GUIDA DAVVERO.');
        index--;
        if (index < 0) {
          clearInterval(deletingTimer);
          clearInterval(colorTransition);
          setDisplayText(finalText);
          setShowCursor(false);
          setPhase('finished');
          setGuidaColorStyle({ color: '#dc2626' });
        }
      }, 150);
      
      return () => {
        clearInterval(deletingTimer);
        clearInterval(colorTransition);
      };
    }
  }, [phase]);

  const backgroundImages = [
    '/images/sfondi/11.jpg',
    '/images/sfondi/22.jpg',
    '/images/sfondi/33.jpg',
    '/images/sfondi/44.png',
    '/images/sfondi/55.jpg',
    '/images/sfondi/66.jpg'
  ];

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);

    return () => clearInterval(imageTimer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-red-900/5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Logo JustFast con animazione */}
        <div className="mb-2" style={{ transform: 'translateY(-40px) scale(1.1)', transformOrigin: 'center' }}>
          <img 
            src="/logo.jpeg" 
            alt="JustFast Logo" 
            className="mx-auto object-contain animate-zoom-in"
            style={{ 
              width: '45vw', 
              maxWidth: '390px', 
              minWidth: '150px',
              animationDelay: '0s',
              animationFillMode: 'forwards'
            }}
            onAnimationEnd={(e) => {
              if (e.animationName === 'zoom-in') {
                e.currentTarget.classList.remove('animate-zoom-in');
                e.currentTarget.classList.add('animate-breathe');
              }
            }}
          />
        </div>
        
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
          <span className="relative inline-block">
            {phase === 'finished' ? (
               <span style={guidaColorStyle}>{finalText}</span>
             ) : (
               <>
                 {displayText.includes('GUIDA DAVVERO') ? (
                   <>
                     <span className="text-white">
                       {displayText.replace(' GUIDA DAVVERO.', '')}
                     </span>
                     {displayText.includes(' GUIDA DAVVERO.') && (
                       <>
                         <span className="text-white"> </span>
                         <span style={guidaColorStyle}>GUIDA DAVVERO.</span>
                       </>
                     )}
                   </>
                 ) : (
                   <span className="text-white">{displayText}</span>
                 )}
               </>
             )}
            {showCursor && (
              <span className="animate-pulse text-red-600">|</span>
            )}
          </span>
        </h1>
        
        <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-3 sm:mb-4 max-w-2xl mx-auto leading-relaxed opacity-0 translate-y-8 animate-fade-in-up px-4" style={{animationDelay: '2s', animationFillMode: 'forwards'}}>
          L'esperienza di guida RC FPV più coinvolgente mai vista.
        </p>
        
        <p className="text-sm sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto opacity-0 translate-y-8 animate-fade-in-up px-4" style={{animationDelay: '2.3s', animationFillMode: 'forwards'}}>
          Volante reale, marche vere e la pista davanti ai tuoi occhi e in diretta video.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <a
            href="#shop"
            className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-lg transition-professional flex items-center justify-center transform hover:scale-105 shadow-professional hover:shadow-professional-hover opacity-0 translate-y-8 animate-fade-in-up"
            style={{animationDelay: '3s', animationFillMode: 'forwards'}}
          >
            Scopri le macchine
            <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#events"
            className="group glass-effect border-2 border-white/30 text-white hover:bg-white/10 hover:border-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-lg transition-professional flex items-center justify-center transform hover:scale-105 shadow-professional hover:shadow-professional-hover opacity-0 translate-y-8 animate-fade-in-up backdrop-blur-sm"
            style={{animationDelay: '3.2s', animationFillMode: 'forwards'}}
          >
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Prenota l'evento
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center glass-effect shadow-professional">
          <div className="w-1 h-2 sm:h-3 bg-gradient-to-b from-white to-red-400 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;