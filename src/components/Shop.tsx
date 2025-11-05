import React, { useState, useEffect } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { Product } from '../App';
import { loadProductsData } from '../loadProducts';
import { getStockById } from '../getStockFromFirebase';
import {testFirestore} from '../testFirestore';
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
  const fetchProducts = async () => {
    try {
      console.log("⏳ Inizio fetch prodotti...");
      //testFirestore(); // <-- Chiamata di test Firestore, per provare che tutto funzioni col db
      const data = await loadProductsData();
      // console.log("✅ Prodotti caricati:", data);

      setProductsData(data);

const productsWithStock = await Promise.all(
  data.map(async (product) => {
    //console.log("📦 Prendo stock per id:", product.id);
    const stock = await getStockById(product.id.toString()); // product.id deve essere stringa/numero coerente
    console.log("✅ Stock trovato per prodotto", product.id, "=", stock);
    return { ...product, stock };
  })
);

      setProductsData(productsWithStock);
    } catch (error) {
      console.error("❌ Errore caricando prodotti:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
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
            className="bg-white text-black rounded-3xl shadow-lg cursor-pointer w-full h-[480px] flex flex-col justify-between overflow-hidden border-4 border-red-500 hover:shadow-2xl transition-shadow duration-300"
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

              <div className="mt-4 flex flex-col items-center">
                <span 
                  className={`text-sm font-medium px-2 py-1 rounded-full mb-3 ${
                    product.stock > 5 ? 'bg-green-100 text-green-800' :
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} disponibili` : 'Esaurito'}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
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
  <div className="fixed inset-0 bg-white text-black overflow-y-auto z-50 p-10">
    {/* Bottone chiudi */}
    <button
      onClick={() => setSelectedProduct(null)}
      className="absolute top-5 right-5 text-gray-700 hover:text-black"
    >
      <X className="w-6 h-6" />
    </button>

    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
      {/* Galleria immagini orizzontale */}
      <div className="flex-1 overflow-x-auto flex gap-4 snap-x snap-mandatory">
        {[selectedProduct.image, ...(selectedProduct.gallery || [])]
          .filter(Boolean) // solo immagini effettive (non null/undefined)
          .map((img, i) => (
            <div key={i} className="flex-none w-full md:w-96 snap-start">
              <img
                src={img}
                alt={`${selectedProduct.name} ${i + 1}`}
                className="w-full h-96 object-contain rounded-lg border"
                onError={(e) => {
                  // nasconde l'immagine se il file non esiste
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
            </div>
          ))}
      </div>

      {/* Contenuto prodotto */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
          <p className="text-gray-700 mb-4">{selectedProduct.description}</p>

          {selectedProduct.features && (
            <div className="mb-4">
              <h4 className="text-xl font-semibold mb-2">Caratteristiche</h4>
              <ul className="space-y-1">
                {selectedProduct.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>
          )}

          <span className={`text-sm font-medium px-2 py-1 rounded-full mb-4 ${
            selectedProduct.stock > 5 ? 'bg-green-100 text-green-800' :
            selectedProduct.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {selectedProduct.stock > 0 ? `${selectedProduct.stock} disponibili` : 'Esaurito'}
          </span>
        </div>

        <div className="mt-6">
          <span className="text-2xl font-bold mb-4 block">€{selectedProduct.price.toFixed(2)}</span>
          <button
            onClick={() => handleAddToCart(selectedProduct)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" /> Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </section>

  
  );
};

export default Shop;
