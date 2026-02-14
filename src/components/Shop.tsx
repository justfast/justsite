import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        // 1. Carica subito i dati locali
        const baseData = await loadProductsData();
        if (!isMounted) return;
        
        setProductsData(baseData);
        setLoading(false); // Mostra subito le card

        // 2. Carica gli stock in background senza bloccare il render
        baseData.forEach(async (product) => {
          try {
            const stock = await getStockById(product.id.toString());
            if (isMounted) {
              setProductsData(current => 
                current.map(p => p.id === product.id ? { ...p, stock } : p)
              );
            }
          } catch (e) {
            console.error(`Errore stock ${product.id}:`, e);
          }
        });
      } catch (error) {
        console.error("❌ Errore caricando prodotti:", error);
        setLoading(false);
      }
    };
    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  if (loading) return <p className="text-center mt-10 text-white font-bold italic uppercase tracking-widest">Caricamento JustFast Shop...</p>;

  return (
    <section className="py-20 bg-zinc-950 min-h-screen flex flex-col items-center">
      <h2 className="text-center text-4xl font-black mb-10 text-white italic tracking-tighter uppercase">
        JustFast <span className="text-red-500">Shop</span>
      </h2>

      {/* Griglia prodotti */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-start px-6 max-w-7xl mx-auto">
        {productsData.map((product, index) => (
          <div
            key={product.id}
            className="bg-white text-black rounded-3xl shadow-lg cursor-pointer w-full h-[480px] flex flex-col justify-between overflow-hidden border-4 border-red-500 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]"
            onMouseEnter={() => setHovered(product.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelectedProduct(product)}
          >
            {/* Immagine con Lazy Loading e Priority */}
            <div className="flex items-center justify-center h-56 bg-white relative">
              <img
                src={hovered === product.id && product.gallery?.length > 0 ? product.gallery[0] : product.image}
                alt={product.name}
                loading={index < 3 ? "eager" : "lazy"}
                fetchpriority={index < 3 ? "high" : "low"}
                decoding="async"
                className="h-full object-contain p-4 transition-transform duration-300 ease-in-out select-none"
                draggable="false"
              />
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full font-black uppercase italic">
                Racing
              </div>
            </div>

            {/* Contenuto Card */}
            <div className="flex flex-col flex-grow justify-between text-center px-5 pb-5 overflow-hidden">
              <div className="flex flex-col gap-2 min-h-[130px]">
                <h3 className="text-lg font-black uppercase italic tracking-tight">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 leading-tight">{product.description}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {product.features?.slice(0,4).map((f, i) => (
                    <span key={i} className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full border border-red-200 uppercase tracking-tighter">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-col items-center">
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${
                  product.stock > 0 ? 'bg-green-100 text-green-800 animate-pulse' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock !== undefined ? (product.stock > 0 ? `${product.stock} DISPONIBILI` : 'ESAURITO') : 'VERIFICA...'}
                </span>

                <button
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                  disabled={product.stock === 0}
                  className="bg-red-600 hover:bg-black text-white px-8 py-2.5 rounded-xl flex items-center gap-2 font-black uppercase italic transition-all shadow-lg shadow-red-200"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Aggiungi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* POP-UP DETTAGLIO - DESIGN ORIGINALE RIPRISTINATO */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          
          <div className="relative bg-white text-black w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-y-auto z-[110] p-6 md:p-12 animate-in zoom-in duration-300">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-red-600 hover:text-white rounded-full transition-all z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Galleria immagini orizzontale snap */}
              <div className="flex-1 overflow-hidden">
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 custom-scrollbar">
                  {[selectedProduct.image, ...(selectedProduct.gallery || [])]
                    .filter(Boolean)
                    .map((img, i) => (
                      <div key={i} className="flex-none w-full snap-start bg-gray-50 rounded-3xl border border-gray-100 p-4">
                        <img
                          src={img}
                          alt={`${selectedProduct.name} ${i + 1}`}
                          className="w-full h-80 object-contain"
                        />
                      </div>
                    ))}
                </div>
                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Scorri per altre foto →</p>
              </div>

              {/* Contenuto prodotto */}
              <div className="flex-1 flex flex-col">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4 leading-none">{selectedProduct.name}</h1>
                <div className="h-1.5 w-20 bg-red-600 rounded-full mb-6"></div>
                <p className="text-gray-700 text-lg mb-8 leading-snug font-medium">{selectedProduct.description}</p>

                {/* Specifiche Tecniche */}
                {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
                  <div className="mb-8 bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                    <h4 className="text-xs font-black text-red-600 uppercase mb-4 tracking-widest italic">Specifiche Tecniche</h4>
                    <ul className="space-y-2">
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <li key={key} className="flex justify-between border-b border-zinc-200 pb-1 text-sm">
                          <span className="font-bold text-zinc-500 uppercase text-[11px]">{key}</span>
                          <span className="text-right font-black text-zinc-900">{value as string}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-4xl font-black text-red-600">€{selectedProduct.price.toFixed(2)}</div>
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    disabled={selectedProduct.stock === 0}
                    className="bg-red-600 hover:bg-black text-white px-10 py-4 rounded-2xl font-black uppercase italic tracking-widest transition-all hover:scale-105 shadow-xl shadow-red-200 disabled:bg-gray-200"
                  >
                    Acquista
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddedPopup && (
        <div className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-[200] font-black uppercase italic animate-bounce">
          Aggiunto al carrello!
        </div>
      )}
    </section>
  );
};

export default Shop;