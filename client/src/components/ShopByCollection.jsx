import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const ShopByCollection = () => {
  const heroCollection = {
    num: '01',
    name: 'OVERSIZED',
    count: '32 Products',
    path: '/shop?category=Oversized',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200'
  };

  const collectionsRow1Right = [
    {
      num: '02',
      name: 'SHIRTS',
      count: '28 Products',
      path: '/shop?category=Shirts',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800'
    },
    {
      num: '03',
      name: 'T-SHIRTS',
      count: '45 Products',
      path: '/shop?category=T-Shirts',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const collectionsRow2 = [
    {
      num: '04',
      name: 'HOODIES',
      count: '24 Products',
      path: '/shop?category=Hoodies',
      img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800'
    },
    {
      num: '05',
      name: 'PANTS',
      count: '30 Products',
      path: '/shop?category=Pants',
      img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800'
    },
    {
      num: '06',
      name: 'ACCESSORIES',
      count: '18 Products',
      path: '/shop?category=Accessories',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="pt-[40px] pb-[52px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs uppercase tracking-[0.35em] text-[#111111] font-bold">
            SHOP BY COLLECTION
          </h2>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-[#111111] hover:text-[#666666] transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Editorial Masonry Grid with Perfect Male Model Face Visibility */}
        <div className="space-y-5">
          {/* Row 1: Hero Card Left (60% width) + Stacked Cards Right (40% width) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Card 01: OVERSIZED */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <Link
                to={heroCollection.path}
                className="group relative block w-full h-[360px] sm:h-[400px] lg:h-[440px] rounded-[16px] overflow-hidden shadow-sm border border-[#EEEEEE]"
              >
                <img
                  src={heroCollection.img}
                  alt={heroCollection.name}
                  className="w-full h-full object-cover object-[center_15%] transition-transform duration-500 ease-in-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity group-hover:from-black/90 p-6 sm:p-7 flex flex-col justify-between text-white">
                  <span className="text-xs font-mono text-white/75 font-semibold tracking-widest">
                    {heroCollection.num}
                  </span>
                  <div className="space-y-1 transition-transform duration-300 group-hover:-translate-y-1">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
                      {heroCollection.name}
                    </h3>
                    <p className="text-xs text-white/75 font-light font-mono">
                      {heroCollection.count}
                    </p>
                    <div className="inline-flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-white pt-1">
                      <span>Explore Collection</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Right Column: 02 SHIRTS + 03 T-SHIRTS */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {collectionsRow1Right.map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                >
                  <Link
                    to={item.path}
                    className="group relative block w-full h-[207px] lg:h-[207px] rounded-[16px] overflow-hidden shadow-sm border border-[#EEEEEE]"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover object-[center_15%] transition-transform duration-500 ease-in-out group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity group-hover:from-black/90 p-5 flex flex-col justify-between text-white">
                      <span className="text-xs font-mono text-white/75 font-semibold tracking-widest">
                        {item.num}
                      </span>
                      <div className="space-y-0.5 transition-transform duration-300 group-hover:-translate-y-1">
                        <h3 className="font-serif text-xl font-bold tracking-tight text-white uppercase">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-white/75 font-light font-mono">
                          {item.count}
                        </p>
                        <div className="inline-flex items-center space-x-1 text-[10px] uppercase tracking-[0.2em] font-bold text-white pt-0.5">
                          <span>Explore Collection</span>
                          <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Row 2: 3 Balanced Male Model Cards with Full Face Positioning */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collectionsRow2.map((item, idx) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (idx + 3) }}
                className={idx === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <Link
                  to={item.path}
                  className="group relative block w-full h-[230px] rounded-[16px] overflow-hidden shadow-sm border border-[#EEEEEE]"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover object-[center_15%] transition-transform duration-500 ease-in-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity group-hover:from-black/90 p-5 flex flex-col justify-between text-white">
                    <span className="text-xs font-mono text-white/75 font-semibold tracking-widest">
                      {item.num}
                    </span>
                    <div className="space-y-0.5 transition-transform duration-300 group-hover:-translate-y-1">
                      <h3 className="font-serif text-xl font-bold tracking-tight text-white uppercase">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-white/75 font-light font-mono">
                        {item.count}
                      </p>
                      <div className="inline-flex items-center space-x-1 text-[10px] uppercase tracking-[0.2em] font-bold text-white pt-0.5">
                        <span>Explore Collection</span>
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
