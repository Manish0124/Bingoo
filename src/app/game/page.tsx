'use client';

import { useEffect, useState, Suspense, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import BingoCard from '@/components/BingoCard';
import GameControls from '@/components/GameControls';
import PlayerList from '@/components/PlayerList';
import SoundToggle from '@/components/SoundToggle';
import WinAnimation from '@/components/WinAnimation';
import Chat from '@/components/Chat';
import Scoreboard from '@/components/Scoreboard';
import ThemeSelector, { themes } from '@/components/ThemeSelector';
import AutoDraw from '@/components/AutoDraw';
import NumberAnimation from '@/components/NumberAnimation';
import ModeSelector from '@/components/ModeSelector';
import LineAnimation from '@/components/LineAnimation';
import { getSocket } from '@/lib/socket';
import { playSound } from '@/lib/sounds';

function GameContent() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room');
  const playerName = searchParams.get('name');
  const isHost = searchParams.get('host') === 'true';

  const [bingoCard, setBingoCard] = useState<number[][]>([]);
  const [markedCells, setMarkedCells] = useState<boolean[][]>(Array(5).fill(null).map(() => Array(5).fill(false)));
  const [markedNumbers, setMarkedNumbers] = useState<number[]>([]);
  const [players, setPlayers] = useState<Array<{ name: string; hasWon: boolean; id?: string }>>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<string | null>(null);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [theme, setTheme] = useState('purple');
  const [mode, setMode] = useState<'online' | 'offline'>('online');
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [newLine, setNewLine] = useState<string | null>(null);
  const [showCheers, setShowCheers] = useState(false);

  useEffect(() => {
    if (!roomId || !playerName) return;

    const socket = getSocket();
    socket.emit('join-room', { roomId, playerName, isHost });

    socket.on('room-update', ({ players, markedNumbers, gameStarted, currentTurn }) => {
      setPlayers(players);
      setMarkedNumbers(markedNumbers || []);
      setGameStarted(gameStarted);
      setCurrentTurn(currentTurn);
      setIsMyTurn(currentTurn === socket.id);
    });

    socket.on('game-auto-started', ({ players, currentTurn }) => {
      const myPlayer = players.find((p: any) => p.id === socket.id);
      if (myPlayer?.cardNumbers && Array.isArray(myPlayer.cardNumbers)) {
        const grid = arrayToGrid(myPlayer.cardNumbers);
        setBingoCard(grid);
        const initialMarked = Array(5).fill(null).map(() => Array(5).fill(false));
        initialMarked[2][2] = true;
        setMarkedCells(initialMarked);
      }
      setPlayers(players);
      setGameStarted(true);
      setCurrentTurn(currentTurn);
      setIsMyTurn(currentTurn === socket.id);
      playSound('number-called');
    });

    socket.on('game-started', ({ currentTurn, players }) => {
      const myPlayer = players.find((p: any) => p.id === socket.id);
      if (myPlayer?.cardNumbers) {
        setBingoCard(arrayToGrid(myPlayer.cardNumbers));
        const initialMarked = Array(5).fill(null).map(() => Array(5).fill(false));
        initialMarked[2][2] = true;
        setMarkedCells(initialMarked);
      }
      setPlayers(players);
      setGameStarted(true);
      setCurrentTurn(currentTurn);
      setIsMyTurn(currentTurn === socket.id);
    });

    socket.on('number-marked', ({ number, markedBy, nextTurn, markedNumbers }) => {
      setMarkedNumbers(markedNumbers);
      setCurrentTurn(nextTurn);
      setIsMyTurn(nextTurn === socket.id);
      setLastNumber(number);
      playSound('mark');
    });

    socket.on('player-won', ({ playerName, players }) => {
      setWinner(playerName);
      setPlayers(players);
      setGameStarted(false);
      playSound('cheer');
      setTimeout(() => playSound('cheer'), 500);
    });

    socket.on('game-draw', ({ winners, players }) => {
      setWinner(`DRAW: ${winners}`);
      setPlayers(players);
      setGameStarted(false);
      playSound('cheer');
      setTimeout(() => playSound('cheer'), 500);
    });

    socket.on('theme-changed', ({ theme: newTheme }) => {
      setTheme(newTheme);
    });

    socket.on('game-reset', ({ currentTurn, players }) => {
      const myPlayer = players.find((p: any) => p.id === socket.id);
      if (myPlayer?.cardNumbers) {
        setBingoCard(arrayToGrid(myPlayer.cardNumbers));
      }
      const initialMarked = Array(5).fill(null).map(() => Array(5).fill(false));
      initialMarked[2][2] = true;
      setMarkedCells(initialMarked);
      setMarkedNumbers([]);
      setWinner(null);
      setGameStarted(true);
      setCurrentTurn(currentTurn);
      setIsMyTurn(currentTurn === socket.id);
      setCompletedLines([]);
      setNewLine(null);
    });

    return () => {
      socket.off('room-update');
      socket.off('game-auto-started');
      socket.off('game-started');
      socket.off('number-marked');
      socket.off('player-won');
      socket.off('game-draw');
      socket.off('game-reset');
      socket.off('theme-changed');
    };
  }, [roomId, playerName, isHost]);

  const arrayToGrid = useCallback((numbers: number[]): number[][] => {
    const grid: number[][] = [];
    for (let row = 0; row < 5; row++) {
      grid[row] = [];
      for (let col = 0; col < 5; col++) {
        grid[row][col] = numbers[row * 5 + col];
      }
    }
    return grid;
  }, []);

  const markedNumbersSet = useMemo(() => new Set(markedNumbers), [markedNumbers]);

  const checkLines = useCallback((marked: boolean[][]) => {
    const lines: string[] = [];
    
    // Check columns (B, I, N, G, O)
    const letters = ['B', 'I', 'N', 'G', 'O'];
    for (let i = 0; i < 5; i++) {
      if (marked.every(row => row[i])) lines.push(letters[i]);
    }
    
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (marked[i].every(cell => cell)) lines.push(`ROW${i}`);
    }
    
    // Check diagonals
    if (marked.every((row, i) => row[i])) lines.push('DIAG1');
    if (marked.every((row, i) => row[4 - i])) lines.push('DIAG2');
    
    return lines;
  }, []);

  const checkWin = useCallback((lines: string[]): boolean => {
    return lines.length >= 5;
  }, []);

  const toggleCell = useCallback((row: number, col: number) => {
    if (!gameStarted || !isMyTurn || !bingoCard[row]) return;
    const number = bingoCard[row][col];
    if (number === undefined || number === 0 || markedNumbersSet.has(number)) return;
    
    const newMarked = markedCells.map(r => [...r]);
    newMarked[row][col] = true;
    newMarked[2][2] = true;
    setMarkedCells(newMarked);
    
    getSocket().emit('mark-number', { roomId, number });
    
    const lines = checkLines(newMarked);
    const newCompletedLine = lines.find(l => !completedLines.includes(l));
    if (newCompletedLine) {
      setCompletedLines(lines);
      setNewLine(newCompletedLine);
      setTimeout(() => setNewLine(null), 2000);
      playSound('number-called');
      
      if (lines.length === 5 && !winner) {
        setShowCheers(true);
        playSound('cheer');
        setTimeout(() => playSound('cheer'), 500);
        getSocket().emit('claim-win', { roomId, playerName, markedCells: newMarked });
        setTimeout(() => {
          setShowCheers(false);
        }, 3000);
      }
    }
  }, [gameStarted, isMyTurn, bingoCard, markedNumbersSet, markedCells, roomId, playerName, completedLines, checkLines]);

  const resetGame = useCallback(() => {
    getSocket().emit('reset-game', roomId);
  }, [roomId]);

  useEffect(() => {
    if (markedNumbers.length > 0 && bingoCard.length > 0) {
      const markedSet = new Set(markedNumbers);
      const newMarked = bingoCard.map(row => 
        row.map(num => num === 0 || markedSet.has(num))
      );
      
      const lines: string[] = [];
      const letters = ['B', 'I', 'N', 'G', 'O'];
      
      for (let i = 0; i < 5; i++) {
        if (newMarked.every(row => row[i])) {
          if (!lines.includes(letters[i])) lines.push(letters[i]);
        }
      }
      
      for (let i = 0; i < 5; i++) {
        if (newMarked[i]?.every(cell => cell)) {
          if (!lines.includes(`ROW${i}`)) lines.push(`ROW${i}`);
        }
      }
      
      if (newMarked.every((row, i) => row[i])) {
        if (!lines.includes('DIAG1')) lines.push('DIAG1');
      }
      if (newMarked.every((row, i) => row[4 - i])) {
        if (!lines.includes('DIAG2')) lines.push('DIAG2');
      }
      
      if (lines.length <= 5) {
        setCompletedLines(lines);
      }
    }
  }, [markedNumbers, bingoCard]);

  const changeTheme = useCallback((newTheme: string) => {
    setTheme(newTheme);
    if (mode === 'online') {
      getSocket().emit('change-theme', { roomId, theme: newTheme });
    }
  }, [roomId, mode]);

  const currentTheme = themes[theme as keyof typeof themes] || themes.purple;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} p-4 transition-all`}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Room: {roomId}</h1>
              <p className="text-gray-600">Player: {playerName}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ModeSelector mode={mode} onModeChange={setMode} />
              <ThemeSelector theme={theme} onThemeChange={changeTheme} />
              <SoundToggle />
              {isHost && (
                <span className={`${currentTheme.card} text-white px-4 py-2 rounded-full font-semibold`}>Host</span>
              )}
            </div>
          </div>
        </div>

        <WinAnimation winner={winner} onClose={() => setWinner(null)} linesCompleted={completedLines.length} />
        <NumberAnimation number={lastNumber} />
        <LineAnimation line={newLine} />
        {showCheers && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black bg-opacity-60">
            <div className="relative">
              <div className="text-center">
                <div className="text-9xl mb-6 animate-bounce">🏏</div>
                <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 shadow-2xl">
                  <div className="text-7xl font-bold text-white mb-4 animate-pulse drop-shadow-lg">
                    HOWZAT!
                  </div>
                  <div className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
                    {playerName}
                  </div>
                  <div className="text-3xl text-white font-semibold mb-2 drop-shadow">
                    HAS WON!
                  </div>
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <div className="text-6xl">🥇</div>
                    <div className="text-5xl font-bold text-yellow-300 drop-shadow-lg">1st POSITION</div>
                    <div className="text-6xl">🥇</div>
                  </div>
                  <div className="text-4xl">🏆 🎉 🎊 ✨ 🎉 🏆</div>
                </div>
              </div>
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-5xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `bounce ${0.5 + Math.random()}s infinite`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                >
                  {['🎊', '🎉', '⭐', '✨', '🏆', '🥇'][i % 6]}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-center mb-2">
                <span className="text-sm font-semibold text-gray-600">Lines Completed: {completedLines.length}/5</span>
              </div>
              <div className="flex justify-center gap-2">
                {['B', 'I', 'N', 'G', 'O'].map((letter, idx) => (
                  <div
                    key={letter}
                    className={`w-16 h-16 flex items-center justify-center rounded-lg text-3xl font-bold transition-all duration-500 ${
                      idx < completedLines.length
                        ? `${currentTheme.card} text-white shadow-2xl scale-110 animate-pulse`
                        : 'bg-gray-200 text-gray-400'
                    } ${newLine && completedLines.length - 1 === idx ? 'animate-bounce' : ''}`}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
            <BingoCard
              card={bingoCard}
              markedCells={markedCells}
              onCellClick={toggleCell}
              theme={currentTheme}
              markedNumbers={markedNumbers}
              completedLines={completedLines}
            />
          </div>

          <div className="space-y-4">
            <GameControls
              isHost={isHost}
              gameStarted={gameStarted}
              markedNumbers={markedNumbers}
              currentTurn={currentTurn}
              isMyTurn={isMyTurn}
              players={players}
              onResetGame={resetGame}
              theme={currentTheme}
            />
            {mode === 'online' && <Chat roomId={roomId!} playerName={playerName!} socket={getSocket()} />}
          </div>

          <div className="space-y-4">
            <Scoreboard players={players} />
            <PlayerList players={players} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center"><div className="text-white text-2xl">Loading...</div></div>}>
      <GameContent />
    </Suspense>
  );
}
