import { memo, useEffect } from 'react';

interface BingoCardProps {
  card: number[][];
  markedCells: boolean[][];
  onCellClick: (row: number, col: number) => void;
  theme?: { bg: string; card: string; marked: string };
  markedNumbers?: number[];
  completedLines?: string[];
}

function BingoCard({ card, markedCells, onCellClick, theme, markedNumbers = [], completedLines = [] }: BingoCardProps) {
  const headers = ['B', 'I', 'N', 'G', 'O'];
  
  if (!card || card.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
        <p className="text-gray-600">Waiting for game to start...</p>
      </div>
    );
  }
  
  const isInCompletedLine = (row: number, col: number) => {
    if (completedLines.includes(headers[col])) return true;
    if (completedLines.includes(`ROW${row}`)) return true;
    if (completedLines.includes('DIAG1') && row === col) return true;
    if (completedLines.includes('DIAG2') && row === 4 - col) return true;
    return false;
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 relative">
      <div className="grid grid-cols-5 gap-2">
        {headers.map((letter, idx) => (
          <div key={idx} className={`${theme?.card || 'bg-purple-600'} text-white text-xl md:text-2xl font-bold py-2 md:py-3 rounded-lg text-center`}>
            {letter}
          </div>
        ))}
        
        {card.map((row, rowIdx) =>
          row.map((num, colIdx) => {
            const isMarked = markedCells[rowIdx]?.[colIdx] || false;
            const inLine = isInCompletedLine(rowIdx, colIdx);
            return (
              <button
                key={`${rowIdx}-${colIdx}`}
                onClick={() => onCellClick(rowIdx, colIdx)}
                className={`aspect-square text-lg md:text-xl font-bold rounded-lg transition-all relative ${
                  isMarked
                    ? `${theme?.marked || 'bg-green-500'} text-white scale-95`
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:scale-95'
                } ${num === 0 ? 'bg-yellow-400 text-gray-800' : ''} ${
                  inLine && isMarked ? 'ring-4 ring-yellow-400 shadow-lg animate-pulse' : ''
                }`}
              >
                {num === 0 ? 'FREE' : num}
                {inLine && isMarked && (
                  <div className="absolute inset-0 bg-yellow-400 opacity-30 rounded-lg animate-ping"></div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export default memo(BingoCard);
