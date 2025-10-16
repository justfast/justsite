import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, ShoppingBag, Plus, Minus, X, Shield, Truck, RotateCcw, Award } from 'lucide-react';
import { Product } from '../App';

// Enhanced CSS for slide animations and modern styling
const slideStyles = `
  @keyframes slideOutLeft {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-100%); opacity: 0; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  @keyframes slideInFromRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideInFromLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
  }
  .slide-out-left { animation: slideOutLeft 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .slide-out-right { animation: slideOutRight 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .slide-in-right { animation: slideInFromRight 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .slide-in-left { animation: slideInFromLeft 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .fade-in { animation: fadeIn 600ms ease-out forwards; }
  .shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
  }
  .glass-morphism {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .gradient-border {
    background: linear-gradient(white, white) padding-box,
                linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1) border-box;
    border: 2px solid transparent;
  }
`;

// Inject styles
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
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart, onBuyNow, products, isLoading }) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === productId);
  const otherProducts = products.filter(p => p.id !== productId);
  
  // Define detailed product images for the product detail pages
  const getDetailImages = (productId: string) => {
    if (productId === '1') {
      return [
        '/images/remote-car/1.webp',
      '/images/remote-car/2.webp',
      '/images/remote-car/3.webp',
      '/images/remote-car/4.webp',
      '/images/remote-car/5.jpg',
      '/images/remote-car/6.webp',
      '/images/remote-car/7.PNG',
      '/images/remote-car/8.webp',
      '/images/remote-car/9.PNG',
      '/images/remote-car/11.PNG',
      '/images/remote-car/13.webp',
      '/images/remote-car/14.webp'
      ];
    } else if (productId === '2') {
      return [
        '/images/app-car/1.webp',
      '/images/app-car/2.webp',
      '/images/app-car/3.webp',
      '/images/app-car/4.webp',
      '/images/app-car/5.jpg',
      '/images/app-car/6.webp',
      '/images/app-car/7.PNG',
      '/images/app-car/8.webp',
      '/images/app-car/9.PNG',
      '/images/app-car/11.PNG',
      '/images/app-car/12.PNG',
      '/images/app-car/13.PNG'
      ];
    }
    return product?.images || [];
  };
  
  const detailImages = getDetailImages(productId || '');
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('grigio');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [userReviews, setUserReviews] = useState<any[]>([]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          setIsLightboxOpen(false);
          break;
        case 'ArrowLeft':
          setLightboxImageIndex(prev => prev === 0 ? detailImages.length - 1 : prev - 1);
          break;
        case 'ArrowRight':
          setLightboxImageIndex(prev => (prev + 1) % detailImages.length);
          break;
      }
    };

    if (isLightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen, detailImages.length]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [nextImageIndex, setNextImageIndex] = useState(0);
  
  // Scroll to top when component mounts or productId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  // Automatic image slideshow with slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (detailImages && detailImages.length > 1) {
        const nextIndex = (currentImageIndex + 1) % detailImages.length;
        setNextImageIndex(nextIndex);
        // Set slide direction to right for forward movement
        setSlideDirection('right');
        setIsTransitioning(true);
        
        // After slide out, change image and slide in
        setTimeout(() => {
          setCurrentImageIndex(nextIndex);
          setIsTransitioning(false);
        }, 300); // Slide out duration
      }
    }, 4000); // Change image every 4 seconds
    
    return () => clearInterval(interval);
  }, [detailImages, currentImageIndex]);
  
  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Caricamento prodotto...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Prodotto non trovato</h2>
        <Link to="/" className="text-red-600 hover:text-red-500 underline">
          Torna alla home
        </Link>
      </div>
    );
  }
  
  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % detailImages.length;
    setNextImageIndex(nextIndex);
    setSlideDirection('right');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(nextIndex);
      setIsTransitioning(false);
    }, 300);
  };
  
  const prevImage = () => {
    const nextIndex = currentImageIndex === 0 ? detailImages.length - 1 : currentImageIndex - 1;
    setNextImageIndex(nextIndex);
    setSlideDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(nextIndex);
      setIsTransitioning(false);
    }, 300);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    onAddToCart(product, selectedColor);
  };
  
  const handleBuyNow = () => {
    onBuyNow(product, quantity, selectedColor);
  };
  
  // Mock reviews data
  const reviews = [
    { id: 1, author: 'Marco V.', rating: 5, comment: 'Macchina fantastica! Veloce e reattiva, la uso con i miei figli ogni weekend.' },
    { id: 2, author: 'Giulia R.', rating: 4, comment: 'Ottimo prodotto, batteria dura a lungo. Unico neo: il telecomando potrebbe essere più ergonomico.' },
    { id: 3, author: 'Alessandro B.', rating: 5, comment: 'La migliore RC che abbia mai avuto. Perfetta per giocare in casa e all\'aperto.' }
  ];
  
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-32 sm:pb-24">
      <div className="max-w-none xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-8 lg:py-12">
        {/* Enhanced Breadcrumb */}
        <div className="mb-4 sm:mb-8 fade-in">
          <Link 
            to="/#shop" 
            className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 bg-white rounded-full shadow-sm hover:shadow-md hover:text-gray-900 transition-all duration-300 border border-gray-200 hover:border-gray-300"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            <span>Torna allo shop</span>
          </Link>
        </div>
        
        <div className="grid lg:grid-cols-[1fr_1.5fr] xl:grid-cols-[1.2fr_1.8fr] gap-6 sm:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 fade-in">
          {/* Colonna 1: Enhanced Product Gallery */}
          <div className="glass-morphism rounded-2xl overflow-hidden shadow-xl h-fit border border-white/20">
            <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-gray-50 to-white">
              <div className="relative w-full h-full overflow-hidden cursor-pointer group" onClick={() => {
                setLightboxImageIndex(currentImageIndex);
                setIsLightboxOpen(true);
              }}>
                <img
                  src={detailImages[currentImageIndex]}
                  alt={`${product.name} - immagine ${currentImageIndex + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain bg-white group-hover:scale-110 transition-all duration-500 ${
                    isTransitioning 
                      ? slideDirection === 'right' 
                        ? 'slide-out-left' 
                        : 'slide-out-right'
                      : ''
                  }`}
                />
                {/* Incoming image for slide effect */}
                {isTransitioning && (
                  <img
                    src={detailImages[nextImageIndex]}
                    alt={`${product.name} - immagine incoming`}
                    className={`absolute inset-0 w-full h-full object-contain bg-white transition-all duration-500 ${
                      slideDirection === 'right' 
                        ? 'slide-in-right' 
                        : 'slide-in-left'
                    }`}
                  />
                )}
                
                {/* Overlay gradient for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Enhanced Navigation arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 hover:text-gray-900 p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50 hover:scale-110"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 hover:text-gray-900 p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50 hover:scale-110"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              
              {/* Enhanced Image counter */}
              <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/80 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                {currentImageIndex + 1} / {detailImages.length}
              </div>
              
              {/* Enhanced Click to expand hint */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                🔍 <span className="hidden sm:inline">Clicca per ingrandire</span>
              </div>
            </div>
            
            {/* Enhanced Thumbnails */}
            <div className="p-2 sm:p-4 flex space-x-2 sm:space-x-3 overflow-x-auto bg-gradient-to-r from-gray-50 to-white border-t border-gray-200/50">
              {detailImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                      if (index !== currentImageIndex) {
                        setNextImageIndex(index);
                        setSlideDirection(index > currentImageIndex ? 'right' : 'left');
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setCurrentImageIndex(index);
                          setIsTransitioning(false);
                        }, 400);
                      }
                    }}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 hover:scale-105 ${currentImageIndex === index ? 'border-gradient-to-r from-orange-400 to-pink-500 shadow-lg ring-2 ring-orange-200' : 'border-gray-200 hover:border-gray-400 hover:shadow-md'}`}
                >
                  <img 
                      src={image} 
                      alt={`${product.name} miniatura ${index + 1}`}
                      className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-110"
                    />
                </button>
              ))}
            </div>
          </div>
          
          {/* Colonna 2: Enhanced Product Info */}
          <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-2 shadow-sm ${product.color === 'orange' ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200' : 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200'}`}>
              <span className="mr-2">{product.color === 'orange' ? '🟠' : '🟣'}</span>
              <span>{product.type}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">{product.name}</h1>
            
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="flex mr-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors ${star <= 4.5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm font-medium">4.5</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-blue-600 text-sm hover:text-blue-700 hover:underline cursor-pointer font-medium transition-colors">(12 recensioni)</span>
            </div>
            
            <div className="mb-6 sm:mb-8">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-2">€{product.price}</div>
              <div className="text-sm text-gray-500 font-medium">IVA inclusa • Spedizione gratuita</div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-100">
              <p className="text-gray-800 leading-relaxed text-base sm:text-lg font-medium">{product.description}</p>
            </div>
            
            <div className="mb-8" id="description-section">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="h-6 w-6 mr-3 text-blue-600" />
                Caratteristiche principali
              </h3>
              <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 transition-all duration-500 overflow-hidden ${
                isDescriptionExpanded ? 'max-h-none' : 'max-h-80'
              }`}>
                {(product.id === '1' ? [
                  { icon: "📏", title: "Scala", desc: "1:64" },
                  { icon: "🎯", title: "Età consigliata", desc: "5-13 anni" },
                  { icon: "✅", title: "Stato", desc: "Pronto all'uso" },
                  { icon: "📡", title: "Frequenza", desc: "2.4 GHz" },
                  { icon: "🎛️", title: "Canali", desc: "4" },
                  { icon: "⚙️", title: "Motore", desc: "0610 a tazza cava" },
                  { icon: "🔋", title: "Batteria", desc: "3.7V 20C 100mAh con piastra protettiva" },
                  { icon: "🚗", title: "Sospensioni", desc: "Anteriori indipendenti" },
                  { icon: "💡", title: "Luci", desc: "Sì" },
                  { icon: "📹", title: "Fotocamera", desc: "720P" },
                  { icon: "🎮", title: "Controllo", desc: "Telecomando" },
                  { icon: "📶", title: "Distanza controllo", desc: "~30 metri" },
                  { icon: "⏱️", title: "Tempo gioco", desc: "con telecamera +15min. senza telecamera +30min" },
                  { icon: "⚡", title: "Tempo ricarica", desc: "~30 minuti" },
                  { icon: "🏎️", title: "Velocità", desc: "1.7 / 2.5 / 3.0 km/h" },
                  { icon: "📐", title: "Dimensioni auto", desc: "6.8 × 3.2 × 3.9 cm" },
                  { icon: "⚖️", title: "Peso", desc: "75.3 g" }
                ] : [
                  { icon: "📏", title: "Scala", desc: "1:64" },
                  { icon: "🎯", title: "Età consigliata", desc: "5-13 anni" },
                  { icon: "✅", title: "Stato", desc: "Pronto all'uso" },
                  { icon: "📶", title: "Frequenza", desc: "Wi-Fi" },
                  { icon: "🎛️", title: "Canali", desc: "4" },
                  { icon: "⚙️", title: "Motore", desc: "0610 a tazza cava" },
                  { icon: "🔋", title: "Batteria", desc: "3.7V 20C 100mAh con piastra protettiva" },
                  { icon: "🚗", title: "Sospensioni", desc: "Anteriori indipendenti" },
                  { icon: "💡", title: "Luci", desc: "Sì" },
                  { icon: "📹", title: "Fotocamera", desc: "720P" },
                  { icon: "📱", title: "Controllo", desc: "App" },
                  { icon: "📶", title: "Distanza controllo", desc: "~30 metri" },
                  { icon: "⏱️", title: "Tempo gioco", desc: "con telecamera +15min. senza telecamera +30min" },
                  { icon: "⚡", title: "Tempo ricarica", desc: "~30 minuti" },
                  { icon: "🏎️", title: "Velocità", desc: "1.7 / 2.5 / 3.0 km/h" },
                  { icon: "📐", title: "Dimensioni auto", desc: "6.8 × 3.2 × 3.9 cm" },
                  { icon: "⚖️", title: "Peso", desc: "75.3 g" }
                ]).slice(0, isDescriptionExpanded ? undefined : 6).map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 xl:p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-start space-x-4 xl:space-x-5">
                      <span className="text-2xl xl:text-3xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 xl:mb-2 text-sm xl:text-base">{feature.title}</h4>
                        <p className="text-gray-600 text-sm xl:text-base leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => {
                  if (isDescriptionExpanded) {
                    const descriptionSection = document.getElementById('description-section');
                    if (descriptionSection) {
                      descriptionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                  setIsDescriptionExpanded(!isDescriptionExpanded);
                }}
                className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium text-sm flex items-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isDescriptionExpanded ? 'Mostra meno' : 'Mostra tutte le caratteristiche'}
                <Plus className={`ml-2 h-5 w-5 transition-transform duration-300 ${isDescriptionExpanded ? 'rotate-45' : ''}`} />
              </button>
            </div>
            
            {/* Enhanced Features Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 xl:gap-10 mb-8 sm:mb-12 xl:mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Spedizione Express</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">Consegna gratuita in 24-48h in tutta Italia. Tracking in tempo reale e imballaggio sicuro.</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Qualità Certificata</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">Prodotti testati e certificati secondo gli standard europei più rigorosi per la sicurezza.</p>
              </div>
            </div>
          </div>
          

         </div>
        
        {/* Sticky Purchase Footer */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl">
          <div className="max-w-none xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-3 sm:space-x-6">
                <div className="text-xl sm:text-2xl font-bold text-red-600">€{product.price}</div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Qtà:</label>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-orange-50 hover:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                    </button>
                    <span className="text-base sm:text-lg font-bold text-gray-900 min-w-[1.5rem] sm:min-w-[2rem] text-center">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Colore:</label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-xs sm:text-sm"
                  >
                    <option value="grigio">🔘 Grigio</option>
                    <option value="giallo">🟡 Giallo</option>
                    <option value="rosa">🌸 Rosa</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-2 sm:py-3 px-3 sm:px-6 rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex-1 sm:flex-none justify-center"
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">Carrello</span>
                </button>
                
                <button
                  onClick={handleBuyNow}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-2 sm:py-3 px-3 sm:px-6 rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex-1 sm:flex-none justify-center"
                >
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">Ordina ora</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Reviews Section */}
        <div className="mt-8 sm:mt-16">
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 mr-3 sm:mr-4 text-yellow-400 fill-yellow-400" />
              Recensioni clienti
            </h2>
            
            {/* Reviews Summary */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900">4.5</div>
                    <div className="flex justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${star <= 4.5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">su 5 stelle</div>
                  </div>
                  <div className="text-gray-600 text-center sm:text-left">
                    <div className="text-base sm:text-lg font-semibold">{reviews.length + userReviews.length} recensioni</div>
                    <div className="text-xs sm:text-sm">Tutte verificate</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base w-full sm:w-auto"
                >
                  Scrivi una recensione
                </button>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {/* User reviews first */}
              {userReviews.map((review, index) => (
                <div key={`user-${index}`} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                          <span className="font-bold text-gray-900 text-sm sm:text-base">{review.name}</span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium w-fit">Verificata</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`h-3 w-3 sm:h-4 sm:w-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">Appena aggiunta</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{review.comment}</p>
                </div>
              ))}
              
              {/* Existing reviews */}
              {reviews.map(review => (
                <div key={review.id} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm sm:text-base">{review.author}</div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`h-3 w-3 sm:h-4 sm:w-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">1 mese fa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced Related Products Section */}
        {otherProducts.length > 0 && (
          <div className="mt-8 sm:mt-16">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-orange-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 mr-3 sm:mr-4 text-orange-600" />
                Ti potrebbe interessare anche
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {otherProducts.map((otherProduct) => (
                  <Link
                    key={otherProduct.id}
                    to={`/product/${otherProduct.id}`}
                    className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 block"
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 lg:p-6" style={{ height: '200px' }}>
                      <img
                         src={otherProduct.images[0]}
                         alt={otherProduct.name}
                         className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                         onError={(e) => {
                           // Fallback to default image if the current one fails to load
                           e.currentTarget.src = '/images/default-product.jpg';
                         }}
                       />
                      <div className={`absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg ${otherProduct.color === 'orange' ? 'bg-orange-500 text-white' : 'bg-purple-500 text-white'}`}>
                        {otherProduct.color === 'orange' ? '🟠' : '🟣'} {otherProduct.type}
                      </div>
                      <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                        -15%
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 lg:p-6">
                      <h3 className="text-gray-900 font-bold mb-2 sm:mb-3 text-base sm:text-lg group-hover:text-orange-600 transition-colors line-clamp-2">{otherProduct.name}</h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm font-medium">
                        {otherProduct.id === '1' ? 'Versione con telecomando' : 'Versione con app'}
                      </p>

                      <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                        {otherProduct.id === '1' ? (
                          // Caratteristiche principali per la versione con telecomando
                          <>
                            <div className="flex items-center text-gray-600">
                              <div className="h-2 w-2 sm:h-3 sm:w-3 bg-green-500 rounded-full mr-2 sm:mr-3"></div>
                              <span className="text-xs sm:text-sm font-medium">Controllo: Telecomando</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <div className="h-2 w-2 sm:h-3 sm:w-3 bg-blue-500 rounded-full mr-2 sm:mr-3"></div>
                              <span className="text-xs sm:text-sm font-medium">Scala: 1:64</span>
                            </div>
                          </>
                        ) : (
                          // Caratteristiche principali per la versione con app
                          <>
                            <div className="flex items-center text-gray-600">
                              <div className="h-2 w-2 sm:h-3 sm:w-3 bg-green-500 rounded-full mr-2 sm:mr-3"></div>
                              <span className="text-xs sm:text-sm font-medium">Controllo: Smartphone</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <div className="h-2 w-2 sm:h-3 sm:w-3 bg-blue-500 rounded-full mr-2 sm:mr-3"></div>
                              <span className="text-xs sm:text-sm font-medium">Scala: 1:64</span>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="mb-3 sm:mb-4">
                        <div className="text-xl sm:text-2xl font-bold text-red-600">
                          €{otherProduct.price}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 line-through">€{(otherProduct.price * 1.18).toFixed(2)}</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/product/${otherProduct.id}`);
                        }}
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105 text-sm sm:text-base"
                      >
                        Visualizza prodotto
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setIsReviewModalOpen(false)}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Aggiungi una recensione</h3>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                setUserReviews(prev => [...prev, { ...newReview }]);
                setNewReview({ name: '', rating: 5, comment: '' });
                setIsReviewModalOpen(false);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                    placeholder="Il tuo nome"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valutazione
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= newReview.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          } hover:text-yellow-400 transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recensione
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-gray-900"
                    placeholder="Scrivi la tua recensione..."
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Pubblica
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Lightbox Modal */}
          {isLightboxOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white animate-fadeIn" onClick={() => setIsLightboxOpen(false)}>
            <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-2 sm:p-4 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
              <img
                 src={detailImages[lightboxImageIndex]}
                 alt={`${product.name} - immagine ${lightboxImageIndex + 1}`}
                 className="max-w-full max-h-full object-contain transition-all duration-300"
               />
              
              {/* Close button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-lg sm:text-xl font-bold z-10 transition-all duration-200 hover:scale-110"
                title="Chiudi (ESC)"
              >
                ×
              </button>
              
              {/* Navigation arrows */}
              {detailImages.length > 1 && (
                <>
                  <button
                     onClick={() => {
                       const newIndex = lightboxImageIndex === 0 ? detailImages.length - 1 : lightboxImageIndex - 1;
                       setLightboxImageIndex(newIndex);
                     }}
                     className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-xl sm:text-2xl font-bold z-10 transition-all duration-200 hover:scale-110"
                     title="Immagine precedente (←)"
                   >
                     ‹
                   </button>
                   <button
                     onClick={() => {
                       const newIndex = (lightboxImageIndex + 1) % detailImages.length;
                       setLightboxImageIndex(newIndex);
                     }}
                     className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-xl sm:text-2xl font-bold z-10 transition-all duration-200 hover:scale-110"
                     title="Immagine successiva (→)"
                   >
                     ›
                   </button>
                </>
              )}
              
              {/* Image counter */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-gray-800 text-xs sm:text-sm bg-gray-200 px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-gray-300">
                {lightboxImageIndex + 1} / {detailImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;