import React from 'react';
import { Award, Calendar, MapPin, Zap } from 'lucide-react';
import TypingText from './TypingText';
import ScrollAnimatedElement from './ScrollAnimatedElement';

const About: React.FC = () => {
  const stats = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Dal 2023',
      description: 'Pionieri del RC FPV'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Specialisti',
      description: 'Eventi RC FPV'
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Ovunque',
      description: 'In tutta Italia'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Chiavi in mano',
      description: 'Adrenalina pura'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black relative">
      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/images/sfondi/66.jpg" 
          alt="Background JustFast" 
          className="w-full h-full object-cover"
        />
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedElement className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            <TypingText 
              text="Chi siamo?" 
              speed={80}
              showCursor={false}
            />
            <span className="text-red-600">
              <TypingText 
                text="" 
                speed={80}
                delay={1000}
              />
            </span>
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mb-3 sm:mb-4">
            DAL 2023, GLI SPECIALISTI DEGLI EVENTI RC FPV.
          </p>
        </ScrollAnimatedElement>

        <ScrollAnimatedElement 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 px-4"
          translateDistance={60}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-4 sm:p-6 glass-effect shadow-professional transition-professional rounded-xl transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'rgba(0, 0, 0, 0.3) 0px 8px 32px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset'
              }}
            >
              <div className="text-red-600 mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform">
                <div className="w-6 h-6 sm:w-8 sm:h-8">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{stat.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{stat.description}</p>
            </div>
          ))}
        </ScrollAnimatedElement>

        <ScrollAnimatedElement 
          className="glass-effect rounded-2xl p-4 sm:p-6 lg:p-8 text-center shadow-professional hover:shadow-professional-hover transition-professional mx-4"
          translateDistance={50}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
            🚀 Portiamo emozione e velocità ovunque
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 max-w-2xl mx-auto">
            Fiere, scuole, compleanni e showroom. Ogni dettaglio è pensato per sorprendere.
          </p>
          <p className="text-base sm:text-lg font-semibold text-red-400">
            JustFast è adrenalina chiavi in mano.
          </p>
        </ScrollAnimatedElement>
      </div>
    </section>
  );
};

export default About;