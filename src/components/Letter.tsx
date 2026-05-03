import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LetterConfig } from '../tokens';
import MusicButton from './MusicButton';

interface LetterProps {
  isOpened: boolean;
  config: LetterConfig;
}

const DiamondIcon = ({ className = "w-5 h-5", delay = 0 }) => (
  <motion.svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 -960 960 960" 
    className={className}
    fill="currentColor"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8 }}
  >
    <path d="M480-200 200-480l280-280 280 280-280 280Zm0-114 166-166-166-166-166 166 166 166Zm0-166Z"/>
  </motion.svg>
);

const Letter: React.FC<LetterProps> = ({ isOpened, config }) => {
  const [displayText, setDisplayText] = useState('');
  const [typingFinished, setTypingFinished] = useState(false);
  const { greeting, paragraphs, closing, date, options } = config;
  
  const typingSpeed = options?.typingSpeed ?? 70;
  const iconDelayBase = options?.iconDelayBase ?? 1.0;
  const textDelayBase = options?.textDelayBase ?? 1.4;

  useEffect(() => {
    if (isOpened) {
      const startTimeout = setTimeout(() => {
        let i = 0;
        const timer = setInterval(() => {
          setDisplayText(greeting.slice(0, i + 1));
          i++;
          if (i >= greeting.length) {
            clearInterval(timer);
            setTypingFinished(true);
          }
        }, typingSpeed);
        return () => clearInterval(timer);
      }, 500); 
      
      return () => clearTimeout(startTimeout);
    }
  }, [isOpened, greeting, typingSpeed]);

  if (!isOpened) return null;

  return (
    <motion.div 
      className="relative w-full max-w-2xl bg-paper shadow-[0_0_80px_rgba(0,0,0,0.3)] p-8 md:p-16 my-8 md:my-16 overflow-visible rounded-sm z-50 transition-all h-auto"
      initial={{ y: 30, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Music Player Control */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <MusicButton delay={1.5} />
      </div>

      {/* Top Decoration */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-20">
        <DiamondIcon className="w-4 h-4 text-gold" />
      </div>

      {/* Content Container */}
      <div className="text-text space-y-4 md:space-y-6 mt-4 md:mt-6">
        {/* Greeting Section */}
        <div className="flex items-baseline gap-2 text-accent">
          <h1 className="font-serif text-xl md:text-2xl tracking-wide min-h-[1.5em] font-semibold">
            {displayText}
            {!typingFinished && (
              <motion.span 
                className="inline-block w-[2px] h-[0.9em] bg-accent ml-1 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            )}
          </h1>
        </div>

        {/* Paragraphs */}
        <div className="space-y-6 md:space-y-8">
          {paragraphs.map((para, idx) => (
            <div key={idx} className="relative">
              <motion.p 
                className="text-base md:text-lg lg:text-xl leading-[1.8] md:leading-[2] text-text font-serif font-normal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: textDelayBase + idx * 0.8, duration: 1.2 }}
              >
                {para.showIcon && (
                  <span className="inline-flex items-center mr-2 translate-y-[1px]">
                    <DiamondIcon 
                      className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold" 
                      delay={iconDelayBase + idx * 0.8} 
                    />
                  </span>
                )}
                {para.content}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Closing & Date Section */}
        <div className="pt-6 md:pt-8 flex flex-col items-end gap-1.5 px-2">
          <motion.div 
            className="font-serif italic text-lg text-secondaryText"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
          >
            {closing}
          </motion.div>
          
          <div className="flex items-center gap-4">
            <motion.div className="h-[1px] w-12 bg-gold/30" 
              initial={{ scaleX: 0, originX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 3.8, duration: 1 }}
            />
            <motion.p 
              className="font-serif uppercase text-[10px] md:text-xs tracking-[0.4em] text-gold/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8 }}
            >
              {date}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Bottom Corner Accent */}
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-gold/10" />
    </motion.div>
  );
};

export default Letter;
