import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left spacer for mobile */}
          <div className="flex-1 md:hidden"></div>

          {/* Logo - centered */}
          <div className="flex justify-center flex-1">
            <button
              onClick={handleLogoClick}
              className="transition-transform duration-200 hover:scale-105"
            >
              <img 
                src="/logo.jpeg" 
                alt="JustFast Logo" 
                className="h-12 w-auto object-contain"
              />
            </button>
          </div>

          {/* Desktop Navigation - right side */}
          <div className="hidden md:flex flex-1 justify-end">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cart and Mobile menu button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-300 hover:text-red-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-red-600 transition-colors duration-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 backdrop-blur-md">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-red-600 block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;