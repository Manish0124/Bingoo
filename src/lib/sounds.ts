let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext && typeof window !== 'undefined') {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const playSound = (type: 'win' | 'number-called' | 'mark' | 'cheer') => {
  if (typeof window === 'undefined') return;
  if (!(window as any).bingoSoundEnabled) return;
  
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    switch (type) {
      case 'win':
      case 'cheer':
        playWinSound(ctx);
        break;
      case 'number-called':
        playNumberCalledSound(ctx);
        break;
      case 'mark':
        playMarkSound(ctx);
        break;
    }
  } catch (error) {
    console.log('Audio not supported');
  }
};

const playWinSound = (audioContext: AudioContext) => {
  // Crowd cheer effect
  const whiteNoise = audioContext.createBufferSource();
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < buffer.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  whiteNoise.buffer = buffer;
  
  const filter = audioContext.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1000;
  
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
  
  whiteNoise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  whiteNoise.start(audioContext.currentTime);
  whiteNoise.stop(audioContext.currentTime + 2);
  
  // Victory fanfare
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1568.00];
  notes.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator();
    const oscGain = audioContext.createGain();
    
    oscillator.connect(oscGain);
    oscGain.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.15);
    oscillator.type = 'triangle';
    
    oscGain.gain.setValueAtTime(0, audioContext.currentTime + index * 0.15);
    oscGain.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + index * 0.15 + 0.1);
    oscGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.15 + 0.6);
    
    oscillator.start(audioContext.currentTime + index * 0.15);
    oscillator.stop(audioContext.currentTime + index * 0.15 + 0.6);
  });
};

const playNumberCalledSound = (audioContext: AudioContext) => {
  // Bell-like sound
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
};

const playMarkSound = (audioContext: AudioContext) => {
  // Quick click sound
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
  oscillator.type = 'square';
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};