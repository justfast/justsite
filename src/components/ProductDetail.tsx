
// COMPONENTE INUTILIZZATO

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, ShoppingBag, Plus, Minus, X, Shield, Truck, RotateCcw, Award } from 'lucide-react';
import { Product } from '../App';

// Inserisco gli stili necessari per le animazioni e il layout pop-up
const slideStyles = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
  .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = slideStyles;
  document.head.appendChild(styleSheet);
}

interface ProductDetailProps {
  onAddToCart: (product: Product, color: string) => void;
  onBuyNow: (product: Product, quantity: number, color: string) => void;
  products: Product[];
  isLoading: boolean;
  onClose: () => void; // Aggiunta prop per chiudere il pop-up
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart, onBuyNow, products, isLoading, onClose }) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  
  const product = products.find(p => p.id === productId);
  
  // Gestione chiusura con tasto ESC e blocco scroll body
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden'; // Blocca lo scroll del sito sotto
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset'; // Ripristina lo scroll alla chiusura
    };
  }, [onClose]);

  const getDetailImages = (id: string) => {
    if (id === '1') return ['/images/remote-car/1.webp', '/images/remote-car/2.webp', '/images/remote-car/3.webp', '/images/remote-car/4.webp'];
    if (id === '2') return ['/images/app-car/1.webp', '/images/app-car/2.webp', '/images/app-car/3.webp', '/images/app-car/4.webp'];
    return product?.images || [];
  };
  
  const detailImages = getDetailImages(productId || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('grigio');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (isLoading || !product) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay Sfondo */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fadeIn" 
        onClick={onClose}
      />

      {/* Contenitore Pop-up */}
      <div 
        ref={modalRef}
        className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scaleIn"
      >
        {/* Header del Pop-up con tasto chiusura */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 truncate">{product.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Area Contenuto con Scroll Interno */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-10">
            
            {/* Gallery Sinistra */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                <img
                  src={detailImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
                <button 
                  onClick={() => setCurrentImageIndex(prev => prev === 0 ? detailImages.length - 1 : prev - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setCurrentImageIndex(prev => (prev + 1) % detailImages.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {detailImages.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden ${currentImageIndex === i ? 'border-orange-500' : 'border-transparent'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Destra */}
            <div className="space-y-6">
              <div>
                <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.type}
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 mt-2">{product.name} </h1>
                <div className="flex items-center mt-2 text-yellow-400">
                  <Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" />
                  <span className="ml-2 text-gray-500 text-sm">(12 recensioni)</span>
                </div>
              </div>

              <div className="text-4xl font-black text-red-600">€{product.price}</div>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Caratteristiche Tecniche */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-blue-600" /> Specifiche Tecniche
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-xl"><span className="text-gray-500 block">Scala</span> 1:64</div>
                  <div className="bg-gray-50 p-3 rounded-xl"><span className="text-gray-500 block">Batteria</span> 3.7V 100mAh</div>
                  <div className="bg-gray-50 p-3 rounded-xl"><span className="text-gray-500 block">Motore</span> Coreless</div>
                  <div className="bg-gray-50 p-3 rounded-xl"><span className="text-gray-500 block">Camera</span> 720p HD</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer d'acquisto - Fissato in basso nel pop-up */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center border rounded-xl bg-white p-1">
                <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="p-2 hover:text-orange-600"><Minus className="h-4 w-4" /></button>
                <span className="px-4 font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(q => q+1)} className="p-2 hover:text-orange-600"><Plus className="h-4 w-4" /></button>
              </div>
              <select 
                value={selectedColor} 
                onChange={(e) => setSelectedColor(e.target.value)}
                className="bg-white border rounded-xl px-4 py-2 font-medium"
              >
                <option value="grigio">Grigio</option>
                <option value="giallo">Giallo</option>
                <option value="rosa">Rosa</option>
              </select>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={() => onAddToCart(product, selectedColor)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all"
              >
                <ShoppingCart className="h-5 w-5" /> Carrello
              </button>
              <button 
                onClick={() => onBuyNow(product, quantity, selectedColor)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all"
              >
                <ShoppingBag className="h-5 w-5" /> Ordina Ora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;