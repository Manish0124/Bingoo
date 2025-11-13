# UPDATE YOUR RAILWAY URL

## Step 1: Get Your Railway URL
1. Go to Railway dashboard
2. Click your project "graceful-light"
3. Go to Settings → Networking
4. Copy your domain URL

## Step 2: Update These Files

### File 1: `next.config.js`
Replace line 4:
```javascript
NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL || 'YOUR_RAILWAY_URL_HERE',
```

### File 2: `src/lib/socket.ts`
Replace line 7:
```typescript
: 'YOUR_RAILWAY_URL_HERE';
```

## Step 3: Push to GitHub
```bash
git add .
git commit -m "fix socket url"
git push
```

Vercel will auto-deploy in 2 minutes!

## Example:
If your Railway URL is: `https://graceful-light-production-abc.up.railway.app`

Then replace both places with that URL.
