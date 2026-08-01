import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const NAV_H = 60; // Offset hero for seamless navbar flow

export const Hero = () => {
  return (
    <section
      className="relative w-full bg-white overflow-hidden min-h-[calc(100vh-60px)] lg:min-h-screen flex items-center"
      style={{ marginTop: `-${NAV_H}px`, paddingTop: `${NAV_H}px` }}
    >
      {/* ── 1. Full-Height Right Half Bleed Image with Soft Blend Gradient ── */}
      <div className="absolute top-0 right-0 w-full lg:w-[50%] xl:w-[50%] h-full pointer-events-none overflow-hidden z-0">
        <img
          src="/images/vaveva_hero_model.png"
          alt="VAVEVA Summer Collection Model"
          className="w-full h-full object-cover object-top sm:object-center"
          loading="eager"
        />

        {/* Soft Left Fade Gradient: Blends image naturally into pure white background */}
        <div className="absolute inset-y-0 left-0 w-28 sm:w-44 lg:w-64 bg-gradient-to-r from-white via-white/75 to-transparent z-10" />

        {/* Mobile Soft Top/Bottom Blends */}
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-white/90 via-white/40 to-transparent lg:hidden z-10" />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white via-white/40 to-transparent lg:hidden z-10" />
      </div>

      {/* ── 2. Editorial Typography Content Block (Max-Width 520px) ── */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-20 py-8 lg:py-12">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center max-w-[520px] pt-2 lg:pt-0">
            
            {/* Collection Tag — 24px Gap below */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.35em] text-[#666666] font-mono mb-6"
            >
              Summer Collection 2026
            </motion.p>

            {/* Main Title — 28px Gap below */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
              className="font-serif font-bold text-[#111111] leading-[0.96] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[92px] mb-[28px]"
            >
              Elevate <br />
              Your <br />
              Everyday.
            </motion.h1>

            {/* Description — 40px Gap below */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
              className="text-xs sm:text-sm md:text-base text-[#555555] font-normal leading-relaxed mb-10"
            >
              Timeless fits. Effortless style. Built for the bold. Premium
              heavyweight organic cotton engineered for modern men.
            </motion.p>

            {/* Action Buttons — 56px Height & 999px Border Radius */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.34, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/shop"
                  className="inline-flex h-[56px] items-center justify-center gap-3 bg-[#111111] text-white px-9 rounded-[999px] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#333333] transition-all shadow-md group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/shop?sort=newest"
                  className="inline-flex h-[56px] items-center justify-center px-9 rounded-[999px] border border-[#111111] bg-white text-[#111111] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#111111] hover:text-white transition-all shadow-sm"
                >
                  New Arrivals
                </Link>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};