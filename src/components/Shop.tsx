import React, { useState, useEffect } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { Product } from '../App';
import { loadProductsData } from '../loadProducts';

// 🧠 L’unico punto modificabile per chi gestisce il sito ↓
const productsDataTest: Product[] = [ /* i tuoi prodotti */ ];

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [showAddedPopup, setShowAddedPopup] = useState(false);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setShowAddedPopup(true);
    setTimeout(() => setShowAddedPopup(false), 2000);
  };

  useEffect(() => {
    loadProductsData()
      .then(data => setProductsData(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Caricamento prodotti...</p>;

  return (
    <section className="py-20 bg-zinc-950 min-h-screen flex flex-col items-center">
      <h2 className="text-center text-4xl font-bold mb-10">
        JustFast <span className="text-red-500">Shop</span>
      </h2>

      {/* Griglia prodotti */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-start px-6 max-w-7xl mx-auto">
        {productsData.map(product => (
          <div
            key={product.id}
            className="bg-white text-black rounded-3xl shadow-lg cursor-pointer w-full h-[580px] flex flex-col justify-between overflow-hidden border-4 border-red-500 hover:shadow-2xl transition-shadow duration-300"
            onMouseEnter={() => setHovered(product.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelectedProduct(product)}
          >
            {/* Immagine */}
            <div className="flex items-center justify-center h-56 bg-white relative">
              <img
                src={hovered === product.id && product.gallery.length > 0 ? product.gallery[0] : product.image}
                alt={product.name}
                className="h-full object-contain p-4 transition-transform duration-300 ease-in-out hover:scale-105 select-none"
                draggable="false"
              />
              {/* Decorazione racing */}
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                Racing
              </div>
            </div>

            {/* Contenuto */}
            <div className="flex flex-col flex-grow justify-between text-center px-5 pb-5 overflow-hidden">
              <div className="flex flex-col gap-2 min-h-[130px]">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
                
                {/* Features visibili nella card */}
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {product.features.slice(0,4).map((f, i) => (
                    <span
                      key={i}
                      className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full border border-red-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <span className="block text-xl font-semibold mb-3">€{product.price.toFixed(2)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Aggiungi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup aggiunta */}
      {showAddedPopup && (
        <div className="fixed bottom-10 right-10 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Prodotto aggiunto al carrello!
        </div>
      )}

      {/* Scheda dettaglio */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-black rounded-2xl max-w-3xl w-full relative p-6 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-700 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold mb-2">{selectedProduct.name}</h3>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            <div className="flex gap-3 overflow-x-auto mb-6">
              {[selectedProduct.image, ...(selectedProduct.gallery || [])].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${selectedProduct.name} ${i + 1}`}
                  className="h-48 object-contain rounded-lg border"
                />
              ))}
            </div>

            {selectedProduct.specifications && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Specifiche tecniche</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Caratteristiche principali</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {selectedProduct.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold text-gray-900">€{selectedProduct.price.toFixed(2)}</span>
              <button
                onClick={() => handleAddToCart(selectedProduct)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Aggiungi al carrello
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Shop;
