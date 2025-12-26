
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutViewProps {
  items: CartItem[];
  onBack: () => void;
  onSuccess: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ items, onBack, onSuccess }) => {
  const [step, setStep] = useState(1);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.00;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else onSuccess();
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-gray-400 hover:text-green-700 transition-colors uppercase text-[10px] tracking-widest font-bold mb-12"
        >
          <ArrowLeft size={16} /> Volver al Carrito
        </button>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Form Side */}
          <div className="lg:col-span-3 space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-5xl serif text-gray-900">Finalizar <span className="italic text-green-700">Compra</span></h2>
              <div className="flex items-center gap-4">
                {[1, 2].map(i => (
                  <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${step >= i ? 'bg-green-600 scale-125' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {step === 1 ? (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                  <div className="flex items-center gap-4 text-gray-900 font-bold uppercase text-[10px] tracking-widest mb-6">
                    <Truck size={18} className="text-green-600" /> Información de Envío
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <input required type="text" placeholder="Nombre" className="bg-white px-8 py-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-100 w-full" />
                    <input required type="text" placeholder="Apellido" className="bg-white px-8 py-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-100 w-full" />
                  </div>
                  <input required type="email" placeholder="Correo Electrónico" className="bg-white px-8 py-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-100 w-full" />
                  <input required type="text" placeholder="Dirección de Envío" className="bg-white px-8 py-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-100 w-full" />
                  <div className="grid md:grid-cols-3 gap-6">
                    <input required type="text" placeholder="Ciudad" className="bg-white px-8 py-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-100 w-full" />
                    <input required type="text" placeholder="Código Postal" className="bg-white px-8 py-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-100 w-full" />
                    <input required type="text" placeholder="Teléfono" className="bg-white px-8 py-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-100 w-full" />
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                  <div className="flex items-center gap-4 text-gray-900 font-bold uppercase text-[10px] tracking-widest mb-6">
                    <CreditCard size={18} className="text-green-600" /> Método de Pago
                  </div>
                  <div className="bg-white p-10 rounded-[3rem] border border-gray-100 space-y-8">
                    <div className="flex justify-between items-center pb-6 border-b border-gray-50">
                      <span className="font-bold text-sm">Tarjeta de Crédito / Débito</span>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-gray-100 rounded" />
                        <div className="w-8 h-5 bg-gray-100 rounded" />
                      </div>
                    </div>
                    <input required type="text" placeholder="Número de Tarjeta" className="bg-gray-50 px-8 py-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-100 w-full" />
                    <div className="grid grid-cols-2 gap-6">
                      <input required type="text" placeholder="MM/AA" className="bg-gray-50 px-8 py-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-100 w-full" />
                      <input required type="text" placeholder="CVV" className="bg-gray-50 px-8 py-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-100 w-full" />
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-gray-900 text-white py-6 rounded-full font-bold flex items-center justify-center gap-4 hover:bg-green-700 transition-all shadow-3xl uppercase text-[10px] tracking-[0.4em]"
              >
                {step === 1 ? 'Siguiente Paso' : 'Confirmar Pedido'}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Order Summary Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-gray-50 space-y-8 sticky top-32">
              <h3 className="text-2xl serif text-gray-900 pb-6 border-b border-gray-50">Resumen del <span className="italic">Pedido</span></h3>
              
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0" style={{ backgroundColor: item.color }}>
                      <img src={item.image} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-xs uppercase tracking-widest text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400">Cant: {item.quantity}</p>
                    </div>
                    <span className="font-serif text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-50 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Envío</span>
                  <span className="text-gray-900">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-serif text-gray-900 pt-4 border-t border-gray-50">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-3xl flex gap-4">
                 <ShieldCheck className="text-green-600 flex-shrink-0" />
                 <p className="text-[10px] text-green-800 leading-relaxed font-bold uppercase tracking-widest">Pago 100% Seguro. Tus datos están protegidos por encriptación de grado bancario.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
