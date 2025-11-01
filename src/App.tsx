// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Homepage from './components/Homepage';
import Shop from './components/Shop';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import About from './components/About';
import Technology from './components/Technology';
import Events from './components/Events';
import Contact from './components/Contact';
import Account from './components/Account';
import Checkout from './components/Checkout';
import SuccessPopup from './components/SuccessPopup';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
  specifications: {
    [key: string]: string;
  };
  gallery: string[];
  stock?: number; // per numero magazzino 
}


export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Errore nel caricamento dei prodotti:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }];
      }
    });

    setSuccessMessage(`${product.name} aggiunto al carrello!`);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{
      clientId: "test",
      currency: "EUR"
    }}>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Navbar 
            cartCount={getTotalItems()}   // ← qui deve chiamarsi cartCount
            onCartClick={() => setIsCartOpen(true)}
            isAuthModalOpen={isAuthModalOpen}
            setIsAuthModalOpen={setIsAuthModalOpen}
          />

          
          <Routes>
            <Route path="/" element={
              <Homepage 
                products={products}
                onAddToCart={addToCart}
                onProductClick={setSelectedProduct}
              />
            } />
            <Route path="/shop" element={
              <Shop 
                products={products}
                onAddToCart={addToCart}
                onProductClick={setSelectedProduct}
              />
            } />
            <Route path="/about" element={<About />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={
              <Checkout 
                cartItems={cartItems}
                totalPrice={getTotalPrice()}
                onClearCart={clearCart}
              />
            } />
          </Routes>

          <Cart 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            totalPrice={getTotalPrice()}
          />

          {selectedProduct && (
            <ProductDetail 
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={addToCart}
            />
          )}

         
        </div>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
