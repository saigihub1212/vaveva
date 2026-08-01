import React from 'react';
import { Link } from 'react-router-dom';

export const CategoryIcons = () => {
  const categories = [
    {
      name: 'T-Shirts',
      path: '/shop?category=T-Shirts',
      img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Shirts',
      path: '/shop?category=Shirts',
      img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Oversized',
      path: '/shop?category=Oversized',
      img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Pants',
      path: '/shop?category=Pants',
      img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Hoodies',
      path: '/shop?category=Hoodies',
      img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Accessories',
      path: '/shop?category=Accessories',
      img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <section className="py-8 bg-white border-b border-[#EEEEEE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-10 overflow-x-auto hide-scrollbar py-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="flex flex-col items-center group flex-shrink-0"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full overflow-hidden bg-[#F5F5F5] border-2 border-[#EEEEEE] transition-all duration-300 group-hover:scale-105 group-hover:border-[#111111] shadow-sm">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-[#111111] mt-2.5 group-hover:text-[#666666] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
