# 🎯 Multiplayer Bingo Game

A real-time multiplayer Bingo game built with Next.js and Socket.io.

## Features

- 🎮 **Multiplayer Modes** - Online real-time or offline single-player
- 🏠 **Room System** - Create or join rooms with unique codes
- 🎲 **Random Bingo Cards** - Each player gets a unique 5x5 Bingo card
- 🤖 **Auto Number Draw** - Automatic number calling with adjustable intervals
- 📢 **Turn-Based Calling** - Players take turns calling numbers
- 🏆 **Win Detection** - Automatic detection of winning patterns
- 🎨 **Customizable Themes** - 4 color themes with real-time sync
- 💬 **Chat & Reactions** - Text chat and emoji reactions during gameplay
- 📊 **Scoreboard** - Player rankings with win history and scores
- 🎬 **Animations** - Number animations and win celebrations
- 🔊 **Sound Effects** - Audio feedback for all game actions
- 📱 **Responsive UI** - Optimized for mobile and desktop

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Play

1. **Create a Room:**
   - Enter your name
   - Click "Create New Room"
   - Share the room code with other players

2. **Join a Room:**
   - Enter your name
   - Enter the room code
   - Click "Join Room"

3. **Start the Game:**
   - The host clicks "Start Game"
   - Players take turns calling numbers
   - Enable auto-draw for automatic number calling
   - Use chat and emoji reactions to communicate
   - Change themes in real-time
   - First player to complete a row, column, or diagonal wins!
   - View scoreboard for rankings and history

## Game Rules

- Standard 5x5 Bingo card with FREE space in the center
- Numbers range from 1-75:
  - B: 1-15
  - I: 16-30
  - N: 31-45
  - G: 46-60
  - O: 61-75
- Win by completing any row, column, or diagonal
- Players take turns calling numbers
- Host can enable auto-draw and reset the game
- Earn 100 points per win

## Tech Stack

- **Next.js 16** - React framework with optimizations
- **TypeScript** - Type safety
- **Socket.io** - Real-time communication
- **Tailwind CSS** - Responsive styling
- **Web Audio API** - Sound effects

## Project Structure

```
bingo/
├── src/
│   ├── app/
│   │   ├── game/
│   │   │   └── page.tsx      # Game page
│   │   ├── page.tsx          # Home page
│   │   └── layout.tsx
│   ├── components/
│   │   ├── BingoCard.tsx     # Bingo card component
│   │   ├── GameControls.tsx  # Game controls
│   │   ├── PlayerList.tsx    # Player list
│   │   ├── Chat.tsx          # Chat & emoji reactions
│   │   ├── Scoreboard.tsx    # Rankings & scores
│   │   ├── ThemeSelector.tsx # Theme customization
│   │   ├── AutoDraw.tsx      # Auto number draw
│   │   ├── NumberAnimation.tsx # Number animations
│   │   ├── ModeSelector.tsx  # Online/offline mode
│   │   ├── SoundToggle.tsx   # Sound control
│   │   └── WinAnimation.tsx  # Win celebration
│   └── lib/
│       ├── socket.ts         # Socket.io client
│       └── sounds.ts         # Sound effects
├── server.js                 # Custom server with Socket.io
└── package.json
```

## License

MIT
