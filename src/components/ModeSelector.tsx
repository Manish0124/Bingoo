import { memo } from 'react';

interface ModeSelectorProps {
  mode: 'online' | 'offline';
  onModeChange: (mode: 'online' | 'offline') => void;
}

function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex gap-2 bg-white rounded-lg p-1">
      <button
        onClick={() => onModeChange('online')}
        className={`flex-1 px-4 py-2 rounded font-semibold transition ${
          mode === 'online' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        🌐 Online
      </button>
      <button
        onClick={() => onModeChange('offline')}
        className={`flex-1 px-4 py-2 rounded font-semibold transition ${
          mode === 'offline' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        📱 Offline
      </button>
    </div>
  );
}

export default memo(ModeSelector);
