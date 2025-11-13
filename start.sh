#!/bin/bash

echo "🚀 Starting Bingo Game (Optimized)..."

# Clear Next.js cache for fresh start
rm -rf .next/cache 2>/dev/null

# Start the server
NODE_ENV=development node server.js
