import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Music, Music2 } from 'lucide-react';
import { toggleBGM } from '../services/player';

interface MusicButtonProps {
  className?: string;
  delay?: number;
}

const MusicButton: React.FC<MusicButtonProps> = ({ className = "", delay = 0 }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleToggle = () => {
    toggleBGM();
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`relative w-10 h-10 border border-gold rounded-full flex items-center justify-center bg-paper group hover:bg-gold/10 transition-all shadow-md active:scale-95 ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
    >
      <div className={`relative flex items-center justify-center text-accent/60 group-hover:text-accent animate-slow-rotate ${!isPlaying ? 'pause-animation' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
          <path d="M287-167q-47-47-47-113t47-113q47-47 113-47 23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47q-66 0-113-47Z"/>
        </svg>
      </div>
      
      {/* Outer pulsing ring while playing */}
      {isPlaying && (
        <motion.div 
          className="absolute inset-0 border border-gold/40 rounded-full"
          animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
};

export default MusicButton;
