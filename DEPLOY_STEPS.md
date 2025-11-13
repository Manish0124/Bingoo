# How to Deploy Your Bingo Game

## Step 1: Deploy Socket Server to Railway (5 minutes)

1. Go to https://railway.app
2. Click "Start a New Project"
3. Click "Deploy from GitHub repo"
4. Connect your GitHub account
5. Select this repository
6. Railway will auto-detect Node.js
7. Add this in Settings → Deploy:
   - **Start Command**: `node server-standalone.js`
8. Click "Generate Domain" to get your URL
9. Copy the URL (e.g., `https://bingo-production-xxxx.up.railway.app`)

## Step 2: Deploy Frontend to Vercel (3 minutes)

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. In "Environment Variables" add:
   - **Name**: `NEXT_PUBLIC_SOCKET_URL`
   - **Value**: Paste your Railway URL from Step 1
5. Click "Deploy"
6. Wait 2 minutes for deployment
7. Copy your Vercel URL (e.g., `https://bingo-xxxx.vercel.app`)

## Step 3: Test Your Game

1. Open your Vercel URL in browser
2. Click "Create New Room"
3. Copy the room code
4. Open another browser/incognito window
5. Paste room code and join
6. Game starts automatically with 2 players!

## Local Testing (Optional)

```bash
# Terminal 1 - Socket server
node server-standalone.js

# Terminal 2 - Next.js
npm run dev

# Open http://localhost:3000
```

## Troubleshooting

**Can't connect?**
- Check Railway logs for errors
- Verify NEXT_PUBLIC_SOCKET_URL in Vercel settings
- Make sure Railway domain is public

**Game not starting?**
- Need 2 players minimum
- Check browser console for errors
- Refresh both players' browsers

## Done! 🎉

Share your Vercel URL with friends to play!
