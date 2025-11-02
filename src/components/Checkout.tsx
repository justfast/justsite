import React, { useState } from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { sendEventBookingEmail } from '../config/emailjs';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
}

interface CheckoutProps {
  items: CartItem[];
  onClose: () => void;
}

// decrementa lo stock su Firebase dopo un ordine completato
const decreaseStock = async (items: CartItem[]) => {
  try {
    const updates = items.map(async (item) => {
      const productRef = doc(db, 'stock', item.id.toString());
      await updateDoc(productRef, {
        stock: increment(-item.quantity),
      });
    });
    await Promise.all(updates);
    console.log('Stock aggiornato correttamente su Firebase!');
  } catch (err) {
    console.error('Errore aggiornando lo stock:', err);
  }
};

const CheckoutInner: React.FC<CheckoutProps> = ({ items, onClose }) => {
  const navigate = useNavigate();
  const [shippingData, setShippingData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    phone: ''
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(shippingData).every(v => v.trim() !== '');

  const createOrder = (data: any, actions: any) => {
    const itemsSummary = items.map(item => `${item.name} x${item.quantity}`).join(', ');
    const shippingSummary = `Nome: ${shippingData.name}, Via: ${shippingData.address}, Città: ${shippingData.city}, CAP: ${shippingData.zip}, Paese: ${shippingData.country}, Telefono: ${shippingData.phone}, Prodotti: ${itemsSummary}`;

    return actions.order.create({
      purchase_units: [{
        amount: { value: total.toFixed(2) },
        description: shippingSummary.substring(0, 250)
      }]
    });
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      alert(`Pagamento completato! Grazie ${details.payer.name.given_name}`);
      await decreaseStock(items);
      await sendEventBookingEmail({
        data_evento: new Date().toLocaleString(),
        email: 'gianni.mancarella@gmail.com',
        ore: items.length,
        prezzo: total,
        dettagli: `Dettagli spedizione: Nome: ${shippingData.name}, Via: ${shippingData.address}, Città: ${shippingData.city}, CAP: ${shippingData.zip}, Paese: ${shippingData.country}, Telefono: ${shippingData.phone}, Prodotti: ${items.map(i => i.name).join(', ')}`,
        richiesta_data: new Date().toLocaleString()
      });
      onClose();
    } catch (err) {
      console.error('Errore durante il pagamento o invio email:', err);
      alert('Si è verificato un errore. Riprova.');
    }
  };

  const onError = (err: any) => {
    console.error('Errore PayPal:', err);
    alert('Si è verificato un errore durante il pagamento. Riprova.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 z-50" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Torna al carrello
          </button>
          <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
          <div className="w-20"></div>
        </div>

        {/* Shipping Form */}
        <div className="mb-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Dati di spedizione</h3>
          {['name','address','city','zip','country','phone'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field === 'name' ? 'Nome e Cognome' :
                          field === 'address' ? 'Via e numero civico' :
                          field === 'city' ? 'Città' :
                          field === 'zip' ? 'CAP' :
                          field === 'country' ? 'Paese' :
                          'Numero di telefono'}
              value={shippingData[field as keyof typeof shippingData]}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          ))}
          {!isFormValid && <p className="text-red-600 text-sm mt-1">Compila tutti i campi per poter procedere al pagamento</p>}
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Riepilogo ordine</h3>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Colore: {item.color}</p>
                    <p className="text-sm text-gray-600">Quantità: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-300 mt-4">
            <span className="text-lg font-semibold text-gray-900">Totale:</span>
            <span className="text-2xl font-bold text-red-600">€{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Metodo di pagamento</h3>
          <PayPalButtons
            fundingSource="card"
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            style={{ layout: 'vertical', color: 'black', shape: 'rect', label: 'pay' }}
            disabled={!isFormValid}
          />

          <p className="text-sm text-gray-600 mt-3 text-center">
            Pagamento sicuro e protetto tramite PayPal
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span>I tuoi dati di pagamento sono protetti con crittografia SSL</span>
          </div>
        </div>

      </div>
    </div>
  );
};

// Wrapper con PayPalScriptProvider
const Checkout: React.FC<CheckoutProps> = (props) => {
  // 👉 Inserisci qui il tuo client-id (sandbox o live, quello che vuoi usare)
  const PAYPAL_CLIENT_ID = "AWzXcKsG2MslkQLwkejLScT94ysTg_NFb-U5o6CntrwB4oGt1Ejnl7uMIuNc98c-H3oKooKSMvZp0EpC";

  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_CLIENT_ID,
        currency: "EUR",
        intent: "capture",
      }}
    >
      <CheckoutInner {...props} />
    </PayPalScriptProvider>
  );
};

export default Checkout;
