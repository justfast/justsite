import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import Checkout from './Checkout';
import { getStockById } from '../getStockFromFirebase';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  const handleProceedToCheckout = async () => {
    // check stock per ogni prodotto
    for (const item of items) {
      const available = await getStockById(item.id.toString());
      if (item.quantity > available) {
        alert(`Non ci sono abbastanza ${item.name} in stock. Quantità massima disponibile: ${available}`);
        return; // blocca l'apertura del checkout
      }
    }
    // tutto ok, apri checkout
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-gray-900 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Carrello ({items.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-400 text-sm sm:text-base">Il carrello è vuoto</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-800 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm sm:text-base">{item.name}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">€{item.price}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </button>
                        <span className="text-white font-semibold text-sm sm:text-base">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </button>
                      </div>
                      <div className="text-white font-semibold text-sm sm:text-base">
                        €{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-700 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-base sm:text-lg font-semibold text-white">Totale:</span>
                <span className="text-xl sm:text-2xl font-bold text-red-600">€{total.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleProceedToCheckout} // ← check stock prima del checkout
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 rounded-lg transition-colors duration-300 text-sm sm:text-base"
              >
                Procedi al checkout
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <Checkout 
          items={items}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </div>
  );
};

export default Cart;
