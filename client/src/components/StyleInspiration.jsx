import React from 'react';
import { Instagram } from 'lucide-react';

export const StyleInspiration = () => {
  const images = [
    'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#666666] font-semibold">@VAVEVA_MEN</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold mt-1">Style Inspiration</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 max-w-7xl mx-auto pb-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="group relative flex-shrink-0 w-56 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden bg-[#F5F5F5] border border-[#EEEEEE]"
          >
            <img src={img} alt="Style inspiration" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Instagram size={28} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
