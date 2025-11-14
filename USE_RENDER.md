# Use Render.com Instead

Railway is being difficult. Render is easier!

## Steps:

1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect GitHub"** → Select your repo
5. Fill in:
   - **Name**: `bingo-socket`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Build Command**: `npm install socket.io`
   - **Start Command**: `node server-standalone.js`
6. Click **"Create Web Service"**
7. Wait 2-3 minutes
8. Copy the URL (e.g., `https://bingo-socket.onrender.com`)

## Then Update Code:

Replace the URL in these files:
- `next.config.js` line 4
- `src/lib/socket.ts` line 7

With your Render URL, then push to GitHub.

Vercel will auto-deploy and it will work!

## Why Render?
- Simpler than Railway
- Free tier
- Auto-detects Node.js
- Just works!
