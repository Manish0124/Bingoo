import { memo, useEffect, useState } from 'react';

interface LineAnimationProps {
  line: string | null;
}

function LineAnimation({ line }: LineAnimationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (line) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [line]);

  if (!show || !line) return null;

  const getLineText = () => {
    const letters = ['B', 'I', 'N', 'G', 'O'];
    if (letters.includes(line)) return `${line} Column Complete!`;
    if (line.startsWith('ROW')) {
      const rowNum = parseInt(line.replace('ROW', ''));
      return `Row ${rowNum + 1} Complete!`;
    }
    if (line === 'DIAG1') return 'Diagonal \\ Complete!';
    if (line === 'DIAG2') return 'Diagonal / Complete!';
    return 'Line Complete!';
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-white px-8 md:px-12 py-4 md:py-6 rounded-full shadow-2xl animate-bounce">
        <div className="text-2xl md:text-4xl font-bold flex items-center gap-2 md:gap-3">
          <span className="text-3xl md:text-5xl">⭐</span>
          {getLineText()}
          <span className="text-3xl md:text-5xl">⭐</span>
        </div>
      </div>
    </div>
  );
}

export default memo(LineAnimation);
