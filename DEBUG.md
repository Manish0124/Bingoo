# Debug Steps

## Check if Socket Server is Running

1. Open Railway dashboard
2. Go to your project
3. Click "Deployments" tab
4. Check if status is "Active" (green)
5. Click "View Logs" to see server logs
6. You should see: "Socket.io server running on port XXXX"

## Check Browser Console

1. Open your Vercel URL
2. Press F12 (open DevTools)
3. Go to "Console" tab
4. Look for:
   - ✅ "Connecting to socket server: https://..."
   - ✅ "Socket connected: xxxxx"
   - ❌ "Socket connection error" (if this shows, there's a problem)

## Common Issues:

### Issue 1: CORS Error
**Fix:** Railway server needs to allow your Vercel domain
- Check Railway logs for CORS errors

### Issue 2: Wrong URL in Vercel
**Fix:** 
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Check `NEXT_PUBLIC_SOCKET_URL` is your Railway URL
3. Must start with `https://` (not `http://`)
4. Redeploy after changing

### Issue 3: Railway Server Not Running
**Fix:**
1. Check Railway logs
2. Make sure `server-standalone.js` is running
3. Check for errors in logs

## Test Connection:

Open browser console and run:
```javascript
// Should show your Railway URL
console.log(process.env.NEXT_PUBLIC_SOCKET_URL)
```

## Still Not Working?

Share these details:
1. Railway URL
2. Vercel URL  
3. Browser console errors
4. Railway logs
