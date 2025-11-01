import React, { useState } from 'react';
import { ShoppingCart, Package, Activity, MessageCircle, User, Mail, Phone, MapPin, LogOut, Calendar, X } from 'lucide-react';


import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
}

interface AccountProps {
  userEmail?: string;
  cartItems?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

const Account: React.FC<AccountProps> = ({ userEmail, cartItems = [], onUpdateQuantity, onRemoveItem }) => {

  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleLogout = async () => {
    try {

      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const menuItems = [
    {
      icon: ShoppingCart,
      title: 'Il Mio Carrello',
      description: 'Visualizza i prodotti nel tuo carrello',
      count: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      color: 'bg-blue-500',
      modalType: 'cart'
    },
    {
      icon: Package,
      title: 'I Miei Ordini',
      description: 'Storico degli ordini effettuati',
      count: 0,
      color: 'bg-green-500',
      modalType: 'orders'
    },
    {
      icon: Calendar,
      title: 'Le Mie Prenotazioni',
      description: 'Gestisci le tue prenotazioni',
      count: 0,
      color: 'bg-indigo-500',
      modalType: 'prenotazioni'
    },
    {
      icon: Activity,
      title: 'La Mia Attività',
      description: 'Cronologia delle tue attività',
      count: 0,
      color: 'bg-purple-500',
      modalType: 'activity'
    },
    {
      icon: MessageCircle,
      title: 'I Miei Messaggi',
      description: 'Messaggi e comunicazioni',
      count: 0,
      color: 'bg-orange-500',
      modalType: 'messages'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-red-500 rounded-full p-3">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Il Mio Account</h1>
              <p className="text-gray-600">{user?.email || userEmail}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                onClick={() => openModal(item.modalType)}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${item.color} rounded-lg p-3 shadow-md`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">{item.title === 'Il Mio Carrello' ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <div className="mt-4 text-red-500 text-sm font-medium">Clicca per aprire →</div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informazioni Account</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{user?.email || userEmail || 'Non disponibile'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Nome Utente</p>
                    <p className="text-gray-900">{user?.displayName || 'Non impostato'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Telefono</p>
                    <p className="text-gray-900">Non impostato</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Indirizzo</p>
                    <p className="text-gray-900">Non impostato</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Modifica Informazioni
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Azioni Rapide</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => openModal('cart')}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                    <span className="text-gray-900 group-hover:text-red-600">Vai al Carrello</span>
                  </div>
                </button>
                <button 
                  onClick={() => openModal('orders')}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                    <span className="text-gray-900 group-hover:text-red-600">Visualizza Ordini</span>
                  </div>
                </button>
                <button 
                  onClick={() => openModal('prenotazioni')}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                    <span className="text-gray-900 group-hover:text-red-600">Le Mie Prenotazioni</span>
                  </div>
                </button>
                <button 
                  onClick={() => openModal('messages')}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                    <span className="text-gray-900 group-hover:text-red-600">I Miei Messaggi</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stato Account</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Stato</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Attivo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Membro dal</span>
                  <span className="text-gray-900">Oggi</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ultimo accesso</span>
                  <span className="text-gray-900">Ora</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlays */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeModal === 'cart' && 'Il Mio Carrello'}
                {activeModal === 'orders' && 'I Miei Ordini'}
                {activeModal === 'prenotazioni' && 'Le Mie Prenotazioni'}
                {activeModal === 'activity' && 'La Mia Attività'}
                {activeModal === 'messages' && 'I Miei Messaggi'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {activeModal === 'cart' && (
                <div className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-center py-8">
                        <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Il tuo carrello è vuoto</p>
                        <button 
                           onClick={() => {
                             closeModal();
                             navigate('/shop');
                           }}
                           className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                         >
                           Inizia a fare shopping
                         </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-4">Prodotti nel Carrello ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</h3>
                        <div className="space-y-3">
                          {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-gray-600 text-sm">Colore: {item.color}</p>
                                <p className="text-red-600 font-semibold">€{item.price.toFixed(2)}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                  className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300"
                                >
                                  +
                                </button>
                                <button 
                                  onClick={() => onRemoveItem && onRemoveItem(item.id)}
                                  className="ml-4 text-red-600 hover:text-red-800"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Totale:</span>
                            <span className="text-xl font-bold text-red-600">
                              €{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex space-x-4">
                            <button 
                              onClick={() => {
                                closeModal();
                                navigate('/shop');
                              }}
                              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                            >
                              Continua Shopping
                            </button>
                            <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                              Procedi al Checkout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeModal === 'orders' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Non hai ancora effettuato ordini</p>
                      <button 
                        onClick={() => {
                          closeModal();
                          navigate('/shop');
                        }}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                      >
                        Esplora i prodotti
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeModal === 'prenotazioni' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Non hai prenotazioni attive</p>
                      <div className="flex space-x-4 mt-4 justify-center">
                        <button 
                           onClick={() => {
                             closeModal();
                             navigate('/events');
                           }}
                           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                         >
                           Nuova Prenotazione
                         </button>
                        <button 
                           onClick={() => {
                             closeModal();
                             navigate('/events');
                           }}
                           className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                         >
                           Scopri gli eventi
                         </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeModal === 'activity' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-4">Cronologia Attività</h3>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <User className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Accesso effettuato</p>
                          <p className="text-gray-600 text-sm">Oggi</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <User className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Account creato</p>
                          <p className="text-gray-600 text-sm">Data registrazione</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeModal === 'messages' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Nessun messaggio</p>
                      <div className="flex space-x-4 mt-4 justify-center">
                        <button 
                           onClick={() => {
                             closeModal();
                             navigate('/contact');
                           }}
                           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                         >
                           Nuovo Messaggio
                         </button>
                        <button 
                           onClick={() => {
                             closeModal();
                             navigate('/contact');
                           }}
                           className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                         >
                           Contatta il supporto
                         </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;