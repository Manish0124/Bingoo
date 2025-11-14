import { memo } from 'react';

interface Player {
  name: string;
  hasWon: boolean;
  score?: number;
  wins?: number;
}

interface ScoreboardProps {
  players: Player[];
}

function Scoreboard({ players }: ScoreboardProps) {
  const sorted = [...players].sort((a, b) => (b.wins || 0) - (a.wins || 0));

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🏆 Scoreboard</h2>
      <div className="space-y-2">
        {sorted.map((player, idx) => (
          <div key={idx} className={`p-3 rounded-lg flex justify-between items-center ${
            idx === 0 ? 'bg-yellow-100 border-2 border-yellow-500' :
            idx === 1 ? 'bg-gray-100 border-2 border-gray-400' :
            idx === 2 ? 'bg-orange-100 border-2 border-orange-400' :
            'bg-gray-50'
          }`}>
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-950 text-lg">{idx + 1}.</span>
              <span className="font-semibold text-blue-950 ">{player.name}</span>
              {idx === 0 && <span>🥇</span>}
              {idx === 1 && <span>🥈</span>}
              {idx === 2 && <span>🥉</span>}
            </div>
            <div className="text-right">
              <div className="font-bold text-purple-600">{player.wins || 0} wins</div>
              {player.hasWon && <span className="text-xs text-green-600">Current Winner</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Scoreboard);
