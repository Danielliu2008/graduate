import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Stars from './components/Stars';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import { initPlayer, startBGM } from './services/player';
import { LETTER_TOKENS } from './tokens';

export default function App() {
  const [stage, setStage] = useState<'idle' | 'opening' | 'reading'>('idle');
  const [dataReady, setDataReady] = useState(false);
  const [config, setConfig] = useState<LetterConfig>(LETTER_TOKENS);

  useEffect(() => {
    initPlayer();

    // Check if data is already loaded or wait for it
    const checkData = () => {
      const globalData = (window as any).LETTER_DATA;
      if (globalData) {
        setConfig(globalData);
        setDataReady(true);
        return true;
      }
      return false;
    };

    if (!checkData()) {
      const interval = setInterval(() => {
        if (checkData()) clearInterval(interval);
      }, 50);
      
      // Extended timeout for slow network loading of t.js
      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 10000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, []);

  const handleOpen = () => {
    if (stage !== 'idle') return;
    
    startBGM();
    setStage('opening');
    
    setTimeout(() => {
      setStage('reading');
    }, 3200); 
  };

  if (!dataReady && !LETTER_TOKENS.greeting) {
    return (
      <main className="min-h-screen bg-night flex items-center justify-center">
        <Stars />
        <div className="text-gold font-serif animate-pulse tracking-widest text-sm uppercase opacity-50">
          Loading Letter...
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start md:justify-center p-6 bg-night overflow-x-hidden overflow-y-auto selection:bg-gold/30">
      <Stars />
      
      {stage !== 'reading' ? (
        <div className="flex-1 flex items-center justify-center">
          <Envelope onOpen={handleOpen} isOpened={stage === 'opening'} />
        </div>
      ) : (
        <motion.div 
          className="w-full flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Letter isOpened={true} config={config} />
        </motion.div>
      )}
    </main>
  );
}
