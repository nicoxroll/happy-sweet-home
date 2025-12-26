
import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full flex flex-col">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-green-700" size={24} />
              <h2 className="text-xl font-semibold text-gray-900 serif">Tu Carrito</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                  <ShoppingBag size={32} className="text-gray-300" />
                </div>
                <p className="text-gray-500 font-light">Tu carrito está vacío.</p>
                <button 
                  onClick={onClose}
                  className="text-green-700 font-bold uppercase text-[10px] tracking-widest hover:underline"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <div 
                    className="w-24 h-24 rounded-3xl overflow-hidden bg-gray-50 flex-shrink-0 relative"
                    style={{ backgroundColor: item.color }}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 uppercase text-[10px] tracking-widest">{item.name}</h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.category}</p>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center border border-gray-100 rounded-full bg-gray-50 p-1">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1.5 hover:text-green-600 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1.5 hover:text-green-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-serif text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-8 border-t border-gray-100 bg-gray-50/50 space-y-6">
              <div className="flex justify-between items-center text-gray-900">
                <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">Subtotal</span>
                <span className="text-3xl font-serif font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest leading-loose">Envío gratuito en compras superiores a $100</p>
              <button 
                onClick={onCheckout}
                className="w-full bg-gray-900 text-white py-6 rounded-full font-bold flex items-center justify-center gap-4 group hover:bg-green-800 transition-all shadow-xl shadow-gray-200 uppercase text-[10px] tracking-[0.4em]"
              >
                Finalizar Compra
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
