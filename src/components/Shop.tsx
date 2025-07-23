import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Smartphone, Radio, Camera, Battery } from 'lucide-react';
import TypingText from './TypingText';
import { products, Product } from '../data/products';

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});

  useEffect(() => {
    // Initialize current image index for each product
    const initialIndices: {[key: string]: number} = {};
    products.forEach(product => {
      initialIndices[product.id] = 0;
    });
    setCurrentImageIndex(initialIndices);

    // Set up interval for automatic slideshow
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndices => {
        const newIndices = {...prevIndices};
        products.forEach(product => {
          if (product.images && product.images.length > 0) {
            newIndices[product.id] = (prevIndices[product.id] + 1) % product.images.length;
          }
        });
        return newIndices;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [products]);



  const getIcon = (feature: string) => {
    if (feature.includes('app') || feature.includes('Smartphone')) return <Smartphone className="h-4 w-4" />;
    if (feature.includes('Controller') || feature.includes('2.4GHz')) return <Radio className="h-4 w-4" />;
    if (feature.includes('Camera') || feature.includes('Streaming')) return <Camera className="h-4 w-4" />;
    if (feature.includes('Batteria')) return <Battery className="h-4 w-4" />;
    return <div className="h-4 w-4 bg-red-600 rounded-full"></div>;
  };

  return (
    <section id="shop" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <TypingText 
              text="Scegli la tua " 
              speed={80}
              showCursor={false}
            />
            <span className="text-red-600">
              <TypingText 
                text="macchina RC" 
                speed={80}
                delay={1200}
              />
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            <TypingText 
              text="PORTA NEL BOX LA TUA PROSSIMA BELVA DA PISTA."
              speed={60}
              delay={2500}
              showCursor={false}
              className="text-gray-300"
            />
          </p>
          <p className="text-lg text-gray-400 mt-4">
            <TypingText 
              text="Due versioni. Due stili di guida. O prendi il telecomando, o guidi con il tuo smartphone."
              speed={50}
              delay={4000}
              showCursor={false}
              className="text-gray-400"
            />
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl block flex flex-col"
            >
              <div className="relative overflow-hidden" style={{ height: '300px' }}>
                <img
                  src={product.images[currentImageIndex[product.id] || 0]}
                  alt={`${product.name} - immagine ${currentImageIndex[product.id] + 1}`}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to default image if the current one fails to load
                    e.currentTarget.src = product.image;
                  }}
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${product.color === 'orange' ? 'bg-orange-500 text-white' : 'bg-purple-500 text-white'}`}>
                  {product.color === 'orange' ? '🟠' : '🟣'} {product.type}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-4 text-center font-medium">
                  {product.id === '1' ? 'Versione con telecomando' : 'Versione con app'}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm">📶 Controlli proporzionali</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm">🎥 Camera FPV magnetica</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm">💡 Luci anteriori e posteriori</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm">🔋 Batteria a lunga durata</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-900">
                    €{product.price}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onAddToCart(product);
                    }}
                    className="group bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center transform hover:scale-105"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;