import React, { useState, useEffect, useRef } from 'react';
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
      await updateDoc(productRef, { stock: increment(-item.quantity) });
    });
    await Promise.all(updates);
  } catch (err) {
    console.error('Errore stock:', err);
  }
};

const Checkout: React.FC<CheckoutProps> = ({ items, onClose }) => {
  const [shippingData, setShippingData] = useState({
    name: '', address: '', city: '', zip: '', country: '', phone: ''
  });
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Flag per evitare esecuzioni multiple
  
  const processingRef = useRef(false); // Ref per sicurezza extra in handleOrderCompletion

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFormValid = Object.values(shippingData).every(v => v.trim() !== '');

  useEffect(() => {
    if (checkoutId && (window as any).SumUpCard) {
      const container = document.getElementById('sumup-card-default');
      
      if (container) {
        (window as any).SumUpCard.mount({
          id: 'sumup-card-default',
          checkoutId: checkoutId,
          onResponse: async (type: string, body: any) => {
            // Logica di sicurezza: non ci fidiamo solo di 'success' o del body del frontend
            if (type === 'success' || body.status === 'PAID') {
              await verifyAndCompleteOrder(checkoutId);
            }
          },
        });
      }
    }
  }, [checkoutId]);

  // FUNZIONE CRITICA: Verifica lato server prima di confermare
  const verifyAndCompleteOrder = async (id: string) => {
    if (processingRef.current) return;
    processingRef.current = true;
    setIsProcessing(true);

    try {
      // 1. Chiamata al tuo backend per verificare lo stato reale su SumUp
      const verifyRes = await fetch(`/api/verify-sumup?checkoutId=${id}`);
      const verifyData = await verifyRes.json();

      if (verifyData.status === 'PAID') {
        await handleOrderCompletion();
      } else {
        alert("Il pagamento non risulta confermato. Se i soldi sono stati scalati, contatta l'assistenza.");
        processingRef.current = false;
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Errore verifica pagamento:", err);
      alert("Errore durante la verifica del pagamento.");
      processingRef.current = false;
      setIsProcessing(false);
    }
  };

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
          // Passa anche un riferimento interno se possibile
        }),
      });
      const data = await response.json();
      
      if (data.id) {
        setCheckoutId(data.id);
      }
    } catch (err) {
      console.error("Errore creazione checkout:", err);
      alert("Errore tecnico nella creazione dell'ordine.");
    } finally {
      setIsInitializing(false);
    }
  };

  const handleOrderCompletion = async () => {
    await decreaseStock(items);
    await sendEventBookingEmail({
      data_evento: new Date().toLocaleString(),
      email: 'gianni.mancarella@gmail.com',
      ore: items.length,
      prezzo: total,
      dettagli: `Spedizione: ${shippingData.name}. Indirizzo: ${shippingData.address}, ${shippingData.city}. Prodotti: ${items.map(i => i.name).join(', ')}`,
      richiesta_data: new Date().toLocaleString()
    });
    
    alert('Pagamento completato e ordine registrato!');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 z-50">
        
        {/* Overlay di caricamento durante la verifica finale */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white bg-opacity-80 z-[60] flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-2" />
            <p className="text-gray-900 font-medium">Verifica pagamento in corso...</p>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeft className="h-5 w-5 mr-2" /> Torna al carrello
          </button>
          <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
          <div className="w-10"></div>
        </div>

        <div className="mb-6 space-y-3">
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

        <div className="mb-6 border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900">Totale:</span>
            <span className="text-2xl font-bold text-blue-600">€{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Pagamento</h3>
          
          {!isFormValid ? (
            <div className="p-3 bg-gray-100 text-gray-500 text-sm rounded text-center">
              Compila tutti i campi per procedere
            </div>
          ) : !checkoutId ? (
            <button 
              onClick={createSumUpCheckout}
              disabled={isInitializing}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 flex items-center justify-center"
            >
              {isInitializing ? <Loader2 className="animate-spin mr-2" /> : 'Procedi al pagamento'}
            </button>
          ) : (
            <div id="sumup-card-default" className="min-h-[250px]"></div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-2 text-sm text-gray-600">
          <CreditCard className="h-4 w-4" />
          <span>Transazione sicura via SumUp</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;