# Sipsy Preference Collection System - Deployment Guide

**Status:** Ready to deploy ✅  
**Date:** March 20, 2026  
**Components:** Email template + Landing page + API endpoint

---

## 🎯 How It Works

1. **Email is sent** to "Never Purchased" segment
   - Contains: "Tell Us Your Interests" button
   - Link includes: `?email={{customer.email}}&utm_source=email&utm_campaign=preference-collection`

2. **User clicks button** → Goes to preference landing page
   - Email parameter automatically passed via URL
   - User selects interests (tequila, whiskey, sales, etc.)
   - Clicks "Save Preferences"

3. **Backend API is called**
   - Frontend sends: `email + interests array`
   - API finds customer in Shopify
   - API applies tags: `Pref-Tequila`, `Pref-Sales`, etc.
   - Tags created automatically

4. **Results**
   - Customer is now tagged by preferences
   - You can segment on these tags for future campaigns
   - User redirected to sipsy.com home page

---

## Step 1: Deploy API Update to Railway

The new endpoint is already code-ready in `/api-backend.js`.

### Option A: Deploy via GitHub (Recommended)

1. Go to your **sipsy-recovery-api** GitHub repo
2. Edit the file or create new `endpoints/preferences.js`
3. Add the code from the updated `api-backend.js`
4. Commit & push
5. Railway will auto-deploy (watch the Railway dashboard)

### Option B: Direct Railway Deployment

1. SSH into Railway or use Railway CLI
2. Upload updated `api-backend.js`
3. Restart the service

**Endpoint will be:**
```
POST https://sipsy-recovery-api-production.up.railway.app/api/update-preferences
```

**Test the endpoint:**
```bash
curl -X POST https://sipsy-recovery-api-production.up.railway.app/api/update-preferences \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "interests": ["tequila", "sales", "cocktail-recipes"]
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Preferences saved and customer tagged",
  "customer": {
    "id": "gid://shopify/Customer/123456",
    "email": "test@example.com",
    "tags": "Pref-Tequila, Pref-Sales, Pref-Cocktail-Recipes, Preference-Collected"
  },
  "interests": ["tequila", "sales", "cocktail-recipes"],
  "timestamp": "2026-03-20T20:22:00Z"
}
```

---

## Step 2: Create Landing Page in Shopify

### Option A: Upload as Shopify Page (Best)

1. Shopify Admin → **Online Store → Pages**
2. Click **Add Page**
3. **Title:** "Your Preferences"
4. **Handle:** `preferences` (URL will be sipsy.com/pages/preferences)
5. **Go to Theme Code** → Edit the page
6. Copy entire HTML from `/SIPSY_PREFERENCE_LANDING_PAGE.html`
7. Paste into the page template
8. **Save**

### Option B: Custom Domain/Subdomain

If you want `prefs.sipsy.com`:
1. Create DNS CNAME pointing to Shopify
2. Deploy the HTML file to a separate host (Vercel, Netlify, etc.)
3. Update email link to new URL

**Recommendation:** Use Shopify Pages (Option A) - simpler, all in one place.

---

## Step 3: Create Email in Shopify

### In Shopify Email Builder:

1. Shopify Admin → **Apps → Shopify Email**
2. Click **Create Campaign**
3. **Audience:** Select "Never Purchased" segment
4. **Email Type:** Campaign
5. **Subject Line:** "We Want to Know You" (or similar)
6. **Template:** Custom Liquid

### Add Email Body:

Go to **Custom Liquid** and paste the entire HTML from `/SIPSY_PREFERENCE_EMAIL.html`

**Key variables:**
- `{{customer.email}}` - Automatically filled by Shopify
- Email button automatically includes email + UTM params

### Before Sending:

1. **Test it!**
   - Send a test email to yourself
   - Click the button
   - Verify landing page works
   - Fill out preferences
   - Check that tags were applied in Shopify Admin → Customers

2. **Schedule or send**
   - Set send time (9 AM or 7 PM usually works best)
   - Send to full "Never Purchased" segment
   - Watch the click rate (target: 20%+ is good)

---

## Expected Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Send to | 28,249 (Never Purchased) | ✅ |
| Email open rate | 20-25% | TBD |
| Click rate (button) | 5-10% | TBD |
| Preference form completion | 80%+ of clickers | TBD |
| Avg interests selected | 3-5 per person | TBD |

---

## What Happens Next

After customers submit preferences:

### Auto-Generated Tags
Each customer will have tags like:
- `Pref-Tequila`
- `Pref-Sales`
- `Pref-Cocktail-Recipes`
- `Preference-Collected`

### Create New Segments
1. Shopify Admin → **Customers → Segments**
2. Create rule: `Has tag "Pref-Tequila"`
3. Name: "Tequila Preference"
4. Repeat for each interest

### Send Targeted Emails
- Send tequila content only to "Tequila Preference" segment
- Send sales emails to "Pref-Sales" segment
- Send sustainable products to "Pref-Sustainable" segment

**Result:** 10x better email engagement because you're sending what people actually want! 🎯

---

## Files Needed

| File | Purpose |
|------|---------|
| `/api-backend.js` (updated) | New `POST /api/update-preferences` endpoint |
| `/SIPSY_PREFERENCE_EMAIL.html` | Email template (Custom Liquid) |
| `/SIPSY_PREFERENCE_LANDING_PAGE.html` | Landing page HTML (Shopify Page) |

---

## Troubleshooting

### "Customer not found" error
- Email parameter might be missing or invalid
- Check the URL has `?email=...`

### Tags not appearing
- Check API response - did it return success?
- Verify Shopify token has permission to update tags
- Check Shopify API logs

### Landing page doesn't load
- Make sure Shopify page is published
- Check the page handle matches the URL
- Test in incognito mode

### Form won't submit
- Check browser console for errors
- Verify API endpoint is accessible
- Test API directly with curl

---

## Summary

**To launch the preference collection system:**

1. ✅ Deploy API update to Railway
2. ✅ Create page in Shopify (copy-paste HTML)
3. ✅ Create email in Shopify (copy-paste HTML)
4. ✅ Test with one person
5. ✅ Send to full "Never Purchased" segment
6. ✅ Wait 24-48 hours for submissions
7. ✅ Create segments based on tags collected
8. ✅ Send targeted follow-up campaigns

**Timeline:** 30 minutes to launch, 2-3 days to collect data, 1 week to see results 🚀
