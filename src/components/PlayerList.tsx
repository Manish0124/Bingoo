interface Player {
  name: string;
  hasWon: boolean;
}

interface PlayerListProps {
  players: Player[];
}

export default function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Players ({players.length})</h2>
      <div className="space-y-2">
        {players.map((player, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg ${
              player.hasWon ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">{player.name}</span>
              {player.hasWon && <span className="text-green-600">👑 Winner</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
