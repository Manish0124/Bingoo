import { memo, useState, useEffect } from 'react';

interface AutoDrawProps {
  isHost: boolean;
  gameStarted: boolean;
  onCallNumber: () => void;
}

function AutoDraw({ isHost, gameStarted, onCallNumber }: AutoDrawProps) {
  const [auto, setAuto] = useState(false);
  const [interval, setIntervalTime] = useState(5);

  useEffect(() => {
    if (!auto || !gameStarted || !isHost) return;
    const timer = setInterval(onCallNumber, interval * 1000);
    return () => clearInterval(timer);
  }, [auto, gameStarted, isHost, interval, onCallNumber]);

  if (!isHost || !gameStarted) return null;

  return (
    <div className="bg-blue-50 p-3 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-sm">Auto Draw</span>
        <button
          onClick={() => setAuto(!auto)}
          className={`px-3 py-1 rounded ${auto ? 'bg-green-600 text-white' : 'bg-gray-300'}`}
        >
          {auto ? 'ON' : 'OFF'}
        </button>
      </div>
      {auto && (
        <input
          type="range"
          min="3"
          max="10"
          value={interval}
          onChange={e => setIntervalTime(+e.target.value)}
          className="w-full"
        />
      )}
      {auto && <div className="text-xs text-center text-gray-600">Every {interval}s</div>}
    </div>
  );
}

export default memo(AutoDraw);
