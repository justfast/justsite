import React from 'react';
import { Gauge } from 'lucide-react';

// Custom FPV Vision SVG Component
const FPVVision = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 32 32" 
    xmlSpace="preserve" 
    fill="currentColor"
  >
    <style type="text/css">
      {`.st0{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}`}
    </style>
    <path className="st0" d="M18.9,9.1c-1-0.2-2,0-2.8,0.4c-0.7,0.4-1.6,0.5-2.4,0.2c-0.1,0-0.2-0.1-0.3-0.1l-8-1.3C4.1,8.2,3,9.1,3,10.2 v5.9c0,1.2,1.1,2,2.3,1.9l8-1.3c0.1,0,0.2,0,0.3-0.1c0.9-0.3,1.9-0.3,2.9,0c0.5,0.2,1,0.3,1.5,0.3c2.5,0,4.5-2.3,3.9-4.9 C21.6,10.6,20.4,9.4,18.9,9.1z" />
    <path className="st0" d="M9.5,9c1.3-3.6,4.7-6.2,8.8-6C23,3.2,27,7.2,27,11.9c0,1.8-0.5,3.5-1.4,4.9c-1.8,2.8-2.5,6.2-1.6,9.4l1,3.8H13 l0.7-3.9c0.2-0.9-0.7-1.6-1.5-1.3l0,0c-2,0.6-4-1-3.8-3.1L8.6,18H7.5c-0.3,0-0.5-0.1-0.7-0.2" />
    <path className="st0" d="M18,20.3c0,1.6-1,3.1-2.6,3.6l-3.3,0.9" />
    <circle className="st0" cx="18" cy="13" r="1" />
  </svg>
);

// Custom Total Experience SVG Component
const TotalExperience = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 32.00 32.00" 
    enableBackground="new 0 0 32 32" 
    version="1.1" 
    xmlSpace="preserve" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    fill="currentColor" 
    stroke="currentColor" 
    strokeWidth="1.216"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g id="car_x2C__salesman_x2C__service_x2C__manager_x2C__person">
        <g id="XMLID_339_">
          <path d="M12.5,27.5v2c0,0.553-0.447,1-1,1h-2" fill="none" id="XMLID_336_" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
           <path d="M29.5,27.5v2c0,0.553-0.447,1-1,1h-1c-0.553,0-1-0.447-1-1v-2" fill="none" id="XMLID_6229_" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
           <line fill="none" id="XMLID_5901_" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="30.5" x2="11.5" y1="27.5" y2="27.5"></line>
           <path d="M11.496,20.926c1.715-0.323,4.285-0.426,8.004-0.426c8.5,0,11,0.583,11,3v1.188" fill="none" id="XMLID_5891_" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
           <path d="M26.5,25.5v-1c0-0.55,0.45-1,1-1h3v2H26.5z" fill="none" id="XMLID_351_" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
           <path d="M11,23.5h0.5c0.55,0,1,0.45,1,1v1h-3" fill="none" id="XMLID_337_" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
           <path d="M14.5,25.5L14.5,25.5c0-1.104,0.896-2,2-2h6c1.104,0,2,0.896,2,2l0,0" fill="none" id="XMLID_5872_" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
           <path d="M28.569,21.206L26.82,15.95c-0.181-0.53-0.761-1.02-1.311-1.09c-1.189-0.15-3.37-0.36-6.01-0.36s-4.82,0.21-6.01,0.36 c-0.55,0.07-1.13,0.56-1.311,1.09L11.331,18.5" fill="none" id="XMLID_341_" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
           <path d="M9.5,30.5v-16l0,0c0.739,0,1.385-0.401,1.731-0.998c0.171-0.295,0.269-0.637,0.269-1.002V11c0-1.375-1.125-2.5-2.5-2.5H4 c-1.381,0-2.5,1.119-2.5,2.5v1.5c0,1.104,0.896,2,2,2l0,0v5l-2,11" fill="none" id="XMLID_6327_" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
           <circle cx="6.5" cy="4" fill="none" id="XMLID_6326_" r="2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></circle>
           <g id="XMLID_6270_">
             <path d="M9.5,13v-0.319c0-0.618-0.555-1.089-1.164-0.986l-3.672,0.611C4.055,12.407,3.5,11.938,3.5,11.319" fill="none" id="XMLID_6276_" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
             <polyline fill="none" id="XMLID_6274_" points="7.5,30.5 6.5,19 3.5,30.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></polyline>
             <line fill="none" id="XMLID_6271_" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="5.5" x2="9.5" y1="14.5" y2="14.5"></line>
           </g>
        </g>
      </g>
    </g>
  </svg>
);

// Custom Steering Wheel SVG Component
const SteeringWheel = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    fill="currentColor" 
    viewBox="0 0 364.37 364.37" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M167.743,206.508c-4.232-2.714-7.792-6.555-10.333-11.157c-1.797-3.256-5.313-4.963-8.794-4.606 c-34.627-1.104-68.8-3.95-101.57-8.458c-4.929-0.675-9.465,2.765-10.143,7.689s2.765,9.465,7.689,10.143 c0.76,0.104,1.518,0.208,2.279,0.311c7.689,57.582,51.16,104.014,107.991,115.54v1.824c0,4.971,4.029,9,9,9s9-4.029,9-9V214.856 c0.002-0.123,0.002-0.245-0.001-0.368C172.807,210.968,170.731,207.938,167.743,206.508z M154.863,297.545 c-46.026-10.825-81.292-48.21-89.426-94.799c25.793,2.957,52.289,4.926,79.063,5.871c2.907,4.15,6.405,7.805,10.363,10.827V297.545z M146.494,97.526c2.375,4.367,0.759,9.832-3.608,12.206c-11.066,6.017-20.763,14.641-28.042,24.94 c-1.753,2.48-4.534,3.806-7.357,3.806c-1.796,0-3.609-0.536-5.187-1.651c-4.06-2.869-5.024-8.485-2.155-12.544 c8.862-12.538,20.668-23.038,34.144-30.364C138.655,91.543,144.119,93.16,146.494,97.526z M227.107,262.319 c-2.847-4.074-1.853-9.686,2.221-12.533c9.68-6.765,17.958-15.715,23.939-25.883c2.521-4.285,8.037-5.714,12.321-3.194 c4.284,2.521,5.714,8.037,3.194,12.321c-7.282,12.379-17.36,23.275-29.143,31.51c-1.57,1.097-3.368,1.624-5.148,1.624 C231.652,266.165,228.857,264.824,227.107,262.319z M328.518,189.77c-0.686-4.923-5.235-8.356-10.156-7.671 c-34.405,4.797-70.109,7.931-103.262,9.064c-0.351,0.006-0.7,0.032-1.046,0.078c-1.294,0.17-2.499,0.613-3.555,1.269 c-1.055,0.652-1.987,1.53-2.716,2.61c-0.188,0.277-0.361,0.566-0.518,0.865c-2.103,3.812-5.098,7.146-8.677,9.657 c-0.335,0.225-0.655,0.472-0.957,0.738c-0.765,0.674-1.393,1.457-1.875,2.309c-0.659,1.161-1.067,2.483-1.151,3.893 c-0.014,0.223-0.019,0.447-0.016,0.671v104.542c0,4.971,4.029,9,9,9s9-4.029,9-9v-2.489c27.479-6.239,51.985-20.627,71.005-41.717 c18.616-20.641,30.281-45.86,33.91-73.201c1.116-0.152,2.231-0.306,3.344-0.461C325.77,199.24,329.204,194.693,328.518,189.77z M212.587,296.768v-79.245c2.919-2.517,5.527-5.394,7.744-8.54c25.398-1,52.141-3.128,78.589-6.24 C290.961,247.727,256.863,285.004,212.587,296.768z M182.186,0C81.729,0,0,81.728,0,182.185 c0,100.457,81.728,182.184,182.185,182.184c100.456,0,182.183-81.728,182.183-182.184C364.369,81.728,282.642,0,182.186,0z M182.186,346.369C91.654,346.369,18,272.716,18,182.185C18,91.653,91.654,18,182.186,18c90.531,0,164.183,73.653,164.183,164.185 C346.369,272.716,272.716,346.369,182.186,346.369z M207.08,167.786c0.208,0.396,0.445,0.773,0.708,1.131 c0.764,1.045,1.725,1.886,2.801,2.498c1.108,0.633,2.361,1.037,3.692,1.148c0.431,0.037,0.866,0.044,1.299,0.018 c40.197-1.529,75.106-4.605,103.764-9.145c4.909-0.778,8.259-5.388,7.481-10.297s-5.384-8.261-10.297-7.481 c-0.88,0.139-1.764,0.277-2.657,0.414c-7.522-27.419-23.693-52.158-45.972-70.151c-24.16-19.512-54.601-30.258-85.715-30.258 c-61.79,0-115.539,41.168-131.709,100.469c-0.772-0.121-1.545-0.243-2.315-0.365c-4.905-0.786-9.522,2.563-10.305,7.471 c-0.783,4.909,2.562,9.522,7.471,10.305c32.668,5.208,67.192,8.5,102.611,9.784c0.111,0.004,0.221,0.006,0.332,0.006 c0.878,0,1.728-0.126,2.533-0.363c2.485-0.477,4.756-1.994,6.114-4.36c5.159-8.989,14.937-14.755,25.519-15.048 C192.57,153.285,202.022,158.727,207.08,167.786z M181.937,135.569c-14.989,0.415-28.995,7.8-37.706,19.601 c-25.92-1.064-51.31-3.228-75.781-6.452c14.736-50.314,60.842-85.055,113.736-85.055c53.187,0,98.923,34.539,113.685,84.872 c-22.307,2.719-47.766,4.684-76.014,5.862C211.077,142.253,197.01,135.149,181.937,135.569z" />
  </svg>
);
import TypingText from './TypingText';
import ScrollAnimatedElement from './ScrollAnimatedElement';

const Technology: React.FC = () => {
  const features = [
    {
      icon: <SteeringWheel className="h-8 w-8" />,
      title: 'Volante Reale',
      description: 'Non premi tasti. Giri un volante vero con feedback tattile.'
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: 'Marce Simulate',
      description: 'Cambi marcia come su una vera auto da corsa.'
    },
    {
      icon: <FPVVision className="h-8 w-8" />,
      title: 'Visuale FPV',
      description: 'Vedi attraverso gli occhi della macchina in tempo reale.'
    },
    {
      icon: <TotalExperience className="h-11 w-11" />,
      title: 'Esperienza Totale',
      description: 'volanti, macchine, tv, e pista'
    }
  ];

  return (
    <section id="technology" className="py-20 bg-black relative gradient-elegant">
      {/* Background image */}
      <div className="absolute inset-0 opacity-15">
        <img 
          src="/images/sfondi/22.jpg" 
          alt="Background JustFast" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-600/10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedElement className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Non premi tasti. <span className="text-red-600">Giri un volante.</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mb-3 sm:mb-4">
            Cambi marcia. Vivi ogni curva.
          </p>
          <p className="text-sm sm:text-lg text-gray-400 max-w-3xl mx-auto">
            Questa non è solo RC. È esperienza di guida.
          </p>
        </ScrollAnimatedElement>

        <ScrollAnimatedElement 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 px-4"
          translateDistance={70}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-4 sm:p-6 glass-effect shadow-professional transition-professional rounded-xl transform hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(220,38,38,0.3), inset 0 1px 0 rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
              }}
            >
              <div className="text-red-600 mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform">
                <div className="w-6 h-6 sm:w-8 sm:h-8">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
            </div>
          ))}
        </ScrollAnimatedElement>

        <ScrollAnimatedElement 
          className="glass-effect shadow-professional transition-professional rounded-2xl p-4 sm:p-6 lg:p-8 text-center mx-4"
          translateDistance={50}
          style={{
            background: 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0.05) 100%)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(220,38,38,0.3)',
            boxShadow: '0 12px 40px rgba(220,38,38,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            💡 Solo con JustFast puoi guidare davvero
          </h3>
          <p className="text-sm sm:text-lg text-gray-300 mb-3 sm:mb-4">
            Volante fisico, cambiata simulata e visuale in prima persona su tv.
          </p>
          <p className="text-sm sm:text-base text-red-400 font-semibold">
            Una tecnologia esclusiva, disponibile solo durante i nostri eventi.
          </p>
        </ScrollAnimatedElement>
      </div>
    </section>
  );
};

export default Technology;