
import React from 'react';
import { Product } from '../types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isFeatured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isFeatured }) => {
  return (
    <div className={`group relative h-[600px] overflow-hidden bg-white transition-all duration-700 ease-in-out hover:z-20 ${isFeatured ? 'md:col-span-2' : ''}`}>
      {/* Background Color/Base */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-110" 
        style={{ backgroundColor: product.color }}
      ></div>
      
      {/* Product Image */}
      <img 
        src={product.image} 
        alt={product.name} 
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 transition-all duration-1000 ease-in-out group-hover:scale-125 group-hover:opacity-40 grayscale-[10%] group-hover:grayscale-0"
      />

      {/* Minimal Hover Information - Transparent, no white background */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-12 group-hover:translate-y-0">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-green-800 font-black mb-1 block drop-shadow-sm">
              {product.category}
            </span>
            <h3 className="text-4xl md:text-5xl serif text-gray-900 leading-none drop-shadow-sm">{product.name}</h3>
            <p className="text-gray-800 text-sm leading-relaxed font-normal max-w-sm drop-shadow-sm line-clamp-2">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between gap-6 pt-4">
            <span className="text-3xl font-serif text-gray-900">${product.price.toFixed(2)}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="flex-1 bg-gray-900 text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition-all duration-300 uppercase text-[10px] tracking-widest shadow-2xl"
            >
              <ShoppingBag size={18} />
              Añadir
            </button>
          </div>
        </div>
      </div>
      
      {/* Always Visible Tag (Floating) */}
      <div className="absolute top-8 left-8 group-hover:opacity-0 transition-opacity duration-500">
         <div className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-800 font-bold">{product.name}</span>
         </div>
      </div>

      {/* View Detail Hint */}
      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
         <span className="text-[10px] uppercase tracking-widest text-gray-900 font-bold bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm border border-white/50">Ver Detalle</span>
      </div>
    </div>
  );
};
