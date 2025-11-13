# Deployment Guide

## Deploy to Vercel + Railway (Recommended)

### Step 1: Deploy Socket.io Server to Railway

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select this repository
4. Add these settings:
   - **Start Command**: `node server-standalone.js`
   - **Port**: Railway will auto-assign
5. Copy the public URL (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variable:
   - **Name**: `NEXT_PUBLIC_SOCKET_URL`
   - **Value**: Your Railway URL (e.g., `https://your-app.railway.app`)
4. Deploy

### Step 3: Update Local Development

For local testing with Railway backend:
```bash
# In .env.local
NEXT_PUBLIC_SOCKET_URL=https://your-app.railway.app
```

## Alternative: Local Development

```bash
# Terminal 1 - Run Socket.io server
node server-standalone.js

# Terminal 2 - Run Next.js
npm run dev
```

## Testing

1. Open your Vercel URL
2. Create a room
3. Share the room code with another player
4. Both players should be able to play together

## Troubleshooting

- If connection fails, check Railway logs
- Ensure NEXT_PUBLIC_SOCKET_URL is set correctly in Vercel
- Check browser console for connection errors
