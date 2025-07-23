import React, { useState, useEffect } from 'react';
import { ChevronRight, Play } from 'lucide-react';
import TypingText from './TypingText';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const backgroundImages = [
    '/sfondo.jpg',
    '/pista.jpg',
    '/postazioni compleanni volanti.jpg',
    '/volante.jpg',
    '/images/sfondi/altro esempio di fiera o compleanno.jpg',
    '/images/sfondi/sfondo shop.png'
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
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black">
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
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Logo JustFast con animazione */}
        <div className="mb-16">
          <img 
            src="/logo.jpeg" 
            alt="JustFast Logo" 
            className={`mx-auto object-contain transition-all duration-1500 ease-out ${
              isTypingComplete 
                ? 'animate-bounce' 
                : 'animate-zoom-in'
            }`}
            style={{ width: '32.5vw', maxWidth: '390px', minWidth: '195px' }}
          />
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          <TypingText 
            text="NON GIOCARE. GUIDA DAVVERO." 
            speed={80}
            className="text-white"
            onComplete={() => setIsTypingComplete(true)}
          />
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
          <TypingText 
            text="L'esperienza di guida RC FPV più coinvolgente mai vista."
            speed={60}
            delay={2500}
            showCursor={false}
            className="text-gray-300"
          />
        </p>
        
        <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          <TypingText 
            text="Volante reale, marce vere e la pista davanti ai tuoi occhi e in diretta video."
            speed={50}
            delay={4500}
            showCursor={false}
            className="text-gray-400"
          />
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#shop"
            className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105"
          >
            Scopri le macchine
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#events"
            className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105"
          >
            <Play className="mr-2 h-5 w-5" />
            Prenota l'evento
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;