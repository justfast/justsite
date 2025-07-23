import React from 'react';
import { Gamepad2, Eye, Gauge, Zap } from 'lucide-react';
import TypingText from './TypingText';

const Technology: React.FC = () => {
  const features = [
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: 'Volante Reale',
      description: 'Non premi tasti. Giri un volante vero con feedback tattile.'
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: 'Marce Simulate',
      description: 'Cambi marcia come su una vera auto da corsa.'
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Visuale FPV',
      description: 'Vedi attraverso gli occhi della macchina in tempo reale.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Esperienza Totale',
      description: 'Ogni curva, ogni accelerazione, ogni sorpasso.'
    }
  ];

  return (
    <section id="technology" className="py-20 bg-black relative">
      {/* Background image */}
      <div className="absolute inset-0 opacity-15">
        <img 
          src="/volante.jpg" 
          alt="Volante JustFast" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <TypingText 
              text="Non premi tasti. " 
              speed={80}
              showCursor={false}
            />
            <span className="text-red-600">
              <TypingText 
                text="Giri un volante." 
                speed={80}
                delay={1500}
              />
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            <TypingText 
              text="Cambi marcia. Vivi ogni curva."
              speed={60}
              delay={3000}
              showCursor={false}
              className="text-gray-300"
            />
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            <TypingText 
              text="Questa non è solo RC. È esperienza di guida."
              speed={50}
              delay={4200}
              showCursor={false}
              className="text-gray-400"
            />
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-gray-900/90 backdrop-blur-sm rounded-xl hover:bg-gray-800/90 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-red-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-600/20 to-red-600/10 rounded-2xl p-8 text-center border border-red-600/30 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-4">
            <TypingText 
              text="💡 Solo con JustFast puoi guidare davvero"
              speed={70}
              delay={5500}
              showCursor={false}
            />
          </h3>
          <p className="text-lg text-gray-300 mb-4">
            Volante fisico, cambiata simulata e visuale in prima persona su tv.
          </p>
          <p className="text-red-400 font-semibold">
            Una tecnologia esclusiva, disponibile solo durante i nostri eventi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Technology;