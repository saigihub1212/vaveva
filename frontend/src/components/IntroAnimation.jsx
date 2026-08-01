import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const IntroAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState('centered'); // 'centered' -> 'moving' -> 'complete'

  useEffect(() => {
    // Session check: only play once per browsing session
    const hasSeenIntro = sessionStorage.getItem('vaveva_intro_seen');
    if (hasSeenIntro) {
      if (onComplete) onComplete(false);
      setStage('complete');
      return;
    }

    // Sequence timing
    const t1 = setTimeout(() => {
      setStage('moving');
    }, 1500); // 1.5 seconds in center

    const t2 = setTimeout(() => {
      setStage('complete');
      sessionStorage.setItem('vaveva_intro_seen', 'true');
      if (onComplete) onComplete(true);
    }, 2800); // Complete after transition

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (stage === 'complete') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-backdrop"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'moving' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFFFF] pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{
            opacity: stage === 'moving' ? 0 : 1,
            y: stage === 'moving' ? -180 : 0,
            scale: stage === 'moving' ? 0.85 : 1
          }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center justify-center space-y-3"
        >
          <div className="w-16 h-16 border-2 border-[#111111] flex items-center justify-center text-2xl font-serif font-bold text-[#111111]">
            V
          </div>
          <span className="font-serif text-3xl tracking-[0.35em] text-[#111111] font-bold uppercase">
            VAVEVA
          </span>
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#666666] font-mono">
            PARIS • MILAN • TOKYO
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
