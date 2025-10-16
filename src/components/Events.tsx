import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, Euro, Users, Monitor, Mail } from 'lucide-react';
import { sendEventBookingEmail, initEmailJS, type EventBookingData } from '../config/emailjs';

const CustomStreetIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M7.97,2.242l-5,20A1,1,0,0,1,2,23a1.025,1.025,0,0,1-.244-.03,1,1,0,0,1-.727-1.212l5-20a1,1,0,1,1,1.94.484Zm10-.484a1,1,0,1,0-1.94.484l5,20A1,1,0,0,0,22,23a1.017,1.017,0,0,0,.243-.03,1,1,0,0,0,.728-1.212ZM12,1a1,1,0,0,0-1,1V6a1,1,0,0,0,2,0V2A1,1,0,0,0,12,1Zm0,7.912a1,1,0,0,0-1,1v4.176a1,1,0,1,0,2,0V9.912A1,1,0,0,0,12,8.912ZM12,17a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V18A1,1,0,0,0,12,17Z"></path>
    </g>
  </svg>
);
import TypingText from './TypingText';

interface EventsProps {
  userEmail?: string;
}

const Events: React.FC<EventsProps> = ({ userEmail }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [email, setEmail] = useState(userEmail || '');
  const [hours, setHours] = useState(1);
  const [totalPrice, setTotalPrice] = useState(200);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const backgroundImages = [
    '/images/sfondi/55.jpg',
    '/images/sfondi/11.jpg',
    '/images/sfondi/44.png'
  ];

  useEffect(() => {
    // Inizializza EmailJS
    initEmailJS();
    
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);

    return () => clearInterval(imageTimer);
  }, []);

  // Aggiorna l'email quando userEmail cambia
  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [userEmail]);

  const calculatePrice = (hours: number) => {
    return hours === 1 ? 200 : 200 + (hours - 1) * 50;
  };

  const handleHoursChange = (newHours: number) => {
    setHours(newHours);
    setTotalPrice(calculatePrice(newHours));
  };

  const handleBookingSubmit = async () => {
    if (!selectedDate || !email) {
      alert('Per favore compila tutti i campi obbligatori.');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData: EventBookingData = {
        data_evento: new Date(selectedDate).toLocaleDateString('it-IT', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        email: email,
        ore: hours,
        prezzo: totalPrice,
        dettagli: `Prenotazione evento RC FPV - ${hours} ${hours === 1 ? 'ora' : 'ore'}`,
        richiesta_data: new Date().toLocaleDateString('it-IT')
      };

      const success = await sendEventBookingEmail(bookingData);

      if (success) {
        // Mostra popup di successo
        setShowSuccessPopup(true);
        // Nascondi popup dopo 4 secondi
        setTimeout(() => setShowSuccessPopup(false), 4000);
        // Reset form
        setSelectedDate('');
        setEmail('');
        setHours(1);
        setTotalPrice(200);
      } else {
        alert('❌ Errore nell\'invio della richiesta. Riprova più tardi o contattaci direttamente.');
      }
    } catch (error) {
      console.error('Errore durante l\'invio:', error);
      alert('❌ Errore nell\'invio della richiesta. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
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
      icon: <CustomStreetIcon />,
      title: 'Pista professionale',
      description: 'per la massima immersività'
    }
  ];

  return (
    <>
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-2xl border border-green-400/30 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold text-sm">Prenotazione inoltrata!</span>
            </div>
          </div>
        </div>
      )}
      
      <section id="events" className="py-12 sm:py-16 lg:py-20 bg-gray-900 relative gradient-elegant">
      {/* Background images rotation */}
      <div className="absolute inset-0 opacity-30">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
      </div>
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-red-900/5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Un <span className="text-red-600">Gran Premio</span> tascabile
          </h2>
          <p className="text-base sm:text-xl mb-3 sm:mb-4">
            🎊 <span className="text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text font-bold">per la tua</span> <span className="text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text font-bold">festa</span> 🎉
          </p>
          <p className="text-sm sm:text-lg text-gray-400">
            🎉 In soli 4 × 3 metri montiamo una pista professionale con tutto il necessario
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Features */}
          <div className="space-y-3 sm:space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 glass-effect rounded-xl shadow-professional hover:shadow-professional-hover transition-professional">
                <div className="text-red-600 flex-shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{feature.description}</p>
                </div>
              </div>
            ))}

            <div className="glass-effect bg-gradient-to-r from-red-600/20 to-red-600/10 rounded-xl p-4 sm:p-6 border border-red-600/30 shadow-professional">
              <p className="text-red-400 font-semibold mb-2 text-sm sm:text-base">
                ⚠️ Tecnologia esclusiva degli eventi
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                La tecnologia con volante + marce è esclusiva degli eventi. Non è in vendita.
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="glass-effect rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-professional-hover">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
              <span>Calcola il tuo evento</span>
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="inline h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Seleziona la data
                </label>
                <div className="relative">
                  <input
                    ref={dateInputRef}
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="absolute opacity-0 pointer-events-none"
                  />
                  <button
                    type="button"
                    onClick={() => dateInputRef.current?.showPicker()}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 glass-effect border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-professional flex items-center justify-between hover:bg-white/5 text-sm sm:text-base"
                  >
                    <span className={selectedDate ? 'text-white' : 'text-gray-400'}>
                      {selectedDate ? new Date(selectedDate).toLocaleDateString('it-IT', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'Clicca per selezionare una data'}
                    </span>
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  <Mail className="inline h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Email o numero di telefono
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 glass-effect border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-professional placeholder-gray-400 hover:bg-white/5 text-sm sm:text-base"
                  placeholder="La tua email o numero di telefono"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  <Clock className="inline h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Durata evento
                </label>
                <select
                  value={hours}
                  onChange={(e) => handleHoursChange(parseInt(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 glass-effect border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-professional appearance-none cursor-pointer hover:bg-white/5 text-sm sm:text-base"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ef4444' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map(h => (
                    <option key={h} value={h} className="bg-gray-800 text-white py-2 px-4 hover:bg-gray-700">
                      {h} {h === 1 ? 'ora' : 'ore'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="glass-effect rounded-xl p-3 sm:p-4 shadow-professional">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm sm:text-base">Prima ora:</span>
                  <span className="text-white font-semibold text-sm sm:text-base">€200</span>
                </div>
                {hours > 1 && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm sm:text-base">Ore aggiuntive ({hours - 1}):</span>
                    <span className="text-white font-semibold text-sm sm:text-base">€{(hours - 1) * 50}</span>
                  </div>
                )}
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-bold text-white">Totale:</span>
                    <span className="text-xl sm:text-2xl font-bold text-red-600">€{totalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBookingSubmit}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 sm:py-4 rounded-xl transition-professional flex items-center justify-center transform hover:scale-105 shadow-professional hover:shadow-professional-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                disabled={!selectedDate || !email || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Euro className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Prenota ora
                  </>
                )}
              </button>

              <p className="text-xs sm:text-sm text-gray-400 text-center">
                📅 Prezzo: 200€ la prima ora, poi 50€/ora
              </p>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default Events;