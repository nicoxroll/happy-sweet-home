
import React, { useEffect, useState } from 'react';
import { ShoppingBag, Minus, Plus, Heart, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectRelated: (product: Product) => void;
  isView?: boolean;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  onAddToCart,
  onSelectRelated,
  isView
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setActiveImg(0);
    }
  }, [product]);

  if (!product) return null;

  const images = [
    product.image,
    "https://images.pexels.com/photos/6065886/pexels-photo-6065886.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4064840/pexels-photo-4064840.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const related = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className={`w-full max-w-7xl mx-auto overflow-hidden bg-white md:rounded-[4rem] mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 ${isView ? 'shadow-none' : 'shadow-3xl'}`}>
      <div className="grid lg:grid-cols-2 min-h-full">
        {/* Gallery Section */}
        <div className="relative h-[60vh] lg:h-full bg-white flex flex-col min-h-[500px]">
          <div className="flex-1 overflow-hidden relative">
            <div 
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{ backgroundColor: product.color, opacity: 0.2 }}
            />
            <img 
              src={images[activeImg]} 
              alt={product.name} 
              className="w-full h-full object-cover mix-blend-multiply animate-fade-in"
            />
          </div>
          <div className="p-6 flex gap-4 overflow-x-auto bg-gray-50/30 backdrop-blur-sm border-t border-gray-100">
            {images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImg === i ? 'border-green-500 scale-95 shadow-inner' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-green-700 font-bold tracking-[0.4em] text-[10px] uppercase">
              <Sparkles size={14} />
              {product.category}
            </div>
            <h2 className="text-5xl md:text-7xl serif text-gray-900 leading-tight">
              {product.name.split(' ')[0]} <br />
              <span className="italic text-green-700">{product.name.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-3xl font-serif text-gray-900">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed font-light">
            {product.description} Esta pieza exclusiva ha sido diseñada para elevar tu rutina diaria. Cada detalle ha sido cuidado por artesanos expertos para garantizar durabilidad y belleza, utilizando procesos que respetan el ritmo de la naturaleza.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center bg-gray-50 p-1.5 rounded-full border border-gray-100 w-full sm:w-auto">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-4 hover:bg-white rounded-full transition-all text-gray-400 hover:text-green-600"
              >
                <Minus size={20} />
              </button>
              <span className="w-12 text-center text-xl font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="p-4 hover:bg-white rounded-full transition-all text-gray-400 hover:text-green-600"
              >
                <Plus size={20} />
              </button>
            </div>

            <button 
              onClick={() => {
                onAddToCart(product, quantity);
              }}
              className="flex-1 w-full bg-gray-900 text-white py-6 rounded-full font-bold flex items-center justify-center gap-4 hover:bg-green-700 transition-all shadow-3xl uppercase text-[10px] tracking-widest"
            >
              <ShoppingBag size={20} />
              Añadir al Carrito
            </button>
            
            <button className="p-6 border border-gray-100 rounded-full hover:bg-pink-50 hover:text-pink-500 transition-all group">
              <Heart size={24} className="group-hover:fill-pink-500" />
            </button>
          </div>

          {/* Related Section */}
          <div className="pt-16 border-t border-gray-100">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-8">También te podría gustar</h4>
            <div className="grid grid-cols-3 gap-6">
              {related.map(p => (
                <button 
                  key={p.id}
                  onClick={() => onSelectRelated(p)}
                  className="group text-left space-y-3"
                >
                  <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 relative">
                     <div className="absolute inset-0 group-hover:bg-green-500/10 transition-colors" />
                     <img src={p.image} className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest truncate">{p.name}</p>
                  <p className="font-serif text-sm text-gray-500">${p.price.toFixed(2)}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
