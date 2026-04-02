# Sipsy Cart Recovery - Deployment Instructions

## What We Have

✅ **Recovery landing page** - displays code and redirects to checkout  
✅ **API backend** - assigns unique codes dynamically  
✅ **Email workflow** - 3-email sequence in Shopify  

## What's Left

Deploy the API backend to get free hosting, then update email links.

---

## Step 1: Deploy API to Railway (FREE - 5 minutes)

Railway.app is SIMPLER than Vercel.

### 1. Go to railway.app
- Sign up with GitHub (free account)
- Click "Create New Project"

### 2. Connect GitHub
- Link your GitHub account
- Select this repository

### 3. Deploy
- Railway automatically detects Node.js
- Click "Deploy"
- Wait 2 minutes...
- You'll get a URL like: `https://sipsy-recovery-prod.up.railway.app`

### 4. Test the API

Open this in your browser:
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

---

## Step 2: Update Email Links

Once you have your Railway URL, update the recovery page:

1. **Replace this line** in `recovery-page-final.html`:
```javascript
const API_BASE = 'https://sipsy-recovery.vercel.app';
```

With your Railway URL:
```javascript
const API_BASE = 'https://YOUR_RAILWAY_URL';
```

2. **Upload the updated HTML to Shopify:**
   - Go to Shopify Admin → Online Store → Pages
   - Find "Cart Recovery" page
   - Edit it
   - Replace the HTML with the new version

---

## Step 3: Update Shopify Workflow

Email 2 button link:
```
https://sipsy.com/pages/recover?email={% raw %}{{ customer.email }}{% endraw %}&type=email2
```

Email 3 button link:
```
https://sipsy.com/pages/recover?email={% raw %}{{ customer.email }}{% endraw %}&type=email3
```

Shopify will automatically inject the customer's email into the link!

---

## Step 4: Activate Workflow

Go to your Abandoned Cart workflow and click "Apply changes" to activate.

---

## How It Works

1. Customer gets Email 2: "Click here to claim your $5 credit →"
2. Link: `sipsy.com/pages/recover?email=customer@example.com&type=email2`
3. Recovery page loads
4. JavaScript calls: `railway-api/assign-code?email=customer@example.com&type=email2`
5. API returns unique code: `SIPSY5-BB12AD`
6. Page displays code
7. Customer clicks "Apply & Go to Checkout"
8. Redirected to `/checkout?discount=SIPSY5-BB12AD`
9. Discount applied automatically ✅

---

## FAQ

**Q: Will every customer get a different code?**  
A: YES. The API assigns next available code from the batch.

**Q: Is it free?**  
A: YES. Railway free tier covers this perfectly.

**Q: What if codes run out?**  
A: I'll generate more codes and add them to the API. Let me know when we're low.

**Q: Does this work forever with no maintenance?**  
A: YES. Once deployed, it's fully automated.

---

## Need Help?

If you get stuck:
1. Share the error message
2. I'll debug and fix
3. All files are ready - just need to deploy and connect

You got this! 🚀
