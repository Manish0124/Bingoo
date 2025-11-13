# 🎮 Game Mechanics

## Auto-Start System

### Minimum Players: 2
- Game automatically starts when 2nd player joins
- No manual start button needed
- All players receive shuffled cards instantly

### How It Works:
1. Player 1 creates room → Waiting state
2. Player 2 joins → Game auto-starts
3. Both players get cards with same numbers, different positions
4. Turn-based marking begins

## Shared Numbers System

### Same Numbers, Different Order
- Server generates 25 unique numbers (one set per room)
- Each player gets the SAME numbers
- Numbers are shuffled differently for each player
- Prevents cheating (everyone has same numbers)

### Example:
```
Room Numbers: [5, 12, 23, 31, 42, ...]

Player 1 Card:
5  23  42  ...
12 31  ...

Player 2 Card:
31 5   12  ...
42 23  ...
```

## Turn-Based Marking

### Rules:
- Only active player can mark numbers
- Click any number on your card to mark it
- Number is marked globally for ALL players
- Turn automatically passes to next player
- Visual indicator shows whose turn it is

### Turn Flow:
```
Player 1 marks 23 → All players see 23 marked → Turn → Player 2
Player 2 marks 42 → All players see 42 marked → Turn → Player 1
```

## Real-Time Sync

### What Syncs:
- ✅ Marked numbers (global)
- ✅ Turn indicator
- ✅ Player list
- ✅ Win detection
- ✅ Themes
- ✅ Chat messages

### Socket Events:
- `game-auto-started` - Game begins with 2 players
- `number-marked` - Player marks a number
- `player-won` - Instant win alert
- `game-reset` - New game with new cards

## Win Detection

### Instant Check:
- Checked after every mark
- Server validates win pattern
- Instant alert to all players
- Game stops automatically

### Win Patterns:
- Any horizontal row (5 in a row)
- Any vertical column (5 in a column)
- Diagonal (top-left to bottom-right)
- Diagonal (top-right to bottom-left)

### Scoring:
- Winner gets +100 points
- Win count increases by 1
- Displayed in scoreboard

## Testing the Game

### Single Browser Test:
1. Open two tabs
2. Tab 1: Create room
3. Tab 2: Join with same room code
4. Game starts automatically
5. Take turns marking numbers

### Multi-Device Test:
1. Device 1: Create room, share code
2. Device 2: Join with code
3. Game auto-starts
4. Mark numbers in turns
5. First to complete pattern wins

## Troubleshooting

### Game Not Starting:
- Ensure 2 players have joined
- Check browser console for errors
- Refresh both players' browsers
- Try creating a new room

### Numbers Not Marking:
- Check if it's your turn (blue indicator)
- Only active player can mark
- Number must be on your card
- Refresh if stuck

### Cards Not Showing:
- Wait for game-auto-started event
- Check network tab for socket connection
- Ensure server is running
- Clear browser cache

## Commands

```bash
# Start server
npm run dev

# Clear cache
rm -rf .next

# Kill existing server
pkill -f "node.*server.js"
```

Game is ready when you see: `> Ready on http://localhost:3000`
