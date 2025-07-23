import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
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
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white flex items-center">
              <ShoppingBag className="mr-2 h-6 w-6" />
              Carrello ({items.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Il carrello è vuoto</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <p className="text-gray-400">€{item.price}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="h-4 w-4 text-white" />
                        </button>
                        <span className="text-white font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-white" />
                        </button>
                      </div>
                      <div className="text-white font-semibold">
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
            <div className="border-t border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-white">Totale:</span>
                <span className="text-2xl font-bold text-red-600">€{total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors duration-300">
                Procedi al checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;