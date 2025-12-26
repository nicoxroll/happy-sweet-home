
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Minus, Leaf } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { PRODUCTS } from '../constants';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente de **Happy Sweet Home**. ¿En qué puedo ayudarte hoy? \n\nPuedo contarte sobre:\n* Nuestros termos\n* Tazas artesanales\n* Envíos a todo el país',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getSimulatedResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('termo')) {
      return 'Nuestros **termos**, como el *"Bosque Suave"*, mantienen tus bebidas calientes por hasta **12 horas**. \n\nSon de acero inoxidable con acabados mate en colores pastel.';
    }
    if (q.includes('taza') || q.includes('tazas')) {
      return 'Nuestras **tazas** son de cerámica artesanal. La *"Nube Rosa"* es una de las favoritas por su tacto suave y diseño ergonómico.';
    }
    if (q.includes('envio') || q.includes('envió') || q.includes('llegar')) {
      return 'Realizamos **envíos a todo el país**. \n\n* **Plazo:** 3 a 5 días hábiles.\n* **Costo:** Gratis en compras superiores a **$100**.';
    }
    if (q.includes('artesanal') || q.includes('hecho a mano')) {
      return 'Cada pieza es **única**. Trabajamos con artesanos locales que utilizan técnicas tradicionales para asegurar la máxima calidad.';
    }
    return 'Esa es una excelente pregunta. Como soy un asistente en entrenamiento, te cuento que lo mejor de **Happy Sweet Home** es nuestra dedicación al detalle. \n\n¿Te gustaría saber más sobre algún producto de nuestra colección?';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const apiKey = process.env.API_KEY;

    try {
      if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: input,
          config: {
            systemInstruction: `Eres un asistente amable de "Happy Sweet Home". 
            Tu tono es cálido y minimalista. 
            USA MARKDOWN para formatear tus respuestas (negritas para nombres de productos, listas para beneficios).
            Productos disponibles: ${PRODUCTS.map(p => p.name).join(', ')}.
            Envío gratis a partir de $100.
            Responde de forma concisa.`
          }
        });

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.text || 'Lo siento, tuve un pequeño inconveniente. ¿Podrías repetir eso?',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        setTimeout(() => {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: getSimulatedResponse(input),
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setIsTyping(false);
    } finally {
      if (apiKey) setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {isOpen && (
        <div className="absolute bottom-0 right-0 w-[350px] md:w-[400px] h-[550px] bg-white rounded-[2.5rem] shadow-3xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-300 origin-bottom-right">
          <div className="bg-green-600 p-6 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Leaf size={20} className="fill-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-widest uppercase">Dulce Ayuda</h3>
                <p className="text-[10px] opacity-80 uppercase tracking-tighter">En línea ahora</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-1">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide bg-[#FDFBF7]">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-gray-900 text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-gray-800 rounded-tl-none border border-green-50 shadow-sm'
                  }`}
                >
                  <div className="markdown-content">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-green-50 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-full border border-gray-100 shadow-inner">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="¿Cómo podemos ayudarte?" 
                className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none text-gray-900"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors disabled:opacity-50 shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-3xl transition-all duration-500 hover:scale-110 active:scale-95 bg-green-600 text-white animate-in fade-in zoom-in"
        >
          <Leaf size={28} className="fill-current" />
        </button>
      )}
    </div>
  );
};
