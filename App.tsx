
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CollectionHero } from './components/CollectionHero';
import { Story } from './components/Story';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { LeavesBackground } from './components/LeavesBackground';
import { ProductDetails } from './components/ProductDetails';
import { CheckoutView } from './components/CheckoutView';
import { ChatWidget } from './components/ChatWidget';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, ArrowRight, Grid, Sparkles, Filter, CheckCircle2, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'collection' | 'checkout' | 'product-detail'>('landing');
  const [previousView, setPreviousView] = useState<'landing' | 'collection'>('landing');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const categories = ['Todos', 'Termos', 'Tazas', 'Vasos', 'Artesanal'];

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleProductClick = (product: Product) => {
    if (view === 'landing' || view === 'collection') {
      setPreviousView(view);
    }
    setSelectedProduct(product);
    setView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (view !== 'landing') {
      setView('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = activeCategory === 'Todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const featuredProducts = PRODUCTS.slice(0, 3);

  useEffect(() => {
    // Only scroll to top if view changes to something other than detail (detail already handled in click)
    if (view !== 'product-detail' && view !== 'landing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [view]);

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-8 animate-in zoom-in duration-700">
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
            <CheckCircle2 size={64} />
          </div>
          <h2 className="text-5xl serif text-gray-900">¡Pedido <span className="italic text-green-700">Completado!</span></h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            Gracias por elegir Happy Sweet Home. Te hemos enviado un correo con los detalles de tu pedido. ¡Tu hogar está a punto de ser más dulce!
          </p>
          <button 
            onClick={() => {
              setOrderSuccess(false);
              setView('landing');
              setCart([]);
            }}
            className="w-full bg-gray-900 text-white py-6 rounded-full font-bold uppercase text-[10px] tracking-[0.4em] shadow-3xl hover:bg-green-700 transition-all"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#FDFBF7] selection:bg-green-100 selection:text-green-900 scroll-smooth">
      <LeavesBackground />
      
      {view !== 'checkout' && (
        <Header 
          cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
          onCartClick={() => setIsCartOpen(true)} 
          onNavigate={(v) => {
             if (v === 'landing') setView('landing');
             else setView('collection');
          }}
          onScrollToSection={scrollToSection}
          currentView={view as any}
        />
      )}

      <main className="transition-opacity duration-700 ease-in-out">
        {view === 'landing' ? (
          <>
            <Hero 
              onExploreCatalog={() => setView('collection')}
              onViewFeatured={() => scrollToSection('destacados')}
            />
            <Story />
            <section id="destacados" className="w-full bg-white relative overflow-hidden">
              <div className="px-8 md:px-12 py-20 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100">
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-green-600 font-bold tracking-[0.4em] text-[10px] uppercase">
                    <Sparkles size={14} />
                    Selección Premium
                  </div>
                  <h2 className="text-5xl md:text-7xl serif text-gray-900">Nuestros <span className="italic text-green-700">Favoritos</span></h2>
                </div>
                <button 
                  onClick={() => setView('collection')}
                  className="group flex items-center gap-4 px-12 py-6 bg-gray-900 text-white rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-green-700 transition-all shadow-2xl"
                >
                  Ir a la Colección
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row w-full min-h-[600px] overflow-hidden">
                {featuredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => handleProductClick(product)}
                    className="flex-1 transition-all duration-1000 ease-in-out lg:hover:flex-[1.5] border-r border-gray-50 last:border-0 cursor-pointer"
                  >
                    <ProductCard 
                      product={product} 
                      onAddToCart={(p) => addToCart(p, 1)}
                    />
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : view === 'collection' ? (
          <>
            <CollectionHero />
            <section className="py-24 bg-[#FDFBF7]">
              <div className="px-8 md:px-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-10">
                 <div className="flex items-center gap-4 text-gray-400">
                    <Filter size={18} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Filtrar por</span>
                 </div>
                 <div className="flex flex-wrap justify-center gap-3">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 ${
                          activeCategory === cat 
                            ? 'bg-gray-900 text-white shadow-2xl' 
                            : 'bg-white text-gray-400 hover:text-green-700 hover:shadow-lg border border-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
                {filteredProducts.map((product) => (
                  <div 
                    key={`${product.id}-${activeCategory}`} 
                    onClick={() => handleProductClick(product)} 
                    className="cursor-pointer animate-in fade-in zoom-in-95 duration-500"
                  >
                    <ProductCard 
                      product={product} 
                      onAddToCart={(p) => addToCart(p, 1)}
                    />
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : view === 'product-detail' ? (
           <div className="pt-24 min-h-screen bg-white">
             <div className="px-8 md:px-12 py-8">
               <button 
                 onClick={() => setView(previousView)}
                 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-green-700 transition-colors"
               >
                 <ArrowLeft size={14} /> Volver a {previousView === 'landing' ? 'Inicio' : 'Colección'}
               </button>
             </div>
             <ProductDetails 
                product={selectedProduct}
                onClose={() => setView(previousView)}
                onAddToCart={addToCart}
                onSelectRelated={(p) => { setSelectedProduct(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                isView={true}
              />
           </div>
        ) : (
          <CheckoutView 
            items={cart} 
            onBack={() => setView('landing')} 
            onSuccess={() => setOrderSuccess(true)} 
          />
        )}

        {view !== 'checkout' && (
          <>
            <section className="py-24 px-6 md:px-12">
              <div className="w-full min-h-[500px] rounded-[5rem] bg-gray-900 p-12 lg:p-32 relative overflow-hidden flex items-center text-center md:text-left shadow-2xl">
                <div className="absolute inset-0 opacity-40">
                   <img src="https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="background" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-3xl space-y-10">
                  <h3 className="text-5xl md:text-8xl serif text-white leading-tight">Lleva la <span className="italic">esencia</span> de la naturaleza a tu casa.</h3>
                  {view === 'landing' && (
                    <button 
                      onClick={() => setView('collection')}
                      className="bg-green-500 text-white px-12 py-6 rounded-full uppercase text-[10px] tracking-[0.4em] font-bold hover:bg-white hover:text-gray-900 transition-all duration-500 flex items-center gap-4 shadow-3xl mx-auto md:mx-0"
                    >
                      Explorar Catálogo <ArrowRight size={20} />
                    </button>
                  )}
                </div>
              </div>
            </section>
            <section className="max-w-7xl mx-auto px-6 py-32">
              <div className="bg-white rounded-[4rem] p-12 lg:p-24 shadow-sm border border-gray-50 relative overflow-hidden">
                 <div className="absolute bottom-0 right-0 w-full lg:w-1/2 h-1/2 lg:h-full opacity-10 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600" alt="leaf" className="object-cover w-full h-full grayscale" />
                 </div>
                 <div className="max-w-xl relative z-10">
                    <h3 className="text-5xl text-gray-900 serif mb-8">Únete a nuestra familia</h3>
                    <p className="text-gray-600 mb-12 text-xl leading-relaxed font-light">Recibe inspiración, nuevas colecciones y consejos para un hogar más dulce directamente en tu bandeja de entrada.</p>
                    <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                      <input type="email" placeholder="Tu correo electrónico" className="flex-1 px-10 py-5 bg-gray-50 rounded-full border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all text-lg" />
                      <button className="px-12 py-5 bg-gray-900 text-white rounded-full font-bold hover:bg-green-600 transition-all uppercase text-[10px] tracking-[0.3em]">Suscribirse</button>
                    </form>
                 </div>
              </div>
            </section>
          </>
        )}
      </main>

      {view !== 'checkout' && (
        <footer className="bg-white border-t border-gray-100 pt-32 pb-12 px-12">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
              <div className="space-y-8">
                <div className="text-3xl font-semibold tracking-tight text-gray-800 flex items-center gap-2">
                  <span className="serif text-green-600 italic">Happy</span>
                  <span className="serif">Sweet Home</span>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed font-light">Creando espacios de serenidad a través de objetos cotidianos con alma artesanal. Inspirados en la calma de la montaña.</p>
                <div className="flex space-x-6">
                  <a href="#" className="p-3 bg-gray-50 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"><Instagram size={22} /></a>
                  <a href="#" className="p-3 bg-gray-50 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"><Facebook size={22} /></a>
                  <a href="#" className="p-3 bg-gray-50 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"><Twitter size={22} /></a>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 mb-10">Explorar</h4>
                <ul className="space-y-6 text-gray-400 text-lg font-light">
                  <li><button onClick={() => { setView('collection'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-green-600 transition-colors">Nueva Colección</button></li>
                  <li><button onClick={() => { setView('collection'); setActiveCategory('Termos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-green-600 transition-colors">Termos & Vasos</button></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Cuidado de Piezas</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Regalos</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 mb-10">Ayuda</h4>
                <ul className="space-y-6 text-gray-400 text-lg font-light">
                  <li><a href="#" className="hover:text-green-600 transition-colors">Envíos & Devoluciones</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Preguntas Frecuentes</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Términos de Servicio</a></li>
                  <li><a href="#" className="hover:text-green-600 transition-colors">Contacto</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 mb-10">Ubicación</h4>
                <ul className="space-y-6 text-gray-400 text-lg font-light">
                  <li className="flex items-start gap-4"><MapPin size={22} className="text-green-600 flex-shrink-0" /> <span>Buenos Aires, Argentina <br/> <span className="text-sm opacity-60 italic">Showroom en Palermo</span></span></li>
                  <li className="flex items-center gap-4"><Mail size={22} className="text-green-600" /> <span>hola@happysweethome.com</span></li>
                  <li className="flex items-center gap-4"><Phone size={22} className="text-green-600" /> <span>+54 11 1234 5678</span></li>
                </ul>
              </div>
            </div>
            <div className="pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-gray-300 text-sm font-light uppercase tracking-widest">© 2024 Happy Sweet Home. Hecho con amor.</p>
              <div className="flex gap-10">
                <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 opacity-40 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6 opacity-40 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                <img src="https://img.icons8.com/color/48/paypal.png" alt="Paypal" className="h-6 opacity-40 grayscale hover:grayscale-0 transition-all cursor-pointer" />
              </div>
            </div>
          </div>
        </footer>
      )}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setView('checkout');
        }}
      />

      <ChatWidget />
    </div>
  );
};

export default App;
