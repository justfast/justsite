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
      
      {/* About Section */}
      <section id="about" className="py-0">
        <About />
      </section>
      
      {/* Technology Section */}
      <section id="technology" className="py-0">
        <Technology />
      </section>
      
      {/* Events Section */}
      <section id="events" className="py-0">
        <Events />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-0">
        <Contact />
      </section>

      {/* 🌟 FOOTER NUOVO: Sviluppato da... */}
    <footer className="w-full py-6 bg-black text-gray-500 text-center text-sm border-t border-red-900 mt-10">
      <p>
        &copy; {2025} | Developed by Edoardo Sorgentone
      </p>
      {
      <p className="mt-1">
        <a 
          href="https://www.linkedin.com/in/edoardo-sorgentone-73a544252" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-red-500 hover:text-red-400 transition-colors"
        >
          View Portfolio
        </a>
      </p>
    }
    </footer>
    {/* 🌟 FINE FOOTER */}
    </div>
  );
};

export default Homepage;