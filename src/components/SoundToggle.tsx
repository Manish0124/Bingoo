import { useState, useEffect } from 'react';

export default function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('bingo-sound-enabled');
    if (saved !== null) {
      setSoundEnabled(JSON.parse(saved));
    }
  }, []);

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('bingo-sound-enabled', JSON.stringify(newValue));
    
    // Update global sound setting
    if (typeof window !== 'undefined') {
      (window as any).bingoSoundEnabled = newValue;
    }
  };

  // Set initial global sound setting
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).bingoSoundEnabled = soundEnabled;
    }
  }, [soundEnabled]);

  return (
    <button
      onClick={toggleSound}
      className={`p-2 rounded-lg transition ${
        soundEnabled 
          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
          : 'bg-red-100 text-red-600 hover:bg-red-200'
      }`}
      title={soundEnabled ? 'Sound On' : 'Sound Off'}
    >
      {soundEnabled ? '🔊' : '🔇'}
    </button>
  );
}