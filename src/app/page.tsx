'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const createRoom = () => {
    if (!playerName.trim()) return;
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/game?room=${newRoomId}&name=${encodeURIComponent(playerName)}&host=true`);
  };

  const joinRoom = () => {
    if (!playerName.trim() || !roomId.trim()) return;
    router.push(`/game?room=${roomId.toUpperCase()}&name=${encodeURIComponent(playerName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-800">🎯 Multiplayer Bingo</h1>
        
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Your Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && createRoom()}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-800 text-base"
          />
        </div>

        <div className="space-y-4">
          <button
            onClick={createRoom}
            disabled={!playerName.trim()}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Create New Room
          </button>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <input
            type="text"
            placeholder="Room Code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
          />

          <button
            onClick={joinRoom}
            disabled={!playerName.trim() || !roomId.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
