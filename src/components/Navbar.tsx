import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
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

const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onCartClick,
  isCartPulsing = false,
  showCartPopup = false,
  isAuthModalOpen,
  setIsAuthModalOpen,
  onLoginSuccess
}) => {
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  const handleNavClick = (href: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

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
          @keyframes cartPulse {0% { transform: scale(1); }50% { transform: scale(1.2); }100% { transform: scale(1); }}
          .cart-pulse { animation: cartPulse 0.6s ease-in-out; }
          @keyframes loginGlow {0% { box-shadow:0 0 5px rgba(239,68,68,0.5); transform: scale(1); }50% { box-shadow:0 0 20px rgba(239,68,68,0.8),0 0 30px rgba(239,68,68,0.4); transform: scale(1.05);}100% { box-shadow:0 0 5px rgba(239,68,68,0.5); transform: scale(1); }}
          .login-pulse { animation: loginGlow 2s ease-in-out; }
        `}
      </style>

      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect shadow-professional transition-professional">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            
            {/* Logo spostato a sinistra */}
            <div className="flex justify-start flex-1 pl-4 sm:pl-6 lg:pl-8">
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

            {/* Desktop Nav */}
            <div className="hidden md:flex flex-1 justify-end">
              <div className="flex items-center space-x-6 lg:space-x-12">
                {navItems.map(item => (
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

            {/* Auth & Cart */}
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {!loading 

              /*       HIDDEN: LOGIN GOOGLE- non implementato 
              && (
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
              /* 
              }
                
              )}

              {/* Carrello con badge */}
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
              </div>

              {/* Mobile menu button */}
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

          {/* Mobile nav */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-effect shadow-professional-hover rounded-b-2xl">
                {navItems.map(item => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-300 hover:text-red-500 block px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors duration-300 w-full text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={onLoginSuccess}
        />
      </nav>
    </>
  );
};

export default Navbar;
