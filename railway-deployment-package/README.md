# Sipsy Cart Recovery API

Dynamic discount code assignment for abandoned cart recovery emails.

## Quick Deploy to Railway (5 minutes)

### Step 1: Create GitHub Repo
1. Go to github.com and create a NEW public repo called `sipsy-recovery-api`
2. Clone it locally (or use GitHub's web editor)
3. Copy ALL files from this folder into your repo
4. Commit and push:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

### Step 2: Connect to Railway
1. Go to **railway.app**
2. Sign up with GitHub (free account)
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `sipsy-recovery-api` repo
6. Click "Deploy"
7. Wait 2-3 minutes...

### Step 3: Get Your API URL
1. After deployment, Railway shows your URL
2. Example: `https://sipsy-recovery-prod.up.railway.app`
3. Copy this URL

### Step 4: Test the API
Open this in your browser (replace with your URL):
```
https://YOUR_RAILWAY_URL/api/assign-code?email=test@example.com&type=email2
```

You should see:
```json
{
  "code": "SIPSY5-BB12AD",
  "expiresAt": "2026-03-21T17:30:00.000Z",
  "message": "Code assigned successfully",
  "isNew": true
}
```

### Step 5: Update Recovery Page
1. Open `recovery-page-final.html` (in your workspace)
2. Find this line:
   ```javascript
   const API_BASE = 'https://sipsy-recovery.vercel.app';
   ```
3. Replace with your Railway URL:
   ```javascript
   const API_BASE = 'https://YOUR_RAILWAY_URL';
   ```
4. Upload the updated HTML to Shopify:
   - Admin → Online Store → Pages
   - Edit "Cart Recovery" page
   - Replace the HTML

## API Endpoints

### Assign Code
```
GET /api/assign-code?email=customer@example.com&type=email2
```
- `email` (required): Customer email
- `type` (optional): `email2` or `email3` (default: email2)

**Response:**
```json
{
  "code": "SIPSY5-BB12AD",
  "expiresAt": "2026-03-21T17:30:00.000Z",
  "message": "Code assigned successfully",
  "isNew": true
}
```

### Mark Code as Used
```
POST /api/mark-used?code=SIPSY5-BB12AD
```

### Get Statistics
```
GET /api/stats
```

## How It Works

1. Email sent to customer with link:
   ```
   https://sipsy.com/pages/recover?email={{ customer.email }}&type=email2
   ```

2. Customer clicks link

3. Recovery page calls API:
   ```
   /api/assign-code?email=john@example.com&type=email2
   ```

4. API responds with unique code:
   ```
   SIPSY5-BB12AD
   ```

5. Page displays code

6. Customer clicks "Apply & Go to Checkout"

7. Redirected to:
   ```
   /checkout?discount=SIPSY5-BB12AD
   ```

## Code Batches

- **Email 2**: 51 unique codes
- **Email 3**: 12 unique codes
- **Total**: 63 codes available
- **Expiration**: 48 hours from assignment
- **Usage**: 1-time use per code

## Adding More Codes

When you run out of codes:
1. Generate new codes via Shopify API
2. Add them to `server.js` in the EMAIL2_CODES or EMAIL3_CODES arrays
3. Commit and push
4. Railway auto-redeploys (2 min)

## Troubleshooting

**Q: Getting 404 on /api/stats?**
A: Server may still be starting. Wait 30 seconds and refresh.

**Q: Code says "Code already assigned"?**
A: Same customer clicked the link twice. This is correct behavior - they get the same code.

**Q: No available codes error?**
A: All 51/12 codes used. Contact Lyra to add more.

## Support

If anything breaks:
1. Check Railway logs (View Logs button in Railway dashboard)
2. Email api@sipsy.com with error message
3. Or contact support

---

**Deployed successfully?** Update your Shopify email links and activate the workflow! 🚀
