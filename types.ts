export enum Category {
  STICKERS = 'Adesivos',
  BOTTOMS = 'Bottoms & Pins',
  CAPS = 'Bonés',
  ACCESSORIES = 'Acessórios'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  link: string;
}