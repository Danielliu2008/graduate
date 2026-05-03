import { CONFIG } from '../config';

// Declare APlayer for TypeScript
declare const APlayer: any;

let player: any = null;

export const initPlayer = () => {
  if (player || typeof APlayer === 'undefined') return;

  const container = document.createElement('div');
  container.id = 'aplayer-hidden';
  container.style.display = 'none';
  document.body.appendChild(container);

  player = new APlayer({
    container: container,
    audio: [{
      url: CONFIG.BGM_URL,
      name: '毕业纪念',
      artist: 'Time Capsule',
    }],
    autoplay: false,
    loop: 'one',
    volume: 0, // Start at 0 for fade in
    mutex: true,
  });
};

export const startBGM = () => {
  if (!player) initPlayer();
  if (player) {
    player.play();
    fadeVolume(0.5, 3000);
  }
};

export const toggleBGM = () => {
  if (!player) return;
  player.toggle();
};

export const getPlayerState = () => {
  if (!player) return { paused: true };
  return { paused: player.audio.paused };
};

const fadeVolume = (target: number, duration: number) => {
  if (!player) return;
  const startVolume = player.volume;
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    player.volume = startVolume + (target - startVolume) * progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};
