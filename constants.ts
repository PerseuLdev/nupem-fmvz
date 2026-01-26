import { Product, Category, InstagramPost } from './types';

export const PRODUCTS: Product[] = [
  // Adesivos
  {
    id: '1',
    name: 'Adesivo Soja Ouro',
    description: 'Adesivo de alta durabilidade com arte estilizada de soja.',
    price: 15.90,
    category: Category.STICKERS,
    imageUrl: 'https://picsum.photos/400/400?random=1',
    isNew: true,
  },
  {
    id: '2',
    name: 'Kit Adesivos Maquinário',
    description: 'Pack com 5 adesivos de tratores e colheitadeiras.',
    price: 39.90,
    category: Category.STICKERS,
    imageUrl: 'https://picsum.photos/400/400?random=2',
  },
  {
    id: '3',
    name: 'Adesivo "Agro é Pop"',
    description: 'Adesivo vinílico resistente a sol e chuva.',
    price: 12.00,
    category: Category.STICKERS,
    imageUrl: 'https://picsum.photos/400/400?random=3',
  },
  
  // Bottoms
  {
    id: '4',
    name: 'Bottom Brasão Agronomia',
    description: 'Bottom metálico com acabamento premium.',
    price: 18.50,
    category: Category.BOTTOMS,
    imageUrl: 'https://picsum.photos/400/400?random=4',
  },
  {
    id: '5',
    name: 'Pin Tratorista',
    description: 'Pin esmaltado formato trator verde.',
    price: 24.90,
    category: Category.BOTTOMS,
    imageUrl: 'https://picsum.photos/400/400?random=5',
  },
  
  // Bonés
  {
    id: '6',
    name: 'Boné Trucker NUPEM',
    description: 'Boné estilo americano com tela e bordado em relevo.',
    price: 89.90,
    category: Category.CAPS,
    imageUrl: 'https://picsum.photos/400/400?random=6',
    isNew: true,
  },
  {
    id: '7',
    name: 'Boné Safra 2024',
    description: 'Edição limitada comemorativa da safra anual.',
    price: 95.00,
    category: Category.CAPS,
    imageUrl: 'https://picsum.photos/400/400?random=7',
  },
  {
    id: '9',
    name: 'Boné Rustic Leather',
    description: 'Design exclusivo em tons terrosos com patch em couro legítimo.',
    price: 110.00,
    category: Category.CAPS,
    imageUrl: 'https://picsum.photos/400/400?random=15',
    isNew: true,
  },

  // Acessórios
  {
    id: '8',
    name: 'Chaveiro Couro Legítimo',
    description: 'Chaveiro rústico com logo NUPEM gravado.',
    price: 35.00,
    category: Category.ACCESSORIES,
    imageUrl: 'https://picsum.photos/400/400?random=8',
  },
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig1',
    imageUrl: 'https://picsum.photos/600/600?random=10',
    likes: 124,
    comments: 12,
    link: 'https://www.instagram.com/nupemunesp'
  },
  {
    id: 'ig2',
    imageUrl: 'https://picsum.photos/600/600?random=11',
    likes: 89,
    comments: 5,
    link: 'https://www.instagram.com/nupemunesp'
  },
  {
    id: 'ig3',
    imageUrl: 'https://picsum.photos/600/600?random=12',
    likes: 256,
    comments: 24,
    link: 'https://www.instagram.com/nupemunesp'
  },
  {
    id: 'ig4',
    imageUrl: 'https://picsum.photos/600/600?random=13',
    likes: 150,
    comments: 8,
    link: 'https://www.instagram.com/nupemunesp'
  }
];