import React from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';

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

const Checkout: React.FC<CheckoutProps> = ({ items, onClose }) => {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toFixed(2)
        }
      }]
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      alert(`Pagamento completato! Grazie ${details.payer.name.given_name}`);
      onClose();
    });
  };

  const onError = (err: any) => {
    console.error('Errore PayPal:', err);
    alert('Si è verificato un errore durante il pagamento. Riprova.');
  };

  const handleBackToCart = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBackToCart}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Torna al carrello
            </button>
            <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* Order Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Riepilogo ordine</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 object-cover rounded"
                    />
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
            
            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-300 mt-4">
              <span className="text-lg font-semibold text-gray-900">Totale:</span>
              <span className="text-2xl font-bold text-red-600">€{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Metodo di pagamento</h3>
            
            {/* PayPal Button */}
            <div className="w-full">
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                style={{
                  layout: 'vertical',
                  color: 'blue',
                  shape: 'rect',
                  label: 'paypal'
                }}
              />
            </div>
            
            <p className="text-sm text-gray-600 mt-3 text-center">
              Pagamento sicuro e protetto tramite PayPal
            </p>
          </div>

          {/* Security Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CreditCard className="h-4 w-4" />
              <span>I tuoi dati di pagamento sono protetti con crittografia SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;