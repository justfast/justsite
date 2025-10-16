import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, ShoppingBag, User, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  isCartPulsing?: boolean;
  showCartPopup?: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  onLoginSuccess?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, isCartPulsing = false, showCartPopup = false, isAuthModalOpen, setIsAuthModalOpen, onLoginSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginButtonPulsing, setIsLoginButtonPulsing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const navItems = [
    { label: 'Shop', href: '#shop' },
    { label: 'Eventi', href: '#events' },
    { label: 'Tecnologia', href: '#technology' },
    { label: 'Contatti', href: '#contact' }
  ];

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      // Se siamo già nella homepage, scroll verso l'alto
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Se siamo in un'altra pagina, naviga alla homepage
      navigate('/');
      // Scroll verso l'alto dopo la navigazione
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleNavClick = (href: string) => {
    if (location.pathname !== '/') {
      // Se non siamo nella homepage, naviga prima alla homepage
      navigate('/');
      // Poi scroll alla sezione dopo un breve delay
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Se siamo già nella homepage, scroll direttamente alla sezione
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  // Pulse effect for login button every 10 seconds
  useEffect(() => {
    if (!user) {
      const interval = setInterval(() => {
        setIsLoginButtonPulsing(true);
        setTimeout(() => setIsLoginButtonPulsing(false), 2000);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <>
      <style>
        {`
          @keyframes cartPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          .cart-pulse {
            animation: cartPulse 0.6s ease-in-out;
          }
          @keyframes popupFadeIn {
            0% { opacity: 0; transform: translateY(-10px) scale(0.8); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes popupFadeOut {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-10px) scale(0.8); }
          }
          @keyframes popupPulse {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-3px) scale(1.08); }
          }
          .popup-enter {
            animation: popupFadeIn 0.3s ease-out, popupPulse 2s ease-in-out infinite 0.3s;
          }
          .popup-exit {
            animation: popupFadeOut 0.3s ease-in;
          }
          .popup-pulse {
            animation: popupPulse 1.5s ease-in-out infinite;
          }
          @keyframes loginGlow {
            0% { 
              box-shadow: 0 0 5px rgba(239, 68, 68, 0.5);
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 0 20px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.4);
              transform: scale(1.05);
            }
            100% { 
              box-shadow: 0 0 5px rgba(239, 68, 68, 0.5);
              transform: scale(1);
            }
          }
          .login-pulse {
            animation: loginGlow 2s ease-in-out;
          }
        `}
      </style>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect shadow-professional transition-professional">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Left spacer for mobile */}
          <div className="flex-1 md:hidden"></div>

          {/* Logo - centered */}
          <div className="flex justify-center flex-1">
            <button
                onClick={handleLogoClick}
                className="transition-professional hover:scale-105 hover:drop-shadow-lg"
              >
              <img 
                src="/logo.jpeg" 
                alt="JustFast Logo" 
                className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              />
            </button>
          </div>

          {/* Desktop Navigation - right side */}
          <div className="hidden md:flex flex-1 justify-end">
            <div className="flex items-center space-x-6 lg:space-x-12">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-red-500 text-xs lg:text-sm font-medium transition-colors duration-300 px-2 py-1"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auth, Cart and Mobile menu button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Auth Section */}
            {!loading && (
              <div className="relative">
                {user ? (
                  <Link
                    to="/account"
                    className="flex items-center space-x-1 sm:space-x-2 bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-300"
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Account</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className={`bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 ${
                      isLoginButtonPulsing ? 'login-pulse' : ''
                    }`}
                  >
                    Accedi
                  </button>
                )}
              </div>
            )}
            
            <div className="relative">
              <button
                onClick={onCartClick}
                className={`relative p-2 sm:p-3 text-gray-300 hover:text-red-500 transition-colors duration-300 ${
                  isCartPulsing ? 'cart-pulse' : ''
                }`}
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Clean Speech Bubble Popup */}
               {showCartPopup && (
                 <div className="absolute top-full right-0 mt-1 z-50">
                   <div className="relative bg-white rounded-lg px-3 py-2 shadow-xl popup-enter popup-pulse" style={{
                     border: '1px solid #d1d5db'
                   }}>
                     {/* Precise speech bubble tail pointing to cart */}
                     <div className="absolute -top-1 right-3 w-0 h-0" style={{
                       borderLeft: '6px solid transparent',
                       borderRight: '6px solid transparent', 
                       borderBottom: '6px solid #d1d5db'
                     }}></div>
                     <div className="absolute -top-0.5 right-3.5 w-0 h-0" style={{
                       borderLeft: '5px solid transparent',
                       borderRight: '5px solid transparent',
                       borderBottom: '5px solid white'
                     }}></div>
                     
                     {/* Minimal text */}
                     <div className="text-gray-800 font-semibold text-sm whitespace-nowrap">
                       <span className="text-red-600">dai un'occhiata!</span>
                     </div>
                   </div>
                 </div>
               )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-red-500 transition-colors duration-300 p-1 sm:p-2"
              >
                {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-effect shadow-professional-hover rounded-b-2xl">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-red-500 block px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors duration-300 w-full text-left"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Auth Section */}
              {!loading && (
                <div className="border-t border-gray-600 pt-3 mt-3">
                  {user ? (
                    <Link
                      to="/account"
                      className="flex items-center w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                         setIsAuthModalOpen(true);
                         setIsOpen(false);
                       }}
                      className={`w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 ${
                        isLoginButtonPulsing ? 'login-pulse' : ''
                      }`}
                    >
                      Accedi
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={onLoginSuccess}
      /></nav>
    </>
  );
};

export default Navbar;