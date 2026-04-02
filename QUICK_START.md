# 5-Minute Quick Start

## Files You Need

All in `/railway-deployment-package/`:
- `package.json` ✅
- `server.js` ✅
- `railway.json` ✅
- `README.md` ✅

## The 5 Steps

### 1. Create GitHub Repo (2 min)
```bash
# Go to github.com
# Click "New" → Create repo called "sipsy-recovery-api"
# Clone it or use GitHub web editor
# Copy the 4 files above into the repo
# Commit and push
```

### 2. Deploy to Railway (2 min)
```
1. Go to railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select your sipsy-recovery-api repo
5. Click "Deploy"
6. Wait for green checkmark
```

### 3. Copy Your URL (30 sec)
```
1. Railway dashboard shows your URL
2. Example: https://sipsy-recovery-prod.up.railway.app
3. Copy it
```

### 4. Test It (30 sec)
```
Open in browser:
https://YOUR_URL/api/stats

Should show:
{
  "email2": { "total": 51, "available": 51, ... },
  "email3": { "total": 12, "available": 12, ... }
}
```

### 5. Update Recovery Page (1 min)
```
1. Open recovery-page-final.html
2. Find: const API_BASE = 'https://sipsy-recovery.vercel.app';
3. Replace with: const API_BASE = 'https://YOUR_RAILWAY_URL';
4. Go to Shopify → Pages → Cart Recovery
5. Paste the updated HTML
6. Save
```

## Done! 🎉

Now:
- ✅ Email links point to recovery page
- ✅ Recovery page calls API
- ✅ API assigns unique codes
- ✅ Codes auto-expire in 48 hours
- ✅ Each customer gets different code

## Final Step

Go to Shopify Automations and click "Apply changes" to activate the workflow.

---

**Total time: ~5 minutes**  
**Cost: FREE (Railway free tier)**  
**Maintenance: ZERO (fully automated)**
