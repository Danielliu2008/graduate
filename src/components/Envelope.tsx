import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CONFIG } from '../config';

interface EnvelopeProps {
  onOpen: () => void;
  isOpened: boolean;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen, isOpened }) => {
  const [flapZ, setFlapZ] = React.useState(40);

  React.useEffect(() => {
    if (isOpened) {
      // Delay z-index switch until flap is fully open (1.2s delay + 1.0s duration)
      const timer = setTimeout(() => {
        setFlapZ(10);
      }, 2200);
      return () => clearTimeout(timer);
    } else {
      setFlapZ(40);
    }
  }, [isOpened]);

  return (
    <div 
      className="relative w-[85vw] max-w-sm aspect-[3/2] md:w-96 md:h-64 cursor-pointer group perspective-1000" 
      onClick={onOpen}
    >
      {/* Shadow */}
      <div className="absolute inset-0 bg-black/60 blur-2xl translate-y-6 scale-90" />

      {/* 1. Back Panel (Bottom Layer) */}
      <div className="absolute inset-0 bg-envelope rounded-sm border border-gold/5 z-0" />

      {/* 2. Inner Paper (Sliding out) */}
      <motion.div 
        className="absolute top-4 left-4 right-4 h-[90%] bg-paper shadow-sm z-20 flex flex-col items-center justify-center p-4"
        initial={{ y: 0 }}
        animate={isOpened ? { y: -180, opacity: 0, scale: 1.1 } : { y: 0 }}
        transition={{ delay: 2.0, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-1/2 h-[1px] bg-gold/20 my-1" />
        <div className="w-1/3 h-[1px] bg-gold/10 my-1" />
      </motion.div>

      {/* 3. Front Pouch (Front Cover) */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 66.6" preserveAspectRatio="none">
          <path 
            d="M 0 0 L 0 66.6 L 100 66.6 L 100 0 L 50 40 L 0 0 Z" 
            fill={CONFIG.COLORS.envelope} 
            stroke={CONFIG.COLORS.gold}
            strokeWidth="0.1"
            strokeOpacity="0.2"
          />
          <line x1="0" y1="0" x2="50" y2="40" stroke={CONFIG.COLORS.gold} strokeWidth="0.1" strokeOpacity="0.1" />
          <line x1="100" y1="0" x2="50" y2="40" stroke={CONFIG.COLORS.gold} strokeWidth="0.1" strokeOpacity="0.1" />
        </svg>
      </div>

      {/* 4. Opening Flap (Top Triangle) */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[60%] origin-top"
        initial={{ rotateX: 0 }}
        animate={isOpened ? { rotateX: -180 } : { rotateX: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
        style={{ 
          transformStyle: 'preserve-3d', 
          backfaceVisibility: 'visible',
          zIndex: flapZ 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
          <path 
            d="M 0 0 L 100 0 L 50 60 L 0 0 Z" 
            fill={CONFIG.COLORS.envelope} 
            stroke={CONFIG.COLORS.gold}
            strokeWidth="0.1"
          />
        </svg>
      </motion.div>

      {/* 5. Wax Seal (Diamond) - Falls down on open */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2 z-50 pointer-events-none"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0, 
              y: 500, 
              rotate: 30,
              transition: { duration: 1, ease: [0.32, 0, 0.67, 0] } 
            }}
          >
            <div className="w-8 h-8 border border-gold rotate-45 flex items-center justify-center bg-envelope shadow-lg">
              <div className="w-3 h-3 bg-gold rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction Text */}
      {!isOpened && (
        <motion.div 
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gold/60 text-[10px] tracking-[0.4em] font-serif uppercase">
            Tap to Open
          </p>
          <motion.div 
            className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Envelope;
