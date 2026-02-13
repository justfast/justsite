import React, { useState, useEffect } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { Product } from '../App';
import { loadProductsData } from '../loadProducts';
import { getStockById } from '../getStockFromFirebase';

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
  const fetchProducts = async () => {
    try {
      // 1. Carica immediatamente i dati base degli articoli
      const baseData = await loadProductsData();
      setProductsData(baseData); // Mostra subito le card!
      setLoading(false);         // Togliamo il loading generale qui

      // 2. Carica lo stock in "background" senza bloccare l'utente
      baseData.forEach(async (product, index) => {
        try {
          const stock = await getStockById(product.id.toString());
          
          // Aggiorna solo il prodotto specifico nello stato
          setProductsData(current => 
            current.map(p => p.id === product.id ? { ...p, stock } : p)
          );
        } catch (err) {
          console.error(`Errore stock prodotto ${product.id}:`, err);
        }
      });
    } catch (error) {
      console.error("❌ Errore caricando prodotti:", error);
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  if (loading) return <p className="text-center mt-10 text-white">Caricamento prodotti...</p>;

  return (
    <section className="py-20 bg-zinc-950 min-h-screen flex flex-col items-center">
      <h2 className="text-center text-4xl font-bold mb-10 text-white">
        JustFast <span className="text-red-500">Shop</span>
      </h2>

      {/* Griglia prodotti */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-start px-6 max-w-7xl mx-auto">
        {productsData.map(product => (
          <div
            key={product.id}
            className="bg-white text-black rounded-3xl shadow-lg cursor-pointer w-full h-[480px] flex flex-col justify-between overflow-hidden border-4 border-red-500 hover:shadow-2xl transition-shadow duration-300"
            onMouseEnter={() => setHovered(product.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelectedProduct(product)}
          >
            <div className="flex items-center justify-center h-56 bg-white relative">
              <img
                src={hovered === product.id && product.gallery.length > 0 ? product.gallery[0] : product.image}
                alt={product.name}
                className="h-full object-contain p-4 transition-transform duration-300 ease-in-out hover:scale-105 select-none"
                draggable="false"
              />
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">Racing</div>
            </div>

            <div className="flex flex-col flex-grow justify-between text-center px-5 pb-5 overflow-hidden">
              <div className="flex flex-col gap-2 min-h-[130px]">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {product.features.slice(0,4).map((f, i) => (
                    <span key={i} className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full border border-red-300">{f}</span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-col items-center">
                <span className={`text-sm font-medium px-2 py-1 rounded-full mb-3 ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.stock > 0 ? `${product.stock} disponibili` : 'Esaurito'}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Aggiungi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* POP-UP DETTAGLIO (MODIFICATO DA FULLSCREEN A FINESTRA) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay scuro cliccabile per chiudere */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedProduct(null)}
          ></div>

          {/* Finestra Pop-up */}
          <div className="relative bg-white text-black w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-y-auto z-[110] p-6 md:p-12 animate-in fade-in zoom-in duration-300">
            
            {/* Bottone chiudi */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-red-500 hover:text-white rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Galleria immagini */}
              <div className="flex-1 space-y-4">
                <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 custom-scrollbar">
                  {[selectedProduct.image, ...(selectedProduct.gallery || [])]
                    .filter(Boolean)
                    .map((img, i) => (
                      <div key={i} className="flex-none w-full snap-start bg-gray-50 rounded-2xl border border-gray-100">
                        <img
                          src={img}
                          alt={`${selectedProduct.name} ${i + 1}`}
                          className="w-full h-[350px] object-contain p-4"
                        />
                      </div>
                    ))}
                </div>
                <p className="text-center text-xs text-gray-400">Scorri lateralmente per le foto →</p>
              </div>

              {/* Contenuto prodotto */}
              <div className="flex-1 flex flex-col">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter italic italic">
                      {selectedProduct.name}
                    </h1>
                    <div className="h-1.5 w-20 bg-red-600 rounded-full"></div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">{selectedProduct.description}</p>

                  {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h4 className="text-sm font-black text-red-600 uppercase mb-4 tracking-widest">Specifiche Tecniche</h4>
                      <ul className="grid grid-cols-1 gap-3">
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <li key={key} className="flex justify-between border-b border-gray-200 pb-1 text-sm">
                            <span className="font-bold text-gray-500">{key}</span>
                            <span className="text-right font-medium">{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div>
                      <span className="text-gray-400 text-sm font-bold uppercase">Prezzo</span>
                      <div className="text-4xl font-black text-red-600">€{selectedProduct.price.toFixed(2)}</div>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(selectedProduct)}
                      disabled={selectedProduct.stock <= 0}
                      className="bg-red-600 hover:bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 disabled:bg-gray-300 flex items-center gap-3 shadow-xl shadow-red-200"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {selectedProduct.stock > 0 ? 'Acquista' : 'Esaurito'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddedPopup && (
        <div className="fixed bottom-10 right-10 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-[200] animate-bounce">
          Prodotto aggiunto!
        </div>
      )}
    </section>
  );
};

export default Shop;