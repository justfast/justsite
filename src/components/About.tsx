import React from 'react';
import { Award, Calendar, MapPin, Zap } from 'lucide-react';
import TypingText from './TypingText';

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
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <TypingText 
              text="Chi siamo? / " 
              speed={80}
              showCursor={false}
            />
            <span className="text-red-600">
              <TypingText 
                text="Credibilità" 
                speed={80}
                delay={1000}
              />
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            <TypingText 
              text="DAL 2023, GLI SPECIALISTI DEGLI EVENTI RC FPV."
              speed={60}
              delay={2200}
              showCursor={false}
              className="text-gray-300"
            />
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-red-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{stat.title}</h3>
              <p className="text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 text-center border border-gray-700">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
            <TypingText 
              text="🚀 Portiamo emozione e velocità ovunque"
              speed={70}
              delay={3500}
              showCursor={false}
            />
          </h3>
          <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
            Fiere, scuole, compleanni e showroom. Ogni dettaglio è pensato per sorprendere.
          </p>
          <p className="text-xl font-semibold text-red-400">
            JustFast è adrenalina chiavi in mano.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;