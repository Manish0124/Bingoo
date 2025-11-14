const { createServer } = require('http');
const { Server } = require('socket.io');

const port = process.env.PORT || 3001;
console.log('Starting server on port:', port);
console.log('Environment:', process.env.NODE_ENV);

const httpServer = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.url === '/health' || req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  } else {
    res.writeHead(404);
    res.end();
  }
});

const io = new Server(httpServer, {
  cors: { 
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['*']
  },
  transports: ['polling', 'websocket'],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000
});

const rooms = new Map();
const socketToRoom = new Map();
const MIN_PLAYERS = 2;

function generateSharedNumbers() {
  const ranges = [[1, 15], [16, 30], [31, 45], [46, 60], [61, 75]];
  const allNumbers = [];
  
  for (const [min, max] of ranges) {
    const available = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    for (let i = 0; i < 5; i++) {
      const idx = Math.floor(Math.random() * available.length);
      allNumbers.push(available.splice(idx, 1)[0]);
    }
  }
  
  const sharedNumbers = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        sharedNumbers.push(0);
      } else {
        sharedNumbers.push(allNumbers[col * 5 + row]);
      }
    }
  }
  return sharedNumbers;
}

function shuffleNumbers(numbers) {
  const shuffled = [...numbers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getNextTurn(room) {
  if (room.players.length === 0) return null;
  const currentIndex = room.players.findIndex(p => p.id === room.currentTurn);
  const nextIndex = (currentIndex + 1) % room.players.length;
  return room.players[nextIndex].id;
}

function checkWin(marked) {
  let completedLines = 0;
  
  for (let i = 0; i < 5; i++) {
    if (marked.every(row => row[i])) completedLines++;
  }
  
  for (let i = 0; i < 5; i++) {
    if (marked[i].every(cell => cell)) completedLines++;
  }
  
  if (marked.every((row, i) => row[i])) completedLines++;
  if (marked.every((row, i) => row[4 - i])) completedLines++;
  
  return completedLines >= 5;
}

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-room', ({ roomId, playerName, isHost }) => {
    socket.join(roomId);
    socketToRoom.set(socket.id, roomId);
    
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        players: [],
        markedNumbers: [],
        gameStarted: false,
        host: isHost ? socket.id : null,
        currentTurn: null,
        theme: 'purple',
        sharedNumbers: null,
      });
    }

    const room = rooms.get(roomId);
    if (!room.players.find(p => p.id === socket.id)) {
      // Generate the same card for all players
      if (!room.sharedNumbers) {
        room.sharedNumbers = generateSharedNumbers();
      }
      room.players.push({ 
        id: socket.id, 
        name: playerName, 
        hasWon: false, 
        wins: 0, 
        score: 0,
        cardNumbers: room.sharedNumbers
      });
    }
    
    if (!room.currentTurn && room.players.length === 1) {
      room.currentTurn = socket.id;
    }

    if (!room.gameStarted && room.players.length >= MIN_PLAYERS) {
      room.gameStarted = true;
      room.currentTurn = room.players[0].id;
      
      room.players.forEach(p => {
        p.cardNumbers = room.sharedNumbers;
      });
      
      setTimeout(() => {
        io.to(roomId).emit('game-auto-started', {
          players: room.players,
          currentTurn: room.currentTurn,
        });
      }, 100);
    } else {
      io.to(roomId).emit('room-update', {
        players: room.players,
        markedNumbers: room.markedNumbers,
        gameStarted: room.gameStarted,
        currentTurn: room.currentTurn,
      });
    }
  });

  socket.on('start-game', (roomId) => {
    const room = rooms.get(roomId);
    if (room && room.host === socket.id && !room.gameStarted) {
      room.gameStarted = true;
      room.currentTurn = room.players[0]?.id || null;
      
      room.players.forEach(p => {
        p.cardNumbers = room.sharedNumbers;
      });
      
      io.to(roomId).emit('game-started', { 
        currentTurn: room.currentTurn,
        players: room.players
      });
    }
  });

  socket.on('mark-number', ({ roomId, number }) => {
    const room = rooms.get(roomId);
    if (room && room.currentTurn === socket.id && room.gameStarted) {
      if (!room.markedNumbers.includes(number)) {
        room.markedNumbers.push(number);
        room.currentTurn = getNextTurn(room);
        
        io.to(roomId).emit('number-marked', { 
          number, 
          markedBy: room.players.find(p => p.id === socket.id)?.name,
          nextTurn: room.currentTurn,
          markedNumbers: room.markedNumbers
        });
      }
    }
  });

  socket.on('claim-win', ({ roomId, playerName, markedCells }) => {
    const room = rooms.get(roomId);
    if (room && room.gameStarted) {
      const player = room.players.find(p => p.id === socket.id);
      if (player && !player.hasWon) {
        const isValid = checkWin(markedCells);
        if (isValid) {
          player.hasWon = true;
          player.wins = (player.wins || 0) + 1;
          player.score = (player.score || 0) + 100;
          
          const winners = room.players.filter(p => p.hasWon);
          if (winners.length > 1) {
            const winnerNames = winners.map(w => w.name).join(' & ');
            room.gameStarted = false;
            io.to(roomId).emit('game-draw', { winners: winnerNames, players: room.players });
          } else {
            room.gameStarted = false;
            io.to(roomId).emit('player-won', { playerName, players: room.players });
          }
        }
      }
    }
  });

  socket.on('reset-game', (roomId) => {
    const room = rooms.get(roomId);
    if (room && room.host === socket.id) {
      room.markedNumbers = [];
      room.gameStarted = true;
      room.sharedNumbers = generateSharedNumbers();
      room.currentTurn = room.players[0]?.id || null;
      room.players.forEach(p => {
        p.hasWon = false;
        p.cardNumbers = room.sharedNumbers;
      });
      io.to(roomId).emit('game-reset', { 
        currentTurn: room.currentTurn,
        players: room.players
      });
    }
  });

  socket.on('chat-message', ({ roomId, player, text }) => {
    io.to(roomId).emit('chat-message', { player, text, time: Date.now() });
  });

  socket.on('emoji-reaction', ({ roomId, player, emoji }) => {
    io.to(roomId).emit('emoji-reaction', { player, emoji, time: Date.now() });
  });

  socket.on('change-theme', ({ roomId, theme }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.theme = theme;
      io.to(roomId).emit('theme-changed', { theme });
    }
  });

  socket.on('disconnect', () => {
    const roomId = socketToRoom.get(socket.id);
    if (roomId && rooms.has(roomId)) {
      const room = rooms.get(roomId);
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      
      if (playerIndex !== -1) {
        const wasCurrentTurn = room.currentTurn === socket.id;
        room.players.splice(playerIndex, 1);
        
        if (wasCurrentTurn && room.players.length > 0) {
          room.currentTurn = room.players[0].id;
        } else if (room.players.length === 0) {
          room.currentTurn = null;
        }
        
        if (room.players.length > 0) {
          io.to(roomId).emit('room-update', {
            players: room.players,
            markedNumbers: room.markedNumbers,
            gameStarted: room.gameStarted,
            currentTurn: room.currentTurn,
          });
        } else {
          rooms.delete(roomId);
        }
      }
    }
    socketToRoom.delete(socket.id);
  });
});

httpServer.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

httpServer.listen(port, '0.0.0.0', () => {
  console.log(`✅ Socket.io server running on port ${port}`);
  console.log(`✅ Health check available at http://0.0.0.0:${port}/health`);
  console.log(`✅ Server ready to accept connections`);
}).on('error', (err) => {
  console.error('❌ Failed to start server:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use`);
  }
});
