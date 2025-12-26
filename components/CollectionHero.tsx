
import React from 'react';

export const CollectionHero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/4064840/pexels-photo-4064840.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Artisanal ceramics workshop" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#FDFBF7]/80 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full px-8 md:px-20 grid lg:grid-cols-2 items-center">
        <div className="max-w-2xl space-y-8">
          <div className="flex items-center gap-4 text-green-700 font-bold tracking-[0.5em] text-[10px] uppercase">
            <span className="w-12 h-[1px] bg-green-700"></span>
            Nuestra Curaduría
          </div>
          <h1 className="text-7xl md:text-9xl serif text-gray-900 leading-[0.9]">
            La <br />
            <span className="italic text-green-700">Colección</span>
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-lg">
            Cada pieza en nuestro catálogo ha sido seleccionada por su alma única, su proceso artesanal y su capacidad de traer calma a tu día a día.
          </p>
        </div>
        
        <div className="hidden lg:flex justify-end">
            <div className="relative w-[400px] h-[500px] rounded-[10rem] overflow-hidden shadow-2xl rotate-3">
                 <img 
                    src="https://images.pexels.com/photos/9220877/pexels-photo-9220877.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Artisanal hands" 
                    className="w-full h-full object-cover"
                 />
            </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFBF7] to-transparent"></div>
    </section>
  );
};
