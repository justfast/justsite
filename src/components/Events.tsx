import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Euro, Users, Monitor } from 'lucide-react';
import TypingText from './TypingText';

const Events: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [hours, setHours] = useState(1);
  const [totalPrice, setTotalPrice] = useState(200);

  const calculatePrice = (hours: number) => {
    return hours === 1 ? 200 : 200 + (hours - 1) * 50;
  };

  const handleHoursChange = (newHours: number) => {
    setHours(newHours);
    setTotalPrice(calculatePrice(newHours));
  };

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Volanti da corsa',
      description: 'Marce simulate, suoni realistici'
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: 'Visuale FPV live',
      description: 'Su maxischermi HD'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Postazioni pronte',
      description: 'Per gareggiare subito'
    }
  ];

  return (
    <section id="events" className="py-20 bg-gray-900 relative">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="/postazioni compleanni volanti.jpg" 
          alt="Postazioni eventi" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <TypingText 
              text="Un " 
              speed={80}
              showCursor={false}
            />
            <span className="text-red-600">
              <TypingText 
                text="Gran Premio" 
                speed={80}
                delay={300}
                showCursor={false}
              />
            </span>
            <TypingText 
              text=" tascabile" 
              speed={80}
              delay={1200}
            />
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            <TypingText 
              text="per la tua festa"
              speed={60}
              delay={2200}
              showCursor={false}
              className="text-gray-300"
            />
          </p>
          <p className="text-lg text-gray-400">
            <TypingText 
              text="🎉 In soli 4 × 3 metri montiamo una pista professionale con tutto il necessario"
              speed={50}
              delay={3200}
              showCursor={false}
              className="text-gray-400"
            />
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gray-800/90 backdrop-blur-sm rounded-xl">
                <div className="text-red-600 flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-r from-red-600/20 to-red-600/10 rounded-xl p-6 border border-red-600/30 backdrop-blur-sm">
              <p className="text-red-400 font-semibold mb-2">
                ⚠️ Tecnologia esclusiva degli eventi
              </p>
              <p className="text-gray-300">
                La tecnologia con volante + marce è esclusiva degli eventi. Non è in vendita.
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              <TypingText 
                text="Calcola il tuo evento"
                speed={70}
                delay={4500}
                showCursor={false}
              />
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Seleziona la data
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Clock className="inline h-4 w-4 mr-2" />
                  Durata evento
                </label>
                <select
                  value={hours}
                  onChange={(e) => handleHoursChange(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  {[1, 2, 3, 4, 5, 6].map(h => (
                    <option key={h} value={h}>
                      {h} {h === 1 ? 'ora' : 'ore'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Prima ora:</span>
                  <span className="text-white font-semibold">€200</span>
                </div>
                {hours > 1 && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Ore aggiuntive ({hours - 1}):</span>
                    <span className="text-white font-semibold">€{(hours - 1) * 50}</span>
                  </div>
                )}
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">Totale:</span>
                    <span className="text-2xl font-bold text-red-600">€{totalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors duration-300 flex items-center justify-center transform hover:scale-105"
                disabled={!selectedDate}
              >
                <Euro className="mr-2 h-5 w-5" />
                Prenota ora
              </button>

              <p className="text-sm text-gray-400 text-center">
                📅 Prezzo: 200€ la prima ora, poi 50€/ora
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;