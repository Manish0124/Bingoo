import { memo } from 'react';

interface GameControlsProps {
  isHost: boolean;
  gameStarted: boolean;
  markedNumbers: number[];
  currentTurn: string | null;
  isMyTurn: boolean;
  players: Array<{ name: string; hasWon: boolean }>;
  onResetGame: () => void;
  theme?: { bg: string; card: string; marked: string };
}

function GameControls({
  isHost,
  gameStarted,
  markedNumbers,
  currentTurn,
  isMyTurn,
  players,
  onResetGame,
  theme,
}: GameControlsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Game Controls</h2>
      
      <div className="space-y-3 mb-4">
        {!gameStarted && (
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-700">Waiting for players...</p>
            <p className="text-xs text-gray-600 mt-1">Game starts at 2 players</p>
          </div>
        )}
        
        {gameStarted && (
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Current Turn:</p>
            <p className="font-bold text-blue-600">
              {isMyTurn ? '✨ Your Turn! Mark a number' : 'Waiting for turn...'}
            </p>
          </div>
        )}
        
        {isHost && gameStarted && (
          <button
            onClick={onResetGame}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Reset Game
          </button>
        )}
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2 text-gray-700">Marked Numbers ({markedNumbers.length})</h3>
        <div className="max-h-48 md:max-h-64 overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {markedNumbers.map((num, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold text-white ${theme?.marked || 'bg-green-500'}`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(GameControls);
