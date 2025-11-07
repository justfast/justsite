import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import TypingText from './TypingText';

interface ContactProps {
  userEmail?: string;
}

const Contact: React.FC<ContactProps> = ({ userEmail }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: userEmail || '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  // Aggiorna l'email quando userEmail cambia
  useEffect(() => {
    if (userEmail) {
      setFormData(prev => ({ ...prev, email: userEmail }));
    }
  }, [userEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        ore: formData.name, // Nome va nel campo {{ore}}
        dettagli: formData.message, // Messaggio va nel campo {{dettagli}}
        email: formData.email,
        to_email: 'gianni.mancarella@gmail.com'
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Mostra popup di successo
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 4000);

      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Errore nell\'invio dell\'email:', error);
      alert('Errore nell\'invio del messaggio. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Telefono',
      value: '3914750406',
      link: 'tel:3914750406'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      value: 'gianni.mancarella@gmail.com',
      link: 'mailto:gianni.mancarella@gmail.com'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Copertura',
      value: 'Italia, portiamo la pista ovunque',
      link: null
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 gradient-elegant" style={{ backgroundColor: '#171616' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            <TypingText 
              text="Contatti" 
              speed={80}
            />
          </h2>
          <p className="text-base sm:text-xl text-gray-300">
            Pronto a portare l'adrenalina <span className="text-red-600">al tuo evento</span>?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Parliamone
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 glass-effect rounded-xl shadow-professional hover:shadow-professional-hover transition-professional">
                    <div className="text-red-600 flex-shrink-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm sm:text-base">{info.title}</h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-300 hover:text-red-600 transition-colors text-sm sm:text-base"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-300 text-sm sm:text-base">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-effect bg-gradient-to-r from-red-600/20 to-red-600/10 rounded-xl p-4 sm:p-6 border border-red-600/30 shadow-professional">
              <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                Risposta rapida garantita
              </h4>
              <p className="text-gray-300 text-sm sm:text-base">
                Contattaci per preventivi personalizzati e disponibilità date.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-professional-hover">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              Richiedi Assistenza
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 glass-effect border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-professional placeholder-gray-400 text-sm sm:text-base"
                  placeholder="Il tuo nome"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 glass-effect border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-professional placeholder-gray-400 text-sm sm:text-base"
                  placeholder="La tua email"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Messaggio
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 glass-effect border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-professional placeholder-gray-400 resize-none text-sm sm:text-base"
                  placeholder="Raccontaci del tuo evento..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 sm:py-4 rounded-xl transition-professional flex items-center justify-center transform hover:scale-105 shadow-professional hover:shadow-professional-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
              >
                <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                {isSubmitting ? 'Invio in corso...' : 'Invia messaggio'}
              </button>
            </form>
          </div>
        </div>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <Check className="h-5 w-5" />
              <span className="font-medium">Messaggio inviato!</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;