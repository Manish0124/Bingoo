# 🏆 Win System - First to 5 Lines

## New Win Condition

**First player to complete ANY 5 lines wins!**

Lines can be:
- Columns (B, I, N, G, O)
- Rows (1-5)
- Diagonals (2 total)

Total possible lines: **12**
- 5 columns
- 5 rows
- 2 diagonals

## How It Works

### Line Completion

Each time you mark a number:
1. System checks all possible lines
2. If a line is complete → Letter lights up
3. Animation shows which line completed
4. Counter increases (e.g., "Lines Completed: 3/5")

### BINGO Letters Display

```
Lines Completed: 3/5
[B] [I] [N] [G] [O]
 ✓   ✓   ✓   ✗   ✗
```

- Each letter represents a completed line
- Letters light up in order as you complete lines
- Any 5 lines (not just columns) count

### Example Game Flow

```
Turn 1: Complete Column B → B lights up (1/5)
Turn 3: Complete Row 1 → I lights up (2/5)
Turn 5: Complete Diagonal → N lights up (3/5)
Turn 7: Complete Column I → G lights up (4/5)
Turn 9: Complete Row 3 → O lights up (5/5) → WIN!
```

### Line Types

#### Columns (Vertical)
- B = Column 1
- I = Column 2
- N = Column 3
- G = Column 4
- O = Column 5

#### Rows (Horizontal)
- Row 1 (top)
- Row 2
- Row 3
- Row 4
- Row 5 (bottom)

#### Diagonals
- Diagonal \ (top-left to bottom-right)
- Diagonal / (top-right to bottom-left)

## Victory Screen

When 5 lines are completed:

```
🎆
[B] [I] [N] [G] [O]
BINGO!
5 Lines Completed!
{Winner} Wins!
🎉 🏆 🎊 ✨ 🎉
```

Features:
- Shows all 5 lit letters
- Displays line count
- Winner name
- Epic animations
- Victory sound

## Visual Feedback

### Line Completion Animation
- ⭐ Popup notification
- Shows which line completed
- "B Column Complete!"
- "Row 3 Complete!"
- "Diagonal \ Complete!"

### Cell Effects
- Yellow ring around completed line cells
- Pulsing glow effect
- Ping animation

### Letter Lighting
- Gray = Not completed
- Colored + Glowing = Completed
- Bouncing = Just completed
- Pulsing = Active

## Strategy

Players can win by completing:
- 5 columns (traditional BINGO)
- 5 rows (horizontal strategy)
- 3 columns + 2 diagonals (mixed)
- Any combination totaling 5 lines

## Testing

### Quick Win Test:
1. Mark entire first row → 1 line
2. Mark entire second row → 2 lines
3. Mark entire third row → 3 lines
4. Mark entire fourth row → 4 lines
5. Mark entire fifth row → 5 lines → WIN!

### Mixed Strategy Test:
1. Complete column B → 1 line
2. Complete column I → 2 lines
3. Complete diagonal \ → 3 lines
4. Complete row 1 → 4 lines
5. Complete row 2 → 5 lines → WIN!

## Server Validation

Server checks:
- All columns (5)
- All rows (5)
- Both diagonals (2)
- Counts total completed lines
- Win = 5 or more lines

Prevents false wins and cheating!

## Game Flow

1. **Start**: 0/5 lines, all letters gray
2. **Mark numbers**: Take turns
3. **Complete line**: Letter lights up, animation plays
4. **Progress**: Counter shows X/5
5. **5th line**: Victory screen + sound
6. **Winner**: +100 points, game ends

The first player to light up all 5 BINGO letters (by completing any 5 lines) wins! 🎯
