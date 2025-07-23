import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import TypingText from './TypingText';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
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
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <TypingText 
              text="Contatti" 
              speed={80}
            />
          </h2>
          <p className="text-xl text-gray-300">
            <TypingText 
              text="Pronto a portare l'adrenalina " 
              speed={60}
              delay={800}
              showCursor={false}
            />
            <span className="text-red-600">
              <TypingText 
                text="al tuo evento" 
                speed={60}
                delay={2000}
                showCursor={false}
              />
            </span>
            <TypingText 
              text="?" 
              speed={60}
              delay={2800}
            />
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                <TypingText 
                  text="Parliamone"
                  speed={70}
                  delay={3500}
                  showCursor={false}
                />
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg">
                    <div className="text-red-600 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{info.title}</h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-300 hover:text-red-600 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-300">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-600/20 to-red-600/10 rounded-xl p-6 border border-red-600/30">
              <h4 className="text-lg font-bold text-white mb-2">
                Risposta rapida garantita
              </h4>
              <p className="text-gray-300">
                Contattaci per preventivi personalizzati e disponibilità date.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">
              <TypingText 
                text="Richiedi informazioni"
                speed={70}
                delay={4200}
                showCursor={false}
              />
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Il tuo nome"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="La tua email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Messaggio
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Raccontaci del tuo evento..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors duration-300 flex items-center justify-center transform hover:scale-105"
              >
                <Send className="mr-2 h-5 w-5" />
                Invia messaggio
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;