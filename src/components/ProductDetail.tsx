import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, ShoppingBag, Plus, Minus } from 'lucide-react';
import { products, Product } from '../data/products';

interface ProductDetailProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart, onBuyNow }) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === productId);
  const otherProducts = products.filter(p => p.id !== productId);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  // Scroll to top when component mounts or productId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  // Automatic image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      if (product && product.images && product.images.length > 0) {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % product.images.length
        );
      }
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(interval);
  }, [product]);
  
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
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % product.images.length
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + product.images.length) % product.images.length
    );
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
    onAddToCart(product, quantity);
  };
  
  const handleBuyNow = () => {
    onBuyNow(product, quantity);
  };
  
  // Mock reviews data
  const reviews = [
    { id: 1, author: 'Marco V.', rating: 5, comment: 'Macchina fantastica! Veloce e reattiva, la uso con i miei figli ogni weekend.' },
    { id: 2, author: 'Giulia R.', rating: 4, comment: 'Ottimo prodotto, batteria dura a lungo. Unico neo: il telecomando potrebbe essere più ergonomico.' },
    { id: 3, author: 'Alessandro B.', rating: 5, comment: 'La migliore RC che abbia mai avuto. Perfetta per giocare in casa e all\'aperto.' }
  ];
  
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/#shop" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Torna allo shop
          </Link>
        </div>
        
        <div className="grid lg:grid-cols-[2fr_3fr_1fr] gap-8">
          {/* Colonna 1: Product Gallery */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="relative h-64">
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - immagine ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              
              {/* Navigation arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/70 hover:bg-gray-800/90 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/70 hover:bg-gray-800/90 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-gray-800/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="p-3 flex space-x-2 overflow-x-auto bg-white">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 ${currentImageIndex === index ? 'border-red-600' : 'border-gray-300'}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Colonna 2: Product Info */}
          <div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${product.color === 'orange' ? 'bg-orange-500 text-white' : 'bg-purple-500 text-white'}`}>
              {product.color === 'orange' ? '🟠' : '🟣'} {product.type}
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`h-4 w-4 ${star <= 4.5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-400 text-sm">(12 recensioni)</span>
            </div>
            
            <div className="text-3xl font-bold text-white mb-4">€{product.price}</div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>
            
            <div className="mb-6" id="description-section">
              <h3 className="text-white font-semibold mb-3">Caratteristiche:</h3>
              <ul className="space-y-1 leading-tight">
                {product.id === '1' ? (
                  // Caratteristiche per la macchina WLtoys 6401 RC (versione con telecomando)
                  <>
                    <li className="flex items-start text-gray-300">
                      <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      Scala: 1:64
                    </li>
                    <li className="flex items-start text-gray-300">
                      <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      Età consigliata: 5-13 anni
                    </li>
                    <li className="flex items-start text-gray-300">
                      <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      Stato: Pronto all'uso
                    </li>
                    <li className="flex items-start text-gray-300">
                      <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      Frequenza: 2.4 GHz
                    </li>
                    {isDescriptionExpanded && (
                      <>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Canali: 4
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Motore: 0610 a tazza cava
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Auto: 3.7V 20C 100mAh con piastra protettiva
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Sospensioni: Anteriori indipendenti
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Luci: Sì
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Fotocamera: 720P
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Controllo: Telecomando
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Distanza di controllo: ~30 metri
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Tempo di gioco: +15 minuti
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Tempo di ricarica: ~30 minuti
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Velocità: 1.7 / 2.5 / 3.0 km/h
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Dimensioni auto: 6.8 × 3.2 × 3.9 cm
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Peso: 75.3 g
                        </li>
                      </>
                    )}
                  </>
                ) : (
                  // Caratteristiche per la macchina WLtoys 6401 Wi-Fi (versione con app)
                  <>
                    <li className="flex items-start text-gray-300">
                      <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      Scala: 1:64
                    </li>
                    <li className="flex items-start text-gray-300">
                      <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      Età consigliata: 5-13 anni
                    </li>
                    <li className="flex items-start text-gray-300">
                      <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      Stato: Pronto all'uso
                    </li>
                    <li className="flex items-start text-gray-300">
                      <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      Frequenza: Wi-Fi
                    </li>
                    {isDescriptionExpanded && (
                      <>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Canali: 4
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Motore: 0610 a tazza cava
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Auto: 3.7V 20C 100mAh con piastra protettiva
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Sospensioni: Anteriori indipendenti
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Luci: Sì
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Fotocamera: 720P
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Controllo: App
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Distanza di controllo: ~30 metri
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Tempo di gioco: +15 minuti
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Tempo di ricarica: ~30 minuti
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Velocità: 1.7 / 2.5 / 3.0 km/h
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Dimensioni auto: 6.8 × 3.2 × 3.9 cm
                        </li>
                        <li className="flex items-start text-gray-300">
                          <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                          Peso: 75.3 g
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
              
              {/* Pulsante per espandere/contrarre */}
              <button
                onClick={() => {
                  if (isDescriptionExpanded) {
                    // Se stiamo chiudendo, scrolla alla sezione descrizione
                    const descriptionSection = document.getElementById('description-section');
                    if (descriptionSection) {
                      descriptionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                  setIsDescriptionExpanded(!isDescriptionExpanded);
                }}
                className="mt-3 text-white hover:text-gray-300 transition-colors flex items-center"
              >
                {isDescriptionExpanded ? (
                  <>
                    <Minus className="h-4 w-4 mr-1" />
                    Mostra meno
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1" />
                    Mostra di più
                  </>
                )}
              </button>
            </div>
            
            {/* Testo corsivo grassetto */}
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-300 italic font-bold text-center">
                🛡️ Testato dal team JustFast.<br />
                ✅ Affidabilità, prestazioni reali e qualità costruttiva garantite.
              </p>
            </div>
          </div>
          
          {/* Colonna 3: Azioni acquisto */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-gray-800 border-2 border-yellow-500 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 text-center">Acquista ora</h3>
              
              <div className="text-3xl font-bold text-white mb-4 text-center">€{product.price}</div>
              
              <div className="mb-6">
                 <h3 className="text-white font-semibold mb-3">🔢 Quantità:</h3>
                 <div className="flex items-center justify-center space-x-4">
                   <button
                     onClick={decrementQuantity}
                     disabled={quantity <= 1}
                     className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                   >
                     <Minus className="h-4 w-4 text-white" />
                   </button>
                   <span className="text-white font-semibold text-xl">{quantity}</span>
                   <button
                     onClick={incrementQuantity}
                     className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                   >
                     <Plus className="h-4 w-4 text-white" />
                   </button>
                   <span className="text-gray-400 text-sm ml-2">(15 disponibili)</span>
                 </div>
               </div>
               
               {/* Tempi di consegna */}
               <div className="mb-6 text-center">
                 <p className="text-gray-300 text-sm">
                   📦 <strong>Consegna stimata:</strong> 2-3 giorni lavorativi
                 </p>
               </div>
               
               {/* Action buttons */}
               <div className="flex flex-col gap-3">
                 <button
                   onClick={handleBuyNow}
                   className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                 >
                   🟡 Ordina ora
                 </button>
                 
                 <button
                   onClick={handleAddToCart}
                   className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                 >
                   🟠 Aggiungi al carrello
                 </button>
               </div>
             </div>
           </div>
         </div>
        
        {/* Reviews section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8">Recensioni dei clienti</h2>
          
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white">{review.author}</h3>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">1 mese fa</span>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Other products section */}
        {otherProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">Ti potrebbe interessare anche</h2>
            
            <div className="grid md:grid-cols-1 gap-8 lg:gap-12">
              {otherProducts.map((otherProduct) => (
                <Link
                  key={otherProduct.id}
                  to={`/product/${otherProduct.id}`}
                  className="group bg-white rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl block flex flex-col"
                >
                  <div className="relative overflow-hidden" style={{ height: '300px' }}>
                    <img
                      src={otherProduct.images[0]}
                      alt={otherProduct.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to default image if the current one fails to load
                        e.currentTarget.src = otherProduct.image;
                      }}
                    />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${otherProduct.color === 'orange' ? 'bg-orange-500 text-white' : 'bg-purple-500 text-white'}`}>
                      {otherProduct.color === 'orange' ? '🟠' : '🟣'} {otherProduct.type}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{otherProduct.name}</h3>
                    <p className="text-gray-700 mb-4 text-center font-medium">
                      {otherProduct.id === '1' ? 'Versione con telecomando' : 'Versione con app'}
                    </p>

                    <div className="space-y-2 mb-6">
                      {otherProduct.id === '1' ? (
                        // Caratteristiche principali per la versione con telecomando
                        <>
                          <div className="flex items-center text-gray-600">
                            <div className="h-4 w-4 bg-red-600 rounded-full"></div>
                            <span className="ml-2 text-sm">Scala: 1:64</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <div className="h-4 w-4 bg-red-600 rounded-full"></div>
                            <span className="ml-2 text-sm">Stato: Pronto all'uso</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <div className="h-4 w-4 bg-red-600 rounded-full"></div>
                            <span className="ml-2 text-sm">Controllo: Telecomando</span>
                          </div>
                        </>
                      ) : (
                        // Caratteristiche principali per la versione con app
                        <>
                          <div className="flex items-center text-gray-600">
                            <div className="h-4 w-4 bg-red-600 rounded-full"></div>
                            <span className="ml-2 text-sm">Scala: 1:64</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <div className="h-4 w-4 bg-red-600 rounded-full"></div>
                            <span className="ml-2 text-sm">Stato: Pronto all'uso</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <div className="h-4 w-4 bg-red-600 rounded-full"></div>
                            <span className="ml-2 text-sm">Controllo: Smartphone</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-gray-900">
                        €{otherProduct.price}
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/product/${otherProduct.id}`);
                        }}
                        className="group bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center transform hover:scale-105"
                      >
                        Visualizza
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;