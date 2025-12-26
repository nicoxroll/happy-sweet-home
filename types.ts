
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Termos' | 'Tazas' | 'Vasos' | 'Artesanal';
  image: string;
  description: string;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}
