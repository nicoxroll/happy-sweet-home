
import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onViewFeatured: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onViewFeatured }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Mountain cabin landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl space-y-8">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] leading-none text-white serif font-light">
          Calidez <br />
          <span className="italic text-green-300 font-normal">Natural</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed font-light">
          Diseñamos piezas únicas que transforman cada rincón en un refugio de paz y conexión.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <button 
            onClick={onViewFeatured}
            className="px-10 py-5 bg-white text-gray-900 rounded-full font-bold hover:bg-green-500 hover:text-white transition-all duration-500 shadow-2xl uppercase text-[10px] tracking-[0.3em]"
          >
            Ver Destacados
          </button>
          <button 
            onClick={onExploreCatalog}
            className="px-10 py-5 border border-white/30 text-white rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all duration-500 backdrop-blur-sm uppercase text-[10px] tracking-[0.3em]"
          >
            Explorar Catálogo
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={onViewFeatured}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce hover:text-white transition-colors"
      >
        <ArrowDown size={32} strokeWidth={1} />
      </button>
    </section>
  );
};
