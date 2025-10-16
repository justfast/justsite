import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Smartphone, Radio, Camera, Battery } from 'lucide-react';
import TypingText from './TypingText';
import ScrollAnimatedElement from './ScrollAnimatedElement';
import { Product } from '../App';

interface ShopProps {
  products: Product[];
  onAddToCart: (product: Product, color?: string) => void;
}

const Shop: React.FC<ShopProps> = ({ products, onAddToCart }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});
  const [isTransitioning, setIsTransitioning] = useState<{[key: string]: boolean}>({});
  const [isHovered, setIsHovered] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    if (products.length > 0) {
      // Initialize current image index for each product
      const initialIndices: {[key: string]: number} = {};
      const initialTransitions: {[key: string]: boolean} = {};
      const initialHovered: {[key: string]: boolean} = {};
      products.forEach(product => {
        initialIndices[product.id] = 0;
        initialTransitions[product.id] = false;
        initialHovered[product.id] = false;
      });
      setCurrentImageIndex(initialIndices);
      setIsTransitioning(initialTransitions);
      setIsHovered(initialHovered);
    }

    // Set up interval for automatic slideshow with fade effects
    const interval = setInterval(() => {
      setIsTransitioning(prev => {
        const newTransitions = {...prev};
        products.forEach(product => {
          if (product.images && product.images.length > 1) {
            newTransitions[product.id] = true;
          }
        });
        return newTransitions;
      });

      // After fade out, change image and fade in
      setTimeout(() => {
        setCurrentImageIndex(prevIndices => {
          const newIndices = {...prevIndices};
          products.forEach(product => {
            if (product.images && product.images.length > 0) {
              newIndices[product.id] = (prevIndices[product.id] + 1) % product.images.length;
            }
          });
          return newIndices;
        });

        setIsTransitioning(prev => {
          const newTransitions = {...prev};
          products.forEach(product => {
            newTransitions[product.id] = false;
          });
          return newTransitions;
        });
      }, 300); // Fade out duration
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [products, currentImageIndex]);



  const handleMouseEnter = (productId: string) => {
    setIsHovered(prev => ({ ...prev, [productId]: true }));
  };

  const handleMouseLeave = (productId: string) => {
    setIsHovered(prev => ({ ...prev, [productId]: false }));
  };

  const getHoverImage = (productId: string) => {
    if (productId === '1') {
      return '/images/remote-car-copertina/1.webp';
    } else if (productId === '2') {
      return '/images/app-car-copertina/1.webp';
    }
    return null;
  };

  const getIcon = (feature: string) => {
    if (feature.includes('app') || feature.includes('Smartphone')) return <Smartphone className="h-4 w-4" />;
    if (feature.includes('Controller') || feature.includes('2.4GHz')) return <Radio className="h-4 w-4" />;
    if (feature.includes('Camera') || feature.includes('Streaming')) return <Camera className="h-4 w-4" />;
    if (feature.includes('Batteria')) return <Battery className="h-4 w-4" />;
    return <div className="h-4 w-4 bg-red-600 rounded-full"></div>;
  };

  return (
    <section id="shop" className="py-20 gradient-elegant" style={{ backgroundColor: '#171616' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedElement className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Scegli la tua <span className="relative text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-extrabold transform hover:scale-110 transition-all duration-300 hover:drop-shadow-lg animate-bounce-subtle inline-block">macchina RC FPV</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
            PORTA NEL BOX LA TUA PROSSIMA BELVA DA PISTA.
          </p>
          <p className="text-sm sm:text-lg text-gray-400 mt-2 sm:mt-4">
            Due versioni. Due stili di guida. O prendi il telecomando, o guidi con il tuo smartphone.
          </p>
        </ScrollAnimatedElement>

        <ScrollAnimatedElement 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 px-4"
          translateDistance={80}
        >
          {isLoading ? (
            // Loading skeleton
            <div className="col-span-full flex justify-center items-center py-20">
              <div className="text-white text-lg">Caricamento prodotti...</div>
            </div>
          ) : products.length === 0 ? (
            // No products found
            <div className="col-span-full flex justify-center items-center py-20">
              <div className="text-white text-lg">Nessun prodotto disponibile</div>
            </div>
          ) : (
            products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-professional block flex flex-col relative shadow-professional hover:shadow-professional-hover"
              style={{
                background: 'white',
                boxShadow: isHovered[product.id] 
                  ? '0 0 40px rgba(239, 68, 68, 0.6), 0 0 80px rgba(239, 68, 68, 0.3), 0 25px 50px rgba(0, 0, 0, 0.3)'
                  : '0 0 20px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.2), 0 15px 30px rgba(0, 0, 0, 0.2)',
                border: 'none'
              }}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={() => handleMouseLeave(product.id)}
            >
              {/* SVG Icon positioned on the right side */}
              <div className="absolute top-4 right-4 z-10">
                <svg viewBox="0 0 24 24" className="w-6 h-6" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <defs>
                      <style>{`.cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;}`}</style>
                    </defs>
                    <path className="cls-1" d="M17.07,20.61H9.79a2,2,0,0,1-2-2,2,2,0,0,1,2-2h1.87L5,9.86a2,2,0,0,1-.19-2.65,1.88,1.88,0,0,1,1.47-.68,1.84,1.84,0,0,1,1.35.55l4.06,4.06,4.08-3.06a1.91,1.91,0,0,1,2.5.18h0A17.18,17.18,0,0,1,22.42,15l.06.19"></path>
                    <path className="cls-1" d="M10.63,10.12A4.73,4.73,0,0,0,11,8.17,4.78,4.78,0,1,0,6.26,13a4.67,4.67,0,0,0,1.55-.26"></path>
                  </g>
                </svg>
              </div>
              <div className="relative overflow-hidden bg-white" style={{ height: '250px', minHeight: '200px' }}>
                <img
                  src={isHovered[product.id] && getHoverImage(product.id) 
                    ? getHoverImage(product.id)! 
                    : product.images[currentImageIndex[product.id] || 0]
                  }
                  alt={`${product.name} - immagine ${(currentImageIndex[product.id] || 0) + 1}`}
                  className={`w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ${
                    isHovered[product.id] 
                      ? 'opacity-100 transform translate-x-0'
                      : isTransitioning[product.id] 
                        ? 'opacity-0 transform translate-x-[-20px]' 
                        : 'opacity-100 transform translate-x-0'
                  }`}
                  style={{ backgroundColor: 'white' }}
                  onError={(e) => {
                    // Fallback to default image if the current one fails to load
                    e.currentTarget.src = product.image;
                  }}
                />
                <div className={`absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center ${product.color === 'orange' ? 'bg-orange-500 text-white' : 'bg-purple-500 text-white'}`}>
                   {product.color === 'orange' ? (
                     <svg fill="white" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 496 496" xmlSpace="preserve" className="mr-1">
                       <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                       <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                       <g id="SVGRepo_iconCarrier">
                         <g>
                           <g>
                             <g>
                               <path d="M490.208,383.104l-43.36-115.616C431.72,227.12,392.584,200,349.472,200H288v-16c0-8.824-7.176-16-16-16V24 c0-13.232-10.768-24-24-24s-24,10.768-24,24v144c-8.824,0-16,7.176-16,16v16h-61.472c-43.12,0-82.248,27.12-97.384,67.48 L5.784,383.104C1.944,393.352,0,404.104,0,415.048C0,459.688,36.312,496,80.952,496c27.136,0,52.312-13.48,67.36-36.048 L156.28,448h183.44l7.968,11.952C362.736,482.52,387.912,496,415.048,496c44.64,0,80.952-36.312,80.952-80.952 C496,404.104,494.056,393.352,490.208,383.104z M240,24c0-4.416,3.584-8,8-8s8,3.584,8,8v144h-16V24z M224,184h48v16h-48V184z M415.048,480c-21.768,0-41.976-10.816-54.048-28.92L348.28,432H147.72L135,451.08C122.928,469.184,102.72,480,80.952,480 C45.144,480,16,450.856,16,415.048c0-9.024,1.608-17.88,4.776-26.32l43.36-115.632C76.936,238.944,110.048,216,146.528,216H192 v16h16v-16h16v16h16v-16h16v16h16v-16h16v16h16v-16h45.472c36.488,0,69.592,22.944,82.4,57.104l43.36,115.624 c3.16,8.44,4.768,17.296,4.768,26.32C480,450.856,450.856,480,415.048,480z"></path>
                               <path d="M144,232c-39.704,0-72,32.296-72,72c0,39.704,32.296,72,72,72s72-32.296,72-72C216,264.296,183.704,232,144,232z M144,360c-30.872,0-56-25.128-56-56s25.128-56,56-56s56,25.128,56,56S174.872,360,144,360z"></path>
                               <path d="M168,280c-10.416,0-19.216,6.712-22.528,16H96v16h49.472c3.312,9.288,12.112,16,22.528,16c13.232,0,24-10.768,24-24 S181.232,280,168,280z M168,312c-4.416,0-8-3.584-8-8c0-4.416,3.584-8,8-8s8,3.584,8,8C176,308.416,172.416,312,168,312z"></path>
                               <path d="M208,416h80v-64h-80V416z M224,368h48v32h-16v-16h-16v16h-16V368z"></path>
                               <path d="M352,232c-39.704,0-72,32.296-72,72c0,39.704,32.296,72,72,72c39.704,0,72-32.296,72-72C424,264.296,391.704,232,352,232 z M352,360c-30.872,0-56-25.128-56-56s25.128-56,56-56s56,25.128,56,56S382.872,360,352,360z"></path>
                               <path d="M352,256c-13.232,0-24,10.768-24,24c0,10.416,6.712,19.216,16,22.528V352h16v-49.472c9.288-3.312,16-12.112,16-22.528 C376,266.768,365.232,256,352,256z M352,288c-4.416,0-8-3.584-8-8c0-4.416,3.584-8,8-8c4.416,0,8,3.584,8,8 C360,284.416,356.416,288,352,288z"></path>
                               <path d="M328,112c13.232,0,24-10.768,24-24s-10.768-24-24-24s-24,10.768-24,24S314.768,112,328,112z M328,80c4.416,0,8,3.584,8,8 s-3.584,8-8,8c-4.416,0-8-3.584-8-8S323.584,80,328,80z"></path>
                               <path d="M368,88c0,22.056-17.944,40-40,40v16c30.872,0,56-25.128,56-56s-25.128-56-56-56v16C350.056,48,368,65.944,368,88z"></path>
                               <path d="M400,88c0,39.704-32.296,72-72,72v16c48.52,0,88-39.48,88-88S376.52,0,328,0v16C367.704,16,400,48.296,400,88z"></path>
                               <path d="M144,88c0,13.232,10.768,24,24,24s24-10.768,24-24s-10.768-24-24-24S144,74.768,144,88z M176,88c0,4.416-3.584,8-8,8 s-8-3.584-8-8s3.584-8,8-8S176,83.584,176,88z"></path>
                               <path d="M168,48V32c-30.872,0-56,25.128-56,56s25.128,56,56,56v-16c-22.056,0-40-17.944-40-40C128,65.944,145.944,48,168,48z"></path>
                               <path d="M168,176v-16c-39.704,0-72-32.296-72-72s32.296-72,72-72V0c-48.52,0-88,39.48-88,88S119.48,176,168,176z"></path>
                             </g>
                           </g>
                         </g>
                       </g>
                     </svg>
                   ) : (
                      <svg fill="white" height="22px" width="22px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" className="mr-1">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <g>
                            <path fill="white" d="M486.562,115.434c-3.105-6.72-8.324-12.041-14.635-15.546c-6.311-3.506-13.684-5.282-21.464-5.282 c-13.636,0-28.585,5.462-41.813,17.15c-11.019,9.722-20.749,23.791-27.784,42.504V16.356C380.866,7.334,373.525,0,364.509,0 h-229.54c-9.03,0-16.356,7.334-16.356,16.356v134.007l-34.637-13.047c-5.274-1.981-10.713-2.924-16.065-2.924 c-9.243,0-18.179,2.798-25.677,7.907c-7.506,5.093-13.582,12.512-17.016,21.63c-1.989,5.266-2.931,10.72-2.931,16.057 c0,9.235,2.814,18.171,7.906,25.678c5.093,7.49,12.52,13.573,21.638,17.007l30.722,11.57c-1.886,0.912-3.709,1.965-5.454,3.152 c-7.09,4.834-12.882,11.868-16.12,20.506c-1.894,4.975-2.782,10.139-2.782,15.208c0,8.764,2.641,17.213,7.49,24.341 c4.842,7.098,11.868,12.844,20.514,16.129l2.279,0.848c-0.841,0.495-1.674,1.022-2.476,1.564 c-7.137,4.818-12.898,11.844-16.136,20.514c-1.894,4.975-2.782,10.131-2.782,15.208c0,8.772,2.649,17.205,7.506,24.303 c4.794,7.136,11.828,12.889,20.459,16.128l2.271,0.864c-0.881,0.495-1.722,1.03-2.555,1.603 c-7.105,4.802-12.889,11.837-16.136,20.467c-1.894,5.007-2.774,10.171-2.774,15.248c0,8.724,2.649,17.213,7.49,24.302 c4.841,7.106,11.876,12.89,20.514,16.129l29.505,11.113c4.975,1.87,10.147,2.782,15.216,2.782c7.082,0,13.944-1.776,20.074-4.983 c9.345,6.382,20.128,12.418,32.578,17.496c20.381,8.315,45.044,14.092,74.446,14.776c1.863,0.048,3.694,0.064,5.518,0.064 c28.632,0.015,52.549-5.455,72.411-15.39c14.893-7.45,27.445-17.385,37.946-29.119c15.782-17.598,26.99-39.118,35.455-62.657 c8.433-23.477,14.155-49.02,18.785-74.989c0.117-0.55,0.714-3.223,1.681-7.584c3.812-17.158,13.37-60.174,22.266-99.943 c4.449-19.877,8.732-38.945,12.057-53.547c1.651-7.294,3.065-13.479,4.142-18.077c0.534-2.296,0.983-4.197,1.337-5.644 c0.33-1.415,0.597-2.436,0.668-2.68c1.186-4.158,1.768-8.221,1.768-12.143C489.722,124.929,488.629,119.899,486.562,115.434z M57.584,207.361c-5.886-2.216-10.571-6.084-13.857-10.893c-3.277-4.826-5.085-10.58-5.085-16.482 c0-3.419,0.597-6.877,1.886-10.304c2.224-5.878,6.075-10.578,10.902-13.864c4.81-3.27,10.578-5.085,16.481-5.085 c3.404,0,6.877,0.605,10.288,1.886l40.414,15.209v62.516L57.584,207.361z M79.229,288.252c-3.01-4.449-4.676-9.715-4.676-15.146 c0-3.136,0.558-6.31,1.728-9.455c2.028-5.392,5.597-9.714,10.014-12.732c4.417-3.002,9.714-4.669,15.114-4.669 c3.136,0,6.311,0.566,9.447,1.73h0.032l7.726,2.923l21.786,8.206c4.024,1.501,7.42,3.859,10.171,6.806 c0.912,0.974,1.768,2.058,2.554,3.206c3.002,4.41,4.645,9.714,4.645,15.106c0,3.144-0.558,6.319-1.737,9.494 c-1.274,3.403-3.144,6.335-5.462,8.819c-1.376,1.485-2.876,2.751-4.55,3.898c-4.417,3.011-9.676,4.654-15.107,4.654 c-3.144,0-6.319-0.559-9.455-1.745l-2.845-1.085l-26.66-9.998C86.554,296.206,82.231,292.669,79.229,288.252z M88.086,366.832 c-2.994-4.425-4.636-9.722-4.636-15.122c0-3.144,0.55-6.318,1.737-9.447c2.02-5.431,5.548-9.714,10.006-12.764 c4.409-3.003,9.714-4.654,15.114-4.654c2.751,0,5.533,0.409,8.308,1.352c0.393,0.094,0.755,0.267,1.148,0.393l29.505,11.114 c0.456,0.165,0.88,0.33,1.305,0.534c4.81,2.091,8.67,5.391,11.412,9.447c3.018,4.449,4.676,9.722,4.676,15.153 c0,3.144-0.55,6.304-1.721,9.448c0,0.031-0.04,0.063-0.04,0.094c-2.028,5.376-5.596,9.66-9.974,12.638 c-4.417,3.01-9.722,4.669-15.122,4.669c-3.136,0-6.303-0.551-9.447-1.722l-11.742-4.425l-17.762-6.712 C95.42,374.802,91.129,371.265,88.086,366.832z M174.056,449.783c-0.102,0.362-0.228,0.754-0.354,1.116 c-2.035,5.392-5.572,9.706-10.005,12.716c-4.425,3.011-9.683,4.692-15.114,4.692c-3.144,0-6.319-0.558-9.455-1.745l-29.513-11.121 c-5.431-2.027-9.714-5.596-12.724-10.013c-3.01-4.41-4.677-9.699-4.677-15.106c0-3.144,0.55-6.35,1.738-9.455 c2.027-5.423,5.588-9.754,10.005-12.756c4.283-2.923,9.424-4.55,14.658-4.645h0.456c3.136,0,6.31,0.526,9.455,1.722l1.28,0.472 l28.216,10.633c5.431,2.052,9.722,5.597,12.764,10.014c3.011,4.44,4.653,9.706,4.653,15.145 C175.439,444.194,175.014,447.001,174.056,449.783z M155.058,322.402l-2.35-0.888c0.849-0.488,1.674-1.014,2.508-1.556 c7.128-4.81,12.882-11.852,16.128-20.482c1.894-5.007,2.782-10.186,2.782-15.248c0-8.756-2.649-17.197-7.499-24.302 c-3.953-5.847-9.416-10.799-16.057-14.162V49.068h198.982v321.679H182.221c0.488-2.642,0.794-5.282,0.794-7.908 c0-8.771-2.642-17.212-7.482-24.348C170.691,331.401,163.657,325.632,155.058,322.402z M261.195,404.322 c0,6.32-5.132,11.46-11.451,11.46c-6.328,0-11.452-5.14-11.452-11.46c0-6.311,5.124-11.443,11.452-11.443 C256.062,392.88,261.195,398.012,261.195,404.322z M472.218,137.89c-0.26,0.88-0.559,2.113-1.014,4 c-1.658,6.94-5.07,21.882-9.258,40.477c-12.56,55.741-32.138,144.052-32.138,144.052l-0.04,0.172l-0.031,0.173 c-4.04,22.73-8.905,44.824-15.546,65.038c-4.975,15.177-10.949,29.277-18.274,41.828c-11.004,18.848-24.915,34.166-43.307,44.934 c-18.415,10.744-41.498,17.07-71.412,17.086c-1.682,0-3.396-0.032-5.14-0.063c-27.478-0.653-50.089-5.99-68.638-13.558 c-9.534-3.906-17.983-8.402-25.473-13.165c2.931-3.576,5.36-7.655,7.058-12.214c0.856-2.248,1.509-4.574,1.933-6.869 c0.338-1.603,0.55-3.214,0.676-4.81l172.896,1.54c9.016,0,16.356-7.324,16.356-16.348V211.927 c2.971-10.446,6.798-23.917,11.758-41.334c6.374-22.352,16.324-37.278,26.856-46.591c10.54-9.306,21.732-13.047,30.983-13.047 c7.058,0,12.898,2.169,16.772,5.486c1.934,1.666,3.427,3.592,4.472,5.856c1.037,2.255,1.643,4.849,1.651,7.93 C473.358,132.514,473.02,135.06,472.218,137.89z"></path>
                          </g>
                        </g>
                      </svg>
                    )} {product.type}
                 </div>
              </div>

              <div className="p-4 sm:p-6 bg-white">
                <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">{product.name}</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 text-center font-medium">
                  {product.id === '1' ? 'Versione con telecomando' : 'Versione con app'}
                </p>

                <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                  <div className="flex items-center text-gray-600">
                    <span className="text-xs sm:text-sm">📶 Controlli proporzionali</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-xs sm:text-sm">🎥 Camera FPV magnetica</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-xs sm:text-sm">💡 Luci anteriori e posteriori</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-xs sm:text-sm">🔋 Batteria a lunga durata</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    €{product.price}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onAddToCart(product, 'grigio');
                    }}
                    className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-professional flex items-center transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto justify-center"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Aggiungi al carrello</span>
                    <span className="sm:hidden">Aggiungi</span>
                  </button>
                </div>
              </div>
            </Link>
            ))
          )}
        </ScrollAnimatedElement>
      </div>
    </section>
  );
};

export default Shop;