// Shop.tsx
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Smartphone, Radio, Camera, Battery, Info, X, CheckCircle, Car } from 'lucide-react';
import { CartItem } from '../App';
// ========================================================================
// 1. INTERFACCIA E DATI PRODOTTI (4 ARTICOLI PRESENTI)
// ========================================================================

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  subtitle: string;
  features: string[];
  gallery?: string[]; 
  specifications: Record<string, string>;
}

const productsData: Product[] = [
  {
    "id": 1,
    "name": "CONTROLLER-CAR X9",
    "price": 69.99,
    "image": "https://placehold.co/400x250/f97316/ffffff?text=RC+X9+Main",
    "description": "Carro da corsa RC con controllo classico. Perfetto per i principianti.",
    "category": "Controller",
    "subtitle": "Versione con telecomando professionale",
    "features": ["Controller 2.4GHz", "Camera FPV Standard (480p)", "Batteria Lipo (30 min)", "Portata 100m"],
    "gallery": [
      "https://placehold.co/400x250/ea580c/ffffff?text=X9+Vista+Frontale",
      "https://placehold.co/400x250/d97706/ffffff?text=X9+Vista+Posteriore"
    ],
    "specifications": {"Motore": "Brushed", "Velocità_Massima": "40 km/h", "Impermeabilità": "IPX4", "Tempo_di_Ricarica": "90 min"}
  },
  {
    "id": 2,
    "name": "APP-CAR PRO V2",
    "price": 79.99,
    "image": "https://placehold.co/400x250/9333ea/ffffff?text=RC+V2+Main",
    "description": "L'ultima generazione di auto RC controllabili via smartphone.",
    "category": "Smartphone",
    "subtitle": "Versione con controllo App e FPV Pro",
    "features": ["Controllo App Mobile", "Camera HD Streaming (1080p)", "Batteria potenziata (45 min)", "Funzione Ritorno GPS"],
    "gallery": [
      "https://placehold.co/400x250/c026d3/ffffff?text=V2+Vista+App",
      "https://placehold.co/400x250/a855f7/ffffff?text=V2+Telaio+Aperto"
    ],
    "specifications": {"Motore": "Brushless", "Velocità_Massima": "65 km/h", "Impermeabilità": "IPX5", "Tempo_di_Ricarica": "120 min"}
  },
  {
    "id": 3,
    "name": "APP-CAR MINI Z",
    "price": 34.99,
    "image": "https://placehold.co/400x250/10b981/ffffff?text=RC+Mini+Z+Main",
    "description": "Compatta e veloce, la Mini Z è perfetta per l'uso indoor.",
    "category": "Smartphone",
    "subtitle": "Edizione Tascabile FPV",
    "features": ["Controllo App Mobile", "Camera FPV Mini (720p)", "Batteria integrata (20 min)", "Guida Agile Indoor"],
    "gallery": [
      "https://placehold.co/400x250/059669/ffffff?text=Mini+Z+in+Mano",
      "https://placehold.co/400x250/047857/ffffff?text=Mini+Z+Corsa+Indoor"
    ],
    "specifications": {"Motore": "Micro Brushed", "Velocità_Massima": "25 km/h", "Impermeabilità": "No", "Tempo_di_Ricarica": "45 min"}
  },
  {
    "id": 4,
    "name": "RC TRACKER GHOST",
    "price": 99.99,
    "image": "https://placehold.co/400x250/3b82f6/ffffff?text=Tracker+Ghost",
    "description": "Modello ad alte prestazioni con sospensioni indipendenti, ideale per terreni accidentati.",
    "category": "Controller",
    "subtitle": "Off-Road Heavy Duty",
    "features": ["Sistema di trazione 4x4", "Ammortizzatori a olio", "Batteria 10.0V (50 min)", "Telaio rinforzato"],
    "gallery": [
      "https://placehold.co/400x250/2563eb/ffffff?text=Ghost+Dettaglio+4x4",
      "https://placehold.co/400x250/1d4ed8/ffffff?text=Ghost+Sospensioni"
    ],
    "specifications": {"Motore": "Brushless", "Velocità_Massima": "80 km/h", "Impermeabilità": "IPX5", "Tempo_di_Ricarica": "150 min"}
  },
  {
    "id": 5,
    "name": "RC TRACKER GHOST",
    "price": 99.99,
    "image": "https://placehold.co/400x250/3b82f6/ffffff?text=Tracker+Ghost",
    "description": "Modello ad alte prestazioni con sospensioni indipendenti, ideale per terreni accidentati.",
    "category": "Controller",
    "subtitle": "Off-Road Heavy Duty",
    "features": ["Sistema di trazione 4x4", "Ammortizzatori a olio", "Batteria 10.0V (50 min)", "Telaio rinforzato"],
    "gallery": [
      "https://placehold.co/400x250/2563eb/ffffff?text=Ghost+Dettaglio+4x4",
      "https://placehold.co/400x250/1d4ed8/ffffff?text=Ghost+Sospensioni"
    ],
    "specifications": {"Motore": "Brushless", "Velocità_Massima": "80 km/h", "Impermeabilità": "IPX5", "Tempo_di_Ricarica": "150 min"}
  }
];

// ========================================================================
// 2. FUNZIONI E ICONE UTILITY
// ========================================================================

const ScrollAnimatedElement = ({ children, className }: { children: React.ReactNode, className: string }) => (
  <div className={`transition-opacity duration-1000 ease-in opacity-100 ${className}`}>
    {children}
  </div>
);

const getIcon = (feature: string) => {
    if (feature.includes('App') || feature.includes('Smartphone')) return <Smartphone className="h-4 w-4" />;
    if (feature.includes('Controller') || feature.includes('2.4GHz') || feature.includes('trazione')) return <Radio className="h-4 w-4" />;
    if (feature.includes('Camera') || feature.includes('FPV') || feature.includes('Streaming')) return <Camera className="h-4 w-4" />;
    if (feature.includes('Batteria') || feature.includes('min') || feature.includes('Lipo')) return <Battery className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
};


// ========================================================================
// 3. COMPONENTE MODALE (ProductDetail)
// ========================================================================

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product,setCarrello,  onClose, onAddToCart }) => {
  const [currentImage, setCurrentImage] = useState(product?.image || '');
  const [isAdded, setIsAdded] = useState(false);


  useEffect(() => {
    if (product) {
      setCurrentImage(product.image);
      setIsAdded(false); 
    }
  }, [product]);

  if (!product) return null;


  const handleAddToCart = () => {
    onAddToCart(product);
    //parsing di prodotto a cart item
    const newCartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1 // Si presume che il primo elemento aggiunto sia sempre in quantità 1
    };
    setCarrello(newCartItem)
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); 
  };

  const images = [product.image, ...(product.gallery || [])];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4 transition-opacity duration-300 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 z-50 p-2 bg-white rounded-full transition-colors shadow-lg"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Colonna Sinistra: Galleria Immagini */}
          <div className="lg:w-1/2 p-6 flex flex-col items-center border-b lg:border-r lg:border-b-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 lg:hidden text-center">{product.name}</h1>
            
            <div className="w-full h-64 lg:h-80 mb-4 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <img 
                src={currentImage} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105" 
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src = 'https://placehold.co/400x250/ccc/000?text=Immagine+non+disponibile'; 
                  }}
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all ${
                    img === currentImage ? 'border-red-500 scale-105' : 'border-gray-200 hover:border-red-300'
                  }`}
                  onClick={() => setCurrentImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Colonna Destra: Dettagli e Specifiche */}
          <div className="lg:w-1/2 p-6 overflow-y-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 hidden lg:block">{product.name}</h1>
            <p className="text-md text-red-600 font-semibold mb-4">{product.subtitle}</p>
            
            <p className="text-gray-700 mb-6 border-b pb-4">{product.description}</p>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Caratteristiche Principali</h3>
                <ul className="space-y-2 text-sm">
                    {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-gray-600">
                            {getIcon(feature)}
                            <span className="ml-3">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Specifiche Tecniche</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm bg-gray-50 p-4 rounded-lg">
                    {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                            <span className="font-medium text-gray-500">{key.replace(/_/g, ' ')}:</span>
                            <span className="text-gray-800 font-bold">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
              <span className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">
                €{product.price.toFixed(2)}
              </span>
              <button
                onClick={handleAddToCart}
                className={`flex items-center px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg w-full sm:w-auto justify-center ${
                    isAdded 
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isAdded ? (
                    <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Aggiunto!
                    </>
                ) : (
                    <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Aggiungi al Carrello
                    </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ========================================================================
// 4. COMPONENTE SHOP REALE (VISUALIZZAZIONE DEI PRODOTTI)
// ========================================================================

interface ShopProps {
  products: Product[]; 
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void; 
}

const Shop: React.FC<ShopProps> = ({ products, onAddToCart, onProductClick }) => {

  const [hoveredImageIndex, setHoveredImageIndex] = useState<{ [key: number]: number }>({});
  const [hoverIntervalId, setHoverIntervalId] = useState<{ [key: number]: number }>({});
  
  const isProductsAvailable = products.length > 0;

  const handleMouseEnter = (product: Product) => {
    setHoveredImageIndex(prev => ({ ...prev, [product.id]: 0 }));
    if (product.gallery && product.gallery.length > 0) {
      const interval = setInterval(() => {
        setHoveredImageIndex(prev => {
          const current = prev[product.id] || 0;
          const totalImages = 1 + product.gallery!.length; 
          const next = (current + 1) % totalImages; 
          return { ...prev, [product.id]: next };
        });
      }, 1500) as unknown as number; 
      setHoverIntervalId(prev => ({ ...prev, [product.id]: interval }));
    }
  };

  const handleMouseLeave = (productId: number) => {
    if (hoverIntervalId[productId]) {
      clearInterval(hoverIntervalId[productId]);
      setHoverIntervalId(prev => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
    }
    setHoveredImageIndex(prev => ({ ...prev, [productId]: 0 }));
  };
  
  const getCurrentImageUrl = (product: Product) => {
    const index = hoveredImageIndex[product.id] || 0;
    if (index === 0) return product.image;
    if (product.gallery && product.gallery.length >= index) return product.gallery[index - 1];
    return product.image;
  };

  const handleProductClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    onProductClick(product); 
  };


  return (
    <section id="shop" className="py-16 sm:py-20 min-h-screen font-inter" style={{ backgroundColor: '#171616' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedElement className="text-center mb-10 sm:mb-14 px-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            Scegli la tua <span className="text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-extrabold inline-block">macchina RC FPV</span>
          </h2>
          {/* CONTATORE PER CONFERMARE CHE L'ARRAY HA TUTTI GLI ELEMENTI */}
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto">
            {products.length} prodotti trovati.
          </p>
        </ScrollAnimatedElement>

        <ScrollAnimatedElement
          // GRIGLIA RIPARATA: Assicura 2 colonne su schermi medi e 3 su schermi grandi.
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4"
        >
          {!isProductsAvailable ? (
            <div className="sm:col-span-2 lg:col-span-3 flex justify-center items-center py-20">
              <div className="text-white text-lg flex items-center space-x-2">
                <Car className="h-6 w-6 text-red-500 mr-2" />
                <span>Nessun prodotto disponibile.</span>
              </div>
            </div>
          ) : (
            // QUESTO LOOP MAPPA TUTTI I PRODOTTI DELL'ARRAY
            products.map((product) => (
            <div
              key={product.id}
              onClick={(e) => handleProductClick(e, product)}
              className="group rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-professional block flex flex-col relative shadow-professional hover:shadow-professional-hover cursor-pointer"
              style={{
                background: 'white',
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.2), 0 15px 30px rgba(0, 0, 0, 0.2)',
                border: 'none'
              }}
              onMouseEnter={() => handleMouseEnter(product)}
              onMouseLeave={() => handleMouseLeave(product.id)}
            >
              {/* Contenitore Immagine */}
              <div className="relative overflow-hidden bg-white" style={{ height: '250px', minHeight: '200px' }}>
                <img
                  src={getCurrentImageUrl(product)}
                  alt={`${product.name} - immagine principale`}
                  className={`w-full h-full object-contain transition-opacity duration-300 p-4 opacity-100 transform`}
                  style={{ backgroundColor: 'white' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src = 'https://placehold.co/400x250/ccc/000?text=Immagine+non+disponibile'; 
                  }}
                />
                
                {/* Indicatore Edizione */}
                <div className={`absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center ${product.category === 'Controller' ? 'bg-orange-500 text-white' : 'bg-purple-500 text-white'}`}>
                   {product.category === 'Controller' ? (
                     <Radio className="h-4 w-4 mr-1"/>
                   ) : (
                      <Smartphone className="h-4 w-4 mr-1" />
                    )} {product.category} Edition
                 </div>
              </div>

              {/* Dettagli Prodotto */}
              <div className="p-4 sm:p-6 bg-white flex flex-col justify-between flex-grow">
                <div className='text-center'>
                  <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">{product.name}</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 font-medium">
                    {product.subtitle}
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 max-w-xs mx-auto">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      {getIcon(feature)}
                      <span className="text-xs sm:text-sm ml-2">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Prezzo e Bottone Carrello */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-auto pt-4 border-t border-gray-100">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    €{product.price.toFixed(2)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      e.preventDefault(); 
                      onAddToCart(product); 
                    }}
                    className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-professional flex items-center transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto justify-center"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Acquista</span>
                    <span className="sm:hidden">Aggiungi</span>
                  </button>
                </div>
              </div>
            </div>
            ))
          )}
        </ScrollAnimatedElement>
      </div>
    </section>
  );
};


// ========================================================================
// 5. COMPONENTE WRAPPER PRINCIPALE
// ========================================================================

const AppWrapper: React.FC = () => {
  const [products] = useState<Product[]>(productsData);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    // Uso un alert per simulare SuccessPopup
    console.log(`${product.name} aggiunto al carrello! Articoli totali: ${cart.length + 1}`);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const CartIcon = () => (
    <div 
      className="fixed top-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-xl cursor-pointer hover:bg-red-700 transition-colors z-40"
      onClick={() => alert(`Carrello: ${cart.length} articoli.\nTotale: €${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`)}
    >
      <ShoppingCart className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 bg-white text-red-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
        {cart.length}
      </span>
    </div>
  );


  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        .transition-professional { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
        .shadow-professional { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        .shadow-professional-hover { box-shadow: 0 20px 25px -5px rgba(239, 68, 68, 0.3), 0 10px 10px -5px rgba(239, 68, 68, 0.2); }
      `}</style>

      <div className="min-h-screen bg-gray-900">
        
        <CartIcon />
        
        <Shop 
          products={products} 
          onAddToCart={handleAddToCart}
          onProductClick={handleProductClick}
        />
        
        {isModalOpen && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onClose={handleCloseModal}
            onAddToCart={handleAddToCart}
          />
        )}
        
        <footer className="bg-gray-900 text-white text-center py-4 text-sm">
          RC FPV Shop Demo - Array con {products.length} prodotti mappati correttamente.
        </footer>
      </div>
    </>
  );
};

export default AppWrapper;
