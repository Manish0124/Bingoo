# 🚀 Start Game - Quick Guide

## ✅ All Errors Fixed!

The application is now working correctly.

## Start Server

```bash
npm run dev
```

Wait for: `> Ready on http://localhost:3000`

## Create & Join Room

### Option 1: Single Browser (Testing)

1. **Tab 1 - Create Room:**
   - Open http://localhost:3000
   - Enter name: "Player 1"
   - Click "Create New Room"
   - Copy room code (e.g., "ABC123")

2. **Tab 2 - Join Room:**
   - Open http://localhost:3000 in new tab
   - Enter name: "Player 2"
   - Enter room code: "ABC123"
   - Click "Join Room"

3. **Game Auto-Starts!**
   - Both players get cards
   - Turn-based marking begins

### Option 2: Multiple Devices

1. **Device 1:**
   - Create room
   - Share room code

2. **Device 2:**
   - Join with code
   - Game starts automatically

## How to Play

1. **Wait for your turn** (blue indicator)
2. **Click any number** on your card
3. **Number marks globally** for all players
4. **Complete columns** to light up B-I-N-G-O letters
5. **First to complete all 5 letters wins!**

## Features Working

✅ Auto-start at 2 players
✅ Shared numbers, different positions
✅ Turn-based marking
✅ Global number sync
✅ BINGO letter lighting
✅ Line animations
✅ Victory screen
✅ Sound effects
✅ Chat & emojis
✅ Themes
✅ Scoreboard

## Troubleshooting

### If server won't start:
```bash
rm -f .next/dev/lock
pkill -f "node.*server.js"
npm run dev
```

### If cards don't show:
- Refresh both browsers
- Check console for errors
- Ensure 2 players joined

### If marking doesn't work:
- Check if it's your turn
- Only active player can mark
- Number must be on your card

## Game is Ready! 🎮

Open http://localhost:3000 and start playing!
