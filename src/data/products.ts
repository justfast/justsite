export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  images: string[];
  features: string[];
  description: string;
  color: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'WLtoys 6401 RC',
    type: 'telecomando',
    price: 49,
    image: '/pista.jpg',
    images: [
      '/images/remote car/1.webp',
      '/images/remote car/2.webp',
      '/images/remote car/3.webp',
      '/images/remote car/4.webp',
      '/images/remote car/5.jpg',
      '/images/remote car/6.webp',
      '/images/remote car/7.PNG',
      '/images/remote car/8.webp',
      '/images/remote car/9.PNG',
      '/images/remote car/10.webp',
      '/images/remote car/11.PNG',
      '/images/remote car/13.webp',
      '/images/remote car/14.webp'
    ],
    features: ['Scala 1:64', 'Batteria ricaricabile', 'Controller 2.4GHz incluso', 'Fari LED'],
    description: 'Compatta, veloce e precisa. Una vera auto da gara in scala 1:64, perfetta per sfrecciare ovunque.',
    color: 'orange'
  },
  {
    id: '2',
    name: 'WLtoys 6401 Wi-Fi',
    type: 'app smartphone',
    price: 39,
    image: '/volante.jpg',
    images: [
      '/images/app car/1.webp',
      '/images/app car/2.webp',
      '/images/app car/3.webp',
      '/images/app car/4.webp',
      '/images/app car/5.jpg',
      '/images/app car/6.webp',
      '/images/app car/7.PNG',
      '/images/app car/8.webp',
      '/images/app car/9.PNG',
      '/images/app car/10.webp',
      '/images/app car/11.PNG',
      '/images/app car/12.PNG',
      '/images/app car/13.PNG',
      '/images/app car/14.PNG',
      '/images/app car/light wltoy image.jpg',
      '/images/app car/wltoy description foto.PNG'
    ],
    features: ['Controllo via app', 'Streaming in diretta', 'Camera onboard', 'Batteria integrata'],
    description: 'Controllala dal telefono, guardala correre in FPV, vivila ovunque. Perfetta per chi vuole vivere la corsa in prima persona.',
    color: 'purple'
  }
];