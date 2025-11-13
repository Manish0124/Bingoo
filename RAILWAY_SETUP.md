# Railway Setup Fix

## The Problem:
Railway is trying to build Next.js, but we only need the Socket.io server.

## The Fix:

### Option 1: Change Settings in Railway Dashboard (EASIEST)

1. Go to Railway dashboard
2. Click your project
3. Go to **Settings** tab
4. Scroll to **Build** section
5. Set **Build Command**: `echo "No build needed"`
6. Set **Start Command**: `node server-standalone.js`
7. Click **Save**
8. Go to **Deployments** tab
9. Click **"Redeploy"**

### Option 2: Use Render Instead (RECOMMENDED)

Railway is being difficult. Use Render.com instead:

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub
4. Select your repo
5. Settings:
   - **Name**: bingo-socket
   - **Build Command**: `npm install socket.io`
   - **Start Command**: `node server-standalone.js`
6. Click "Create Web Service"
7. Wait 2 minutes
8. Copy the URL (e.g., `https://bingo-socket.onrender.com`)

Then update `src/lib/socket.ts` with that URL!

### Option 3: Use Glitch (FASTEST)

1. Go to https://glitch.com
2. Click "New Project" → "Import from GitHub"
3. Paste your repo URL
4. In glitch.json add:
```json
{
  "install": "npm install socket.io",
  "start": "node server-standalone.js"
}
```
5. Copy the URL

## Recommended: Use Render
It's easier than Railway for this use case!
