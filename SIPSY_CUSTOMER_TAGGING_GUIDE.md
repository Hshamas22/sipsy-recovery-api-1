# Sipsy Customer Tagging Guide
**Date:** March 20, 2026  
**Goal:** Tag 100+ past orders for email segmentation  
**Time:** 30-45 minutes  
**Benefit:** Enables targeted email campaigns (high ROI)

---

## Quick Reference: Tag By Product

### TEQUILA 🥃 (14 products)
**Tag:** `tequila`

```
1800 Reposado Tequila (1.75L, 750ml)
1800 Silver Tequila (1.75L, 750ml)
Alma Del Jaguar Barricas 2025 5-Bottle Collector's Set
Alma Del Jaguar Tequila Blanco & Reposado - 2-Pack
Alma Del Jaguar Tequila Blanco - 750ml
Alma Del Jaguar Tequila Reposado - 750ml
Alma del Jaguar Añejo Tequila - 750ml
Alma del Jaguar Tequila Blanco Reposado & Añejo - 3-Pack
Altos Tequila Plata - 750ml
Casa Dragones Joven Tequila - 750ml
Fortaleza Blanco Tequila - 750ml
Mijenta Tequila Reposado Symphony Series No. 2 - 750ml
```

---

### WHISKEY 🥃 (6 products + Bourbon/Rye/Scotch)
**Tag:** `whiskey`

```
1792 Small Batch Bourbon - 750ml
Angels Envy Bottled-In-Bond (Cask Strength) Bourbon - 750ml
Ardbeg 10 Year Old Single Malt Scotch Whisky - 750ml
Ardbeg Ardcore Single Malt Scotch Whisky - 750ml
Ardbeg BizarreBQ Limited Edition Islay Single Malt Scotch Whisky - 750ml
Ardbeg Traigh Bhan 19-Year-Old Single Malt Scotch Whisky - 750ml
Lagavulin Offerman Edition 11-Year-Old Charred Oak Cask - 750ml
Maker's Mark Straight Bourbon - 750ml
Whiskey Sidecar Cocktail Set - 6-8 Servings

(+ Any other bourbon, rye, Irish, or scotch)
```

---

### CHAMPAGNE & SPARKLING 🍾 (2+ products)
**Tag:** `champagne`

```
Albet i Noya Rosé Pet Nat Natural Sparkling Wine - 750ml
Andre Champagne Extra Dry - 750ml
Moët & Chandon 2025 End-of-Year Brut Champagne - 750ml
Veuve Clicquot Champagne Yellow Arrow Gift Box
Veuve Clicquot Ice Jacket - 750ml
(+ Any Champagne, Prosecco, Sparkling Wine)
```

---

### GIFT ITEMS & GIFT WRAPPING 🎁
**Tag:** `gift`

```
Gift Box (Fits one bottle)
Amaro Nonino Quintessentia Tumbler Gift Set - 750ml
ANY order that includes "Gift Box" product

Note: If customer also bought tequila + gift box:
TAG BOTH: tequila, gift
```

---

### COCKTAIL KITS & SETS
**Tag:** `cocktail` (optional) or combo tag

```
Aperol Spritz Cocktail Pack
Whiskey Sidecar Cocktail Set - 6-8 Servings
(+ Any pre-made cocktail kits)
```

---

### REPEAT CUSTOMERS 🔄
**Tag:** `repeat`

**Identify:** Anyone who appears in multiple orders (search by email)

```
Step 1: Go to Orders
Step 2: Look for same customer name/email appearing 2+ times
Step 3: Tag both orders with "repeat"

Example:
- Order #3310 from jane@email.com → TAG: repeat
- Order #3295 from jane@email.com → TAG: repeat
```

---

### VIP CUSTOMERS (Optional - High Value)
**Tag:** `vip`

**Identify:** Customers with:
- 2+ purchases (repeat buyers), OR
- Total spend > $300, OR
- Recently purchased premium bottles ($150+)

---

## How to Tag in Shopify (Step-by-Step)

### Method 1: Via Orders List (Fastest for <50 orders)

1. **Go to:** Shopify Admin → Orders
2. **Sort:** Newest first (start with recent, easier to remember)
3. **For each order:**
   - Click the order number (#3310, etc.)
   - Scroll to **Customer** section
   - Click the **customer name** (it's a link)
   - Click **[Edit]** next to "Tags"
   - **Type tags (comma separated):**
     ```
     Example 1: tequila, repeat
     Example 2: champagne, gift
     Example 3: whiskey
     Example 4: tequila, gift, repeat
     ```
   - Click **Save**
   - Go back to Orders (browser back button)
   - Move to next order
   
4. **Repeat for 100 orders** (takes ~30-45 min)

### Method 2: Bulk Tagging (If You Know Emails)

You can potentially bulk-tag via Shopify API, but manual is safer for first pass.

---

## Tag Combinations (Examples)

| Order Contains | Tags to Add |
|---|---|
| Just Fortaleza Tequila | `tequila` |
| Tequila + Gift Box | `tequila, gift` |
| Maker's Mark + Gift Box | `whiskey, gift` |
| Veuve Clicquot | `champagne` |
| Champagne + Gift Wrap | `champagne, gift` |
| Customer's 3rd order (any product) | `repeat` or `repeat, [spirit type]` |
| Champagne + 2+ prior orders | `champagne, repeat, vip` |
| Whiskey Sidecar (cocktail kit) | `whiskey, cocktail` |

---

## Checklist: Orders to Tag

**Start here. Go through your 100 orders and tag each:**

```
[ ] Order #3310 - Tequila → tag: tequila, gift
[ ] Order #3309 - Whiskey → tag: whiskey, gift
[ ] Order #3308 - Champagne → tag: champagne
[ ] Order #3307 - Tequila (repeat) → tag: tequila, repeat
... (continue for 100 orders)
```

**Pro tip:** Use this rhythm:
1. Open order
2. Identify product type (use quick ref table above)
3. Check if customer appears elsewhere (repeat check)
4. Add tags
5. Save & go next

**Realistic speed:** 1-2 orders per minute = 50-100 orders in 30-60 minutes

---

## After Tagging: Verify in Shopify Email

Once you've tagged 50+ orders, verify it worked:

1. **Go to:** Shopify Admin → Apps & Sales Channels → Email
2. **Click "Audiences"** (or "Segments")
3. **Create Test Segment:**
   - Name: "Tequila Test"
   - Filter: Customers with tag = `tequila`
   - It should show "X customers match this"
   - If you see a number > 0, tagging worked! ✅

---

## Product Categories (Full Catalog)

### All Tequila (14 products)
- 1800 Reposado Tequila (1.75L, 750ml)
- 1800 Silver Tequila (1.75L, 750ml)
- Alma Del Jaguar Tequila (Blanco, Reposado, Añejo, 2-Pack, 3-Pack, 5-Pack)
- Altos Tequila Plata
- Casa Dragones Joven Tequila
- Fortaleza Blanco Tequila
- Mijenta Tequila Reposado Symphony Series No. 2

### All Whiskey (6+ products)
- 1792 Small Batch Bourbon
- Angels Envy Bottled-In-Bond Bourbon
- Ardbeg (10 Year, Ardcore, BizarreBQ, Traigh Bhan 19-Year)
- Lagavulin Offerman Edition 11-Year
- Maker's Mark Straight Bourbon
- Whiskey Sidecar Cocktail Set

### All Champagne/Sparkling (2+ products)
- Albet i Noya Rosé Pet Nat Natural Sparkling Wine
- Andre Champagne Extra Dry
- Moët & Chandon 2025 End-of-Year Brut Champagne
- Veuve Clicquot (Champagne, Ice Jacket)

### Liqueur & Other Spirits (40+ products)
- Alma Finca Liqueur
- Ancho Reyes Chile Liqueur (375ml, 750ml)
- Aperol Aperitivo & Spritz Cocktail Pack
- Baileys Coffee Liqueur
- Brandies, Cognacs, Other spirits

### Gift Items
- Gift Box (Fits one bottle)
- Amaro Nonino Quintessentia Tumbler Gift Set

---

## Smile.io Check: Is It Active?

### How to Verify Smile.io is Running

**In Shopify Admin:**

1. **Go to:** Apps & Sales Channels → Apps & integrations
2. **Search:** "Smile" or "Rewards"
3. **Look for:** "Smile Loyalty & Referrals" app

**If it appears, check:**
- **Is it installed?** (should show "Open" button)
- **Click "Open"** → Go to Smile.io dashboard
- **Check Settings:**
  - Are points enabled on purchases? (check)
  - Do customers see a points widget on the product page?
  - Can customers see their points in their account?

**If NOT installed:**
- You'll need to install it from the Shopify App Store

### What Smile.io Enables

✅ **If Smile.io is active:**
- Customers earn points on purchases (e.g., 1 point per $1)
- They can redeem points for discounts
- You can create VIP tiers (Bronze, Gold, Platinum)
- Email can segment by points balance or tier

✅ **This means:**
- You can email VIP customers with "members-only" offers
- You can track repeat customers better
- You can offer "earn points" incentives in email

---

## Next Steps (Today)

### TODAY (Hour 1)
- [ ] Read this tagging guide
- [ ] Check if Smile.io is installed (5 min)
- [ ] Report back on Smile.io status

### TODAY (Hour 2-3)
- [ ] Start tagging orders (30-45 min)
- [ ] Tag at least first 20 orders to get rhythm

### TOMORROW
- [ ] Finish tagging remaining 80 orders
- [ ] Verify tagging in Shopify Email (create test segment)

### Day 3
- [ ] Start writing first email campaigns
- [ ] Schedule "New Tequila" email to tequila segment
- [ ] Send test email to yourself

---

## Questions?

1. **Smile.io:** Can you check if it's installed and report back?
2. **Tagging:** Once you've tagged 20 orders, reply with the count so I know you've started
3. **Next:** After tagging, should I write campaign email templates?

---

**Goal:** Tag 100 orders = 7 customer segments ready = Targeted email campaigns = Higher ROI than ads

Let's go! 🚀
