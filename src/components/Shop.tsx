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
        // 1. Caricamento ISTANTANEO dei dati testuali
        const baseData = await loadProductsData();
        if (!isMounted) return;
        
        setProductsData(baseData);
        setLoading(false); // Qui la pagina disegna subito tutte le card nere/bianche

        // 2. Caricamento stock asincrono (non blocca nulla)
        baseData.forEach(async (product) => {
          try {
            const stock = await getStockById(product.id.toString());
            if (isMounted) {
              setProductsData(current => 
                current.map(p => p.id === product.id ? { ...p, stock } : p)
              );
            }
          } catch (e) {
            console.error(e);
          }
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  if (loading) return <p className="text-center mt-10 text-white font-black italic uppercase italic">LOADING PRODUCTS...</p>;

  return (
    <section className="py-20 bg-zinc-950 min-h-screen flex flex-col items-center">
      <h2 className="text-center text-4xl font-black mb-10 text-white italic tracking-tighter uppercase">
        JustFast <span className="text-red-500">Shop</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-start px-6 max-w-7xl mx-auto">
        {productsData.map((product, index) => (
          <div
            key={product.id}
            className="bg-white text-black rounded-3xl shadow-lg cursor-pointer w-full h-[480px] flex flex-col justify-between overflow-hidden border-4 border-red-500 transition-all duration-300"
            onClick={() => setSelectedProduct(product)}
            onMouseEnter={() => setHovered(product.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* AREA IMMAGINE OTTIMIZZATA */}
            <div className="flex items-center justify-center h-56 bg-white relative">
              {/* Questo div fa sì che la card sia disegnata anche se l'immagine non c'è ancora */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 animate-pulse">
                {/* Placeholder invisibile o logo minimo */}
              </div>
              
              <img
                src={hovered === product.id && product.gallery?.length > 0 ? product.gallery[0] : product.image}
                alt={product.name}
                // PRIORITÀ: Carica subito le prime 3, le altre dopo
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async" 
                className="relative z-10 h-full object-contain p-4 transition-opacity duration-500 select-none"
                onLoad={(e) => {
                  // Effetto fade-in quando l'immagine è finalmente scaricata
                  e.currentTarget.style.opacity = "1";
                }}
                style={{ opacity: 0 }} // Parte invisibile e appare appena scaricata
              />
              
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full font-black uppercase italic z-20">
                Racing
              </div>
            </div>

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
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock !== undefined ? (product.stock > 0 ? `${product.stock} DISPONIBILI` : 'ESAURITO') : '...'}
                </span>

                <button
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                  disabled={product.stock === 0}
                  className="bg-red-600 hover:bg-black text-white px-8 py-2.5 rounded-xl flex items-center gap-2 font-black uppercase italic transition-all shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Aggiungi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* POP-UP DETTAGLIO - UGUALE A PRIMA */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-white text-black w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-y-auto z-[110] p-6 md:p-12 animate-in zoom-in duration-300">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-red-600 hover:text-white rounded-full transition-all z-20">
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 overflow-hidden">
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 custom-scrollbar">
                  {[selectedProduct.image, ...(selectedProduct.gallery || [])].filter(Boolean).map((img, i) => (
                    <div key={i} className="flex-none w-full snap-start bg-gray-50 rounded-3xl border border-gray-100 p-4">
                      <img src={img} alt="" className="w-full h-80 object-contain" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{selectedProduct.name}</h1>
                <div className="h-1.5 w-20 bg-red-600 rounded-full mb-6"></div>
                <p className="text-gray-700 text-lg mb-8 font-medium">{selectedProduct.description}</p>
                {selectedProduct.specifications && (
                  <div className="mb-8 bg-zinc-50 rounded-2xl p-6 border border-zinc-100 text-sm">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-zinc-200 pb-1 mb-2">
                        <span className="font-bold text-zinc-500 uppercase text-[11px]">{key}</span>
                        <span className="font-black">{value as string}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-4xl font-black text-red-600">€{selectedProduct.price.toFixed(2)}</div>
                  <button onClick={() => handleAddToCart(selectedProduct)} className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black uppercase italic transition-all shadow-xl">Acquista</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Shop;