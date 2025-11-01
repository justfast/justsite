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
    </div>
  );
};

export default Homepage;