
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (view: 'landing' | 'collection') => void;
  onScrollToSection: (id: string) => void;
  currentView: 'landing' | 'collection' | 'product-detail' | 'checkout';
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onNavigate, onScrollToSection, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHeaderVisibleView = currentView === 'collection' || currentView === 'product-detail' || isScrolled;

  const headerBg = isHeaderVisibleView 
    ? 'bg-white/80 backdrop-blur-lg border-b border-gray-100 py-4' 
    : 'bg-transparent py-6';

  const textColor = isHeaderVisibleView ? 'text-gray-800' : 'text-white';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogoClick = () => {
    onNavigate('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCartClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onCartClick();
  };

  const handleMobileNav = (view: 'landing' | 'collection') => {
    onNavigate(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollClick = (id: string) => {
    onScrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="w-full px-8 md:px-12 flex items-center justify-between">
          <button 
            onClick={toggleMenu}
            className={`lg:hidden p-2 transition-colors ${textColor} hover:text-green-500`}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>

          <div className={`hidden lg:flex space-x-10 text-[10px] font-bold uppercase tracking-[0.3em] ${textColor}`}>
            <button 
              onClick={() => { onNavigate('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-green-500 transition-colors ${currentView === 'landing' ? 'text-green-600' : ''}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => { onNavigate('collection'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-green-500 transition-colors ${currentView === 'collection' ? 'text-green-600' : ''}`}
            >
              Colección
            </button>
            <button 
              onClick={() => handleScrollClick('historia')}
              className="hover:text-green-500 transition-colors"
            >
              Historia
            </button>
          </div>

          <button 
            onClick={handleLogoClick}
            className={`text-2xl font-semibold tracking-tight flex items-center gap-2 transition-colors ${textColor}`}
          >
            <span className="serif italic text-green-500">Happy</span>
            <span className="serif">Sweet Home</span>
          </button>

          <div className="flex items-center space-x-4">
            <button 
              onClick={handleCartClick}
              className={`p-2 transition-colors relative flex items-center group ${textColor}`}
            >
              <div className="relative">
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}
      >
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={toggleMenu}
        />
        <div 
          className={`absolute top-0 left-0 h-full w-[80%] max-w-sm bg-[#FDFBF7] shadow-2xl transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-12">
              <div className="text-xl font-semibold tracking-tight text-gray-800 flex items-center gap-2">
                <span className="serif italic text-green-600">Happy</span>
                <span className="serif">Sweet Home</span>
              </div>
              <button onClick={toggleMenu} className="p-2 text-gray-400 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-8 text-lg font-medium text-gray-600">
              <button 
                onClick={() => handleMobileNav('landing')}
                className="text-left hover:text-green-600 transition-colors uppercase text-sm tracking-[0.2em]"
              >
                Inicio
              </button>
              <button 
                onClick={() => handleMobileNav('collection')}
                className="text-left hover:text-green-600 transition-colors uppercase text-sm tracking-[0.2em]"
              >
                Colección
              </button>
              <button 
                onClick={() => handleScrollClick('historia')}
                className="text-left hover:text-green-600 transition-colors uppercase text-sm tracking-[0.2em]"
              >
                Historia
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
