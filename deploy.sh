#!/bin/bash

# Sipsy Recovery API - Quick Deploy Script
# This creates the GitHub repo structure locally, ready to push

set -e

echo "🚀 Setting up Sipsy Recovery API..."
echo ""

# Create directory
mkdir -p sipsy-recovery-api
cd sipsy-recovery-api

# Copy all files
cp ../railway-deployment-package/* .

# Initialize git
git init
git config user.name "Hala"
git config user.email "hala@sipsy.com"

# Add all files
git add .
git commit -m "Initial commit: Sipsy recovery API"

echo ""
echo "✅ Local setup complete!"
echo ""
echo "Next steps:"
echo ""
echo "1. Create a new repo on GitHub:"
echo "   - Go to github.com/new"
echo "   - Name it: sipsy-recovery-api"
echo "   - Make it PUBLIC"
echo "   - Click Create"
echo ""
echo "2. Push to GitHub (copy-paste this):"
echo "   cd sipsy-recovery-api"
echo "   git remote add origin https://github.com/YOUR_USERNAME/sipsy-recovery-api.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Railway:"
echo "   - Go to railway.app"
echo "   - Click 'New Project'"
echo "   - Select 'Deploy from GitHub repo'"
echo "   - Choose sipsy-recovery-api"
echo "   - Wait 2-3 minutes for deployment"
echo ""
echo "4. Copy your Railway URL and update recovery-page-final.html"
echo ""
echo "Questions? Check QUICK_START.md"
