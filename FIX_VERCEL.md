# FIX: Socket Connection Error

## The Problem:
Your app is trying to connect to Vercel for WebSocket, but Vercel doesn't support WebSockets!
It needs to connect to your Railway server instead.

## The Fix (2 minutes):

### Step 1: Get Your Railway URL
1. Go to Railway dashboard
2. Click your project
3. Go to Settings → Networking
4. Click "Generate Domain"
5. Copy the URL (e.g., `https://graceful-light-production.up.railway.app`)

### Step 2: Add to Vercel
1. Go to Vercel dashboard
2. Click your project "bingoo"
3. Click "Settings" tab
4. Click "Environment Variables" in left menu
5. Click "Add New"
6. Fill in:
   - **Name**: `NEXT_PUBLIC_SOCKET_URL`
   - **Value**: Your Railway URL (paste it)
   - **Environment**: Check all (Production, Preview, Development)
7. Click "Save"

### Step 3: Redeploy
1. Go to "Deployments" tab
2. Click the three dots (...) on latest deployment
3. Click "Redeploy"
4. Wait 2 minutes

### Step 4: Test
1. Open your Vercel URL
2. Press F12 (console)
3. Should see: "Connecting to socket server: https://your-railway-url..."
4. Should see: "Socket connected: xxxxx"

## Done! 🎉

Now the game will work!
