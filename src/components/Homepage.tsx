import React from 'react';
import Hero from './Hero';
import Shop from './Shop';
import About from './About';
import Technology from './Technology';
import Events from './Events';
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
        <Hero />
      </section>
      
      {/* Shop Section */}
      <section id="shop" className="py-0">
        <Shop 
          products={products}
          onAddToCart={onAddToCart}
          onProductClick={onProductClick}
        />
      </section>
      
    

      {/* 🌟 FOOTER NUOVO: Sviluppato da... */}
    <footer className="w-full py-6 bg-black text-gray-500 text-center text-sm border-t border-red-900 mt-10">
      
    </footer>
    {/* 🌟 FINE FOOTER */}
    </div>
  );
};

export default Homepage;