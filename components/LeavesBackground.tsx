
import React from 'react';

export const LeavesBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      <div className="absolute top-10 left-[-5%] w-64 h-64 animate-float" style={{ animationDelay: '0s' }}>
        <LeafSVG color="#81C784" rotate={45} />
      </div>
      <div className="absolute top-[40%] right-[-5%] w-72 h-72 animate-float" style={{ animationDelay: '2s' }}>
        <LeafSVG color="#A5D6A7" rotate={-30} />
      </div>
      <div className="absolute bottom-10 left-[10%] w-56 h-56 animate-float" style={{ animationDelay: '4s' }}>
        <LeafSVG color="#C8E6C9" rotate={120} />
      </div>
      <div className="absolute top-[70%] left-[60%] w-80 h-80 animate-float" style={{ animationDelay: '1s' }}>
        <LeafSVG color="#E8F5E9" rotate={-15} />
      </div>
    </div>
  );
};

const LeafSVG: React.FC<{ color: string; rotate: number }> = ({ color, rotate }) => (
  <svg 
    viewBox="0 0 200 200" 
    style={{ transform: `rotate(${rotate}deg)`, color: color }}
    className="w-full h-full fill-current"
  >
    <path d="M100,20 C100,20 150,60 150,110 C150,160 100,180 100,180 C100,180 50,160 50,110 C50,60 100,20 100,20" />
    <path d="M100,20 L100,180" stroke="#FFF" strokeWidth="2" opacity="0.3" />
  </svg>
);
