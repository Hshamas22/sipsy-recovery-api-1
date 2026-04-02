# Sipsy Email Marketing Strategy - Shopify Native App
**Date:** March 20, 2026  
**Platform:** Shopify Email (built-in, $0-$1 per 1000 emails)  
**Goal:** Test email segments with zero platform costs

---

## Why Shopify Email Works

✅ **Free/cheap** ($0 for basic, ~$1 per 1000 emails)
✅ **Built into Shopify** (no integrations needed)
✅ **Customer segmentation** via tags
✅ **Campaign builder** (drag & drop)
✅ **Automation workflows** (limited but functional)
✅ **Performance tracking** (open rate, click rate, conversions)

**Limitation:** Can't do advanced automation like Klaviyo, but **good enough to test segments and get data**

---

## Implementation: 5-Step Setup

### Step 1: Tag Your Customers (This Week)

You need to add tags to past orders so you can segment in Shopify Email.

**How to tag in Shopify Admin:**
1. Go to **Orders** → Click an order
2. Scroll to **Customer** section
3. Click customer name → **Edit tags**
4. Add tags (comma separated): `gift, tequila, repeat`
5. Save

**Tag Schema:**

| Tag | Meaning | How to Identify |
|-----|---------|-----------------|
| `gift` | Ordered Gift Box | Order contains "Gift Box" product |
| `tequila` | Tequila lover | Order contains "Tequila" or "Mezcal" |
| `whiskey` | Whiskey lover | Order contains "Whiskey", "Bourbon", "Scotch", "Rye" |
| `champagne` | Champagne lover | Order contains "Champagne", "Prosecco", "Sparkling" |
| `repeat` | 2+ purchases | Customer has multiple orders |
| `vip` | Best customers | Spent $300+ or repeat buyer |

**Quick Script to Help (Read your past 100 orders):**

From your recent orders, I identified:
- **Gift buyers:** Orders with "Gift Box" (need to tag these manually)
- **Tequila buyers:** Fortaleza, Mijenta, etc. (need tags)
- **Whiskey buyers:** Maker's Mark, Lagavulin (need tags)
- **Champagne buyers:** Veuve, Moët (need tags)

**Time estimate:** 30-45 minutes to tag 100 past orders

---

### Step 2: Create Email Segments in Shopify

**Go to:** Shopify Admin → Apps & Sales Channels → Email

**Create these segments:**

**Segment 1: Gift Buyers**
- Filter: Customers with tag = `gift`
- Count: ~10-15 customers
- Frequency: Monthly campaigns

**Segment 2: Tequila Lovers**
- Filter: Customers with tag = `tequila`
- Count: ~15-20 customers
- Frequency: Monthly + seasonal (spring = margarita season)

**Segment 3: Whiskey Connoisseurs**
- Filter: Customers with tag = `whiskey`
- Count: ~12-18 customers
- Frequency: Bi-weekly

**Segment 4: Champagne Lovers**
- Filter: Customers with tag = `champagne`
- Count: ~8-12 customers
- Frequency: Seasonal (holidays, celebrations)

**Segment 5: Repeat Customers (VIP)**
- Filter: Customers with tag = `repeat` OR `vip`
- Count: ~4-8 customers
- Frequency: Monthly exclusive access

**Segment 6: All Customers (Monthly Newsletter)**
- Filter: All customers
- Count: 100+ customers
- Frequency: 1x per month (what's new, featured products)

---

### Step 3: Build Email Templates

**Template 1: "New Product Alert" (Segment-Specific)**

```
Subject: 🥃 New Tequila Just Arrived - For Tequila Lovers Like You

Hi {{ customer_first_name }},

We just added something special to our collection...

[PRODUCT SHOWCASE: 2-3 tequilas with images, descriptions, prices]

Why these? Because you loved [Product They Bought]. These are similar style/region/price point.

👉 [SHOP NEW TEQUILAS]

Questions? Reply to this email.

Cheers,
Sipsy Team
```

**Template 2: "Gift Campaign" (Seasonal)**

```
Subject: 🎁 Perfect Gift for the Spirit Lover in Your Life

Hi {{ customer_first_name }},

Someone special coming up? We've curated the perfect gifts...

[GIFT COLLECTION: Pre-packaged gift sets, gift boxes, cocktail kits]

And if you buy THIS month:
✅ Free gift wrapping
✅ Personalized gift card
✅ Same-day shipping (if available)

👉 [SHOP GIFT SETS]

Already have what you want? Gift your friend a $25 credit instead:
[GIFT CREDIT LINK]

Cheers,
Sipsy Team
```

**Template 3: "Exclusive VIP" (Repeat Customers)**

```
Subject: VIP: New Release - First Access for Our Best Customers

Hi {{ customer_first_name }},

You're one of our favorite customers. Here's something special...

[LIMITED RELEASE: 1-2 rare/new bottles, VIP pricing, limited quantity]

This is members-only for 48 hours. Then it goes public.

Quantity: Very limited (only 5 bottles)
Price: $XXXX (20% off public price)

👉 [CLAIM NOW - EXPIRES IN 48 HOURS]

Thanks for being an amazing customer!

Sipsy Team
```

**Template 4: "Educational/Pairing" (Bi-weekly)**

```
Subject: The Whiskey Debate: Scotch vs. Irish - Which is Better?

Hi {{ customer_first_name }},

This week we're diving into one of spirits' biggest debates...

[CONTENT: Article/education about whiskey differences, with product recommendations interspersed]

Curious to try the difference? Here are two bottles we recommend:

[Product A: Scotch example with image + price]
[Product B: Irish example with image + price]

👉 [SHOP WHISKEYS]

Cheers,
Sipsy Team
```

---

### Step 4: Schedule Campaigns

**Monthly Calendar (Repeat Each Month)**

| Week | Campaign | Segment | Subject Theme |
|------|----------|---------|---------------|
| Week 1 | New Product Alert | Tequila Lovers | "New Tequila Arrivals" |
| Week 2 | New Product Alert | Whiskey Lovers | "New Whiskey Released" |
| Week 3 | Educational Email | All (Rotating topic) | Pairings, stories, education |
| Week 4 | Seasonal Campaign | Based on month | Gifts, holidays, themes |

**Seasonal Campaigns (Already Planned)**

| Month | Campaign | Segment | Subject |
|-------|----------|---------|---------|
| March | Spring Ready | Tequila | "Margarita Season is Here" |
| May | Father's Day | Whiskey | "Dad's Whiskey Gift Guide" |
| June-Aug | Summer | Champagne | "Celebrate the Season" |
| Oct-Nov | Holiday | Gift Buyers | "Holiday Gift Guide 2026" |
| Dec | New Year | All | "Toast to 2027" |

---

### Step 5: Automate Welcome Series (Already Built ✅)

You already have abandoned cart recovery live. Add this automation:

**New Customer Welcome (3-email series)**

Email 1: "Welcome to Sipsy" (immediate)
- Subject: "Welcome! Here's your $5 discount"
- Content: Brand story, why we're different
- CTA: [SHOP NOW] with discount code
- Send: Day 0

Email 2: "Here's Your Personalized Picks" (Day 3)
- Subject: "Based on what you ordered..."
- Content: Product recommendations (if you bought tequila, here's similar)
- CTA: Shop recommendations
- Send: Day 3

Email 3: "Join Our VIP List" (Day 7)
- Subject: "Early access to new releases (just for VIP)"
- Content: VIP benefits, exclusive access, loyalty
- CTA: [JOIN VIP] + 10% off next purchase
- Send: Day 7

---

## How to Execute in Shopify Email

### Creating a Campaign

1. **Admin → Apps & Sales Channels → Email**
2. Click **Create Campaign**
3. **Name:** "Tequila New Product - March 2026"
4. **Select Customers:**
   - Filter by tag: `tequila`
5. **Choose Template** or **Build from Scratch**
   - Use Shopify's drag-and-drop editor
   - Add product blocks (automatic syncing)
   - Add images from your products
6. **Write Copy** (use templates above)
7. **Preview & Test** (send to yourself first)
8. **Schedule:**
   - Immediate send, OR
   - Schedule for specific day/time
   - Best send times: Tuesday-Thursday, 10am-2pm
9. **Send!**
10. **Track Results:**
    - Dashboard shows: Open rate, Click rate, Conversions
    - Review metrics after 3 days, 7 days, 14 days

---

## Tagging Your Customers (Detailed Steps)

**Fast Method (If You Have < 50 Orders):**

1. Go to **Orders** in Shopify Admin
2. Sort by newest first
3. For each order:
   - Click the order number
   - Click customer name
   - Click **[Edit]** next to customer tags
   - Enter tags: `tequila, gift` (comma separated)
   - Click **Save**
   - Go back to orders, repeat

**Time:** ~1-2 minutes per order = 45 minutes for 100 orders

---

## Email Copy Templates (Ready to Use)

### Tequila Email Subject Lines
- 🥃 New Tequila Just Arrived
- Limited-Edition Tequila (Only 3 bottles)
- Why Reposado? Your Guide to Tequila Aging
- Margarita Season: Perfect Tequilas for Spring
- From Agave to Glass: Our New Tequila Story

### Whiskey Email Subject Lines
- ⭐ New Whiskey Release (Members First)
- Scotch vs. Bourbon: What's the Difference?
- The Maker's Mark You've Been Waiting For
- Whiskey & Food: The Ultimate Pairing Guide
- Limited: 18-Year-Old Scotch (Only 2 Bottles)

### Gift Email Subject Lines
- 🎁 The Perfect Gift for [Holiday]
- Gifting Made Easy: Pre-Packaged Collections
- Surprise Someone Special (Free Gift Wrapping Included)
- Corporate Gift Sets: Impress Your Team
- 48-Hour Gift Wrap Shipping

### Champagne Email Subject Lines
- 🍾 Toast to [Occasion] With Premium Champagne
- Veuve Clicquot vs. Moët: Which One?
- Celebrate In Style: Our Prestige Bubbly Collection
- Why Champagne is Worth the Splurge

### VIP/Loyalty Email Subject Lines
- VIP EXCLUSIVE: Early Access (Expires in 48 Hours)
- You're Our Favorite Customer - Here's Something Special
- Members-Only Release: [Limited Product]
- Thank You: 10% Off Exclusive to Our Best Customers

---

## Metrics to Track

**After Each Campaign, Check:**

| Metric | What It Means | Good Target |
|--------|---------------|------------|
| **Open Rate** | % who opened the email | 20-35% |
| **Click Rate** | % who clicked a link | 3-8% |
| **Conversion Rate** | % who bought something | 1-3% |
| **Revenue Per Email** | Total revenue ÷ emails sent | $0.50-2.00 |
| **Unsubscribe Rate** | % who opted out | <1% is good |

**Example:**
- Send to 50 tequila customers
- 15 open it (30% = good!)
- 3 click a link (6% = good!)
- 1 buys something (2% = good!)
- Revenue: $150
- Cost: $0.05 (1 email)
- ROI: 3000x

---

## First 30 Days: Action Plan

### Week 1
- [ ] Tag 50-100 past orders with customer segments
- [ ] Set up 5 customer segments in Shopify Email
- [ ] Review Smile.io setup (is it active?)

### Week 2
- [ ] Write email copy for 3 templates
- [ ] Create 2 test campaigns (Tequila + Whiskey)
- [ ] Send test emails to yourself
- [ ] Get feedback from Hala on copy

### Week 3
- [ ] Launch first 2 campaigns
- [ ] Monitor open rates, clicks, conversions
- [ ] Create 2 more templates (Gift + Champagne)

### Week 4
- [ ] Analyze results from Week 3 campaigns
- [ ] Optimize: Which subject lines worked? Which products?
- [ ] Plan next month's campaigns
- [ ] Scale: Send more campaigns based on what worked

---

## Expected Results (30 Days)

**Conservative Estimate:**

- **Campaigns sent:** 5 (2 tequila, 2 whiskey, 1 gift)
- **Total emails:** 250 (50 customers × 5 campaigns)
- **Average open rate:** 25% = 63 opens
- **Average click rate:** 4% = 10 clicks
- **Average conversion rate:** 2% = 5 orders
- **Avg order value:** $150
- **Total revenue from email:** $750
- **Cost:** $0.25 (1 email to 250 people)
- **ROI:** 3000x

**After 3 months:** If this holds, you'd be at $2,250 additional revenue per month = $27,000/year

---

## Shopify Email Limitations (Know These)

⚠️ **Can't do:**
- Advanced A/B testing (one variant per campaign, not unlimited)
- Complex automation workflows (basic only)
- Detailed customer journey mapping (Klaviyo level)
- Dynamic content based on past behavior (beyond basic)

✅ **Can do:**
- Tag-based segmentation
- Basic campaigns (send email to tagged customers)
- Basic automation (welcome series, recovery emails)
- Campaign performance tracking
- Discount codes in emails
- Product recommendations (manual)

**Bottom line:** Shopify Email is 70% of Klaviyo's power at 5% of the cost. **Perfect for testing.**

---

## When to Upgrade to Klaviyo (If Needed)

Upgrade **only if:**
- Email becomes responsible for >30% of monthly revenue (means it's working!)
- You want advanced automation (conditional logic, complex flows)
- You need SMS + Email unified platform
- You have >5000 active customers

**Don't upgrade** just because something else is better. Shopify Email is **good enough** to start and measure ROI.

---

## Next Step: Confirm Setup

**Before we start tagging, confirm:**

1. ✅ Shopify Email app is installed & active in your store?
2. ✅ You can access Shopify Admin → Apps → Email?
3. ✅ Want me to create a tagging guide with your actual products?
4. ✅ Smile.io: Is it active (customers earning points)?

Once confirmed, we can:
- Build the tagging list (so you know which orders get which tags)
- Write the first batch of email templates
- Launch your first campaigns this week

Sound good? 🚀
