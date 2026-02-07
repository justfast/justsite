import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Loader2 } from 'lucide-react';
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

const decreaseStock = async (items: CartItem[]) => {
  try {
    const updates = items.map(async (item) => {
      const productRef = doc(db, 'stock', item.id.toString());
      await updateDoc(productRef, {
        stock: increment(-item.quantity),
      });
    });
    await Promise.all(updates);
  } catch (err) {
    console.error('Errore aggiornando lo stock:', err);
  }
};

const Checkout: React.FC<CheckoutProps> = ({ items, onClose }) => {
  const [shippingData, setShippingData] = useState({
    name: '', address: '', city: '', zip: '', country: '', phone: ''
  });
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFormValid = Object.values(shippingData).every(v => v.trim() !== '');

  // 1. Funzione per creare il checkout tramite la tua API su Vercel
  const createSumUpCheckout = async () => {
    if (!isFormValid || checkoutId || isInitializing) return;

    setIsInitializing(true);
    try {
      const response = await fetch('/api/sumup-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'EUR',
        }),
      });
      const data = await response.json();
      
      if (data.id) {
        setCheckoutId(data.id);
        mountSumUpWidget(data.id);
      }
    } catch (err) {
      console.error("Errore creazione checkout:", err);
      alert("Errore tecnico nella creazione dell'ordine.");
    } finally {
      setIsInitializing(false);
    }
  };

  // 2. Funzione per montare il widget fisico di SumUp
  const mountSumUpWidget = (id: string) => {
    if ((window as any).SumUpCard) {
      (window as any).SumUpCard.mount({
        id: 'sumup-card-default',
        checkoutId: id,
        onResponse: async (type: string, body: any) => {
          // Successo: lo stato può essere 'success' o 'PAID' in base alla risposta
          if (type === 'success' || body.status === 'PAID') {
            await handleOrderCompletion();
          }
        },
      });
    }
  };

  const handleOrderCompletion = async () => {
    await decreaseStock(items);
    await sendEventBookingEmail({
      data_evento: new Date().toLocaleString(),
      email: 'gianni.mancarella@gmail.com',
      ore: items.length,
      prezzo: total,
      dettagli: `Spedizione: ${shippingData.name}, ${shippingData.address}. Prodotti: ${items.map(i => i.name).join(', ')}`,
      richiesta_data: new Date().toLocaleString()
    });
    alert('Pagamento completato con successo!');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
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
          <div className="w-10"></div>
        </div>

        {/* Shipping Form */}
        <div className="mb-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Dati di spedizione</h3>
          {['name','address','city','zip','country','phone'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field === 'name' ? 'Nome e Cognome' : field.toUpperCase()}
              value={shippingData[field as keyof typeof shippingData]}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="mb-6 border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900">Totale:</span>
            <span className="text-2xl font-bold text-blue-600">€{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Pagamento</h3>
          
          {!isFormValid ? (
            <div className="p-3 bg-gray-100 text-gray-500 text-sm rounded text-center">
              Compila tutti i campi sopra per procedere
            </div>
          ) : !checkoutId ? (
            <button 
              onClick={createSumUpCheckout}
              disabled={isInitializing}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition flex items-center justify-center"
            >
              {isInitializing ? <Loader2 className="animate-spin mr-2" /> : 'Paga con Carta'}
            </button>
          ) : (
            <div id="sumup-card-default">
              {/* Qui viene iniettato il widget di SumUp */}
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-2 text-sm text-gray-600">
          <CreditCard className="h-4 w-4" />
          <span>Transazione sicura crittografata via SumUp</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;