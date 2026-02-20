import React from 'react';
import Shop from './Shop';

import Contact from './Contact';
import { Product } from '../App';

interface HomepageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const Homepage: React.FC<HomepageProps> = ({ products, onAddToCart, onProductClick }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="home">
      
      </section>
      
      {/* Shop Section */}
      <section id="shop" className="py-0">
        <Shop 
          products={products}
          onAddToCart={onAddToCart}
          onProductClick={onProductClick}
        />
      </section>

      <Contact></Contact>
      
    

      {/* 🌟 FOOTER NUOVO: Sviluppato da... */}
    <footer className="w-full py-6 bg-black text-gray-500 text-center text-sm border-t border-red-900 mt-10">
      
    </footer>
    {/* 🌟 FINE FOOTER */}
    </div>
  );
};

export default Homepage;