import emailjs from '@emailjs/browser';

// Configurazione EmailJS
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
};

// Inizializza EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

// Interfaccia per i dati dell'evento
export interface EventBookingData {
  data_evento: string;
  email: string;
  ore: number;
  prezzo: number;
  dettagli: string;
  richiesta_data: string;
}

// Funzione per inviare email di prenotazione evento
export const sendEventBookingEmail = async (data: EventBookingData): Promise<boolean> => {
  try {
    const templateParams = {
      data_evento: data.data_evento,
      email: data.email,
      ore: data.ore,
      prezzo: data.prezzo,
      dettagli: data.dettagli,
      richiesta_data: data.richiesta_data,
      to_email: 'gianni.mancarella@gmail.com'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('Email inviata con successo:', response.status, response.text);
    return true;
  } catch (error) {
    console.error('Errore nell\'invio dell\'email:', error);
    return false;
  }
};

export default EMAILJS_CONFIG;