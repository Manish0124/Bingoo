import { useEffect, useState } from 'react';

interface WinAnimationProps {
  winner: string | null;
  onClose: () => void;
  linesCompleted?: number;
}

export default function WinAnimation({ winner, onClose, linesCompleted = 5 }: WinAnimationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (winner) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [winner, onClose]);

  if (!winner) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
      show ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}>
        {show && (
          <>
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][i % 5],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </>
        )}
      </div>
      <div className={`bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 md:p-12 text-center transform transition-all duration-500 shadow-2xl relative overflow-hidden ${
        show ? 'scale-100 rotate-0' : 'scale-50 rotate-12'
      }`}>
        <div className="absolute inset-0 overflow-hidden">
          {show && [...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animation: `fall ${2 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {['🎊', '🎉', '⭐', '✨', '🏆', '🎯'][i % 6]}
            </div>
          ))}
        </div>
        <div className="relative z-10">
          <div className="text-6xl md:text-8xl mb-4 md:mb-6 animate-bounce">
            {winner?.includes('DRAW') ? '🤝' : '🏏'}
          </div>
          <div className="text-5xl md:text-7xl font-bold text-white mb-4 animate-pulse drop-shadow-lg">
            {winner?.includes('DRAW') ? 'DRAW!' : 'HOWZAT!'}
          </div>
          <div className="flex justify-center gap-2 md:gap-3 mb-4">
            {['B', 'I', 'N', 'G', 'O'].map((letter, i) => (
              <div
                key={letter}
                className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-lg flex items-center justify-center text-2xl md:text-3xl font-bold text-orange-600 animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {letter}
              </div>
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 md:mb-3 drop-shadow-lg">BINGO!</h2>
          <p className="text-xl md:text-2xl text-white font-semibold mb-2 drop-shadow">{linesCompleted} Lines!</p>
          <p className="text-2xl md:text-3xl text-white font-semibold mb-4 md:mb-6 drop-shadow">
            {winner?.includes('DRAW') ? winner : `${winner} Wins!`}
          </p>
          <div className="flex justify-center space-x-3 md:space-x-4 text-4xl md:text-5xl">
            <span className="animate-bounce">🎉</span>
            <span className="animate-pulse">🏆</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</span>
            <span className="animate-pulse" style={{ animationDelay: '0.3s' }}>✨</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎉</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}