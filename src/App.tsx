import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Shop from './components/Shop';
import Technology from './components/Technology';
import Events from './components/Events';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import { Product } from './data/products';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleBuyNow = (product: Product, quantity: number) => {
    // Add the product to cart with the specified quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Open the cart
    setIsCartOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar 
          cartCount={totalItems} 
          onCartClick={() => setIsCartOpen(true)} 
        />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Shop onAddToCart={addToCart} />
              <Technology />
              <Events />
              <About />
              <Contact />
            </>
          } />
          <Route 
            path="/product/:productId" 
            element={
              <ProductDetail 
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
              />
            } 
          />
          {/* Catch-all route to redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />

        {/* Footer */}
        <footer className="bg-black border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white">
              <span className="text-red-600">Just</span>Fast
            </h3>
          </div>
          <p className="text-gray-400 mb-4">
            L'esperienza di guida RC FPV più coinvolgente mai vista
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>📞 3914750406</span>
            <span>📧 gianni.mancarella@gmail.com</span>
            <span>🗺️ Italia</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 text-sm text-gray-500">
            © 2024 JustFast. Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
    </Router>
  );
}

export default App;