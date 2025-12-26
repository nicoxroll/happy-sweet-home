
import React from 'react';

export const Story: React.FC = () => {
  return (
    <section id="historia" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pastel-pink rounded-full opacity-30 blur-2xl"></div>
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/9220877/pexels-photo-9220877.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Hands creating artisanal goods" 
              className="w-full aspect-[4/5] object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
        
        <div className="order-1 lg:order-2 space-y-8">
          <span className="text-green-700 font-bold uppercase tracking-widest text-xs">Desde el corazón del taller</span>
          <h2 className="text-5xl serif leading-tight text-gray-900">Nuestra <span className="italic">Historia</span></h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>
              Happy Sweet Home comenzó como un pequeño sueño en una cocina llena de luz. Queríamos crear objetos que no solo fueran útiles, sino que transmitieran paz.
            </p>
            <p>
              Cada termo, taza y vaso es seleccionado y trabajado con un respeto profundo por los materiales. Creemos en lo lento, en lo bien hecho y en los momentos que se disfrutan sin prisa.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-8">
            <div>
              <p className="text-3xl serif text-green-700">100%</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Artesanal</p>
            </div>
            <div>
              <p className="text-3xl serif text-green-700">+5k</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Hogares Felices</p>
            </div>
            <div>
              <p className="text-3xl serif text-green-700">Eco</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Sostenible</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
