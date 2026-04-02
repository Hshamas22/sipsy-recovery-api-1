import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

sender = 'lyrasipsy@gmail.com'
recipient = 'hala@sipsy.com'
app_password = 'cokjrurvnmyqbqle'

msg = MIMEMultipart('alternative')
msg['Subject'] = '🎬 Sipsy — 20 Instagram/TikTok Content Ideas'
msg['From'] = 'Lyra (Sipsy AI) <lyrasipsy@gmail.com>'
msg['To'] = recipient

html = """
<html><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:620px;margin:0 auto;padding:24px;color:#2d2d2d;">
<h1 style="color:#e8855a;font-size:24px;margin-bottom:4px;">🎬 20 Content Ideas for Sipsy</h1>
<p style="color:#888;font-size:14px;margin-bottom:32px;">Instagram &amp; TikTok — Ready to Film</p>

<h2 style="font-size:16px;color:#555;border-bottom:2px solid #f0ede8;padding-bottom:8px;margin-bottom:16px;">📚 Discovery &amp; Education</h2>
<ol style="line-height:2.2;padding-left:20px;">
<li><strong>"What's actually in your tequila?"</strong> — Hold up an additive-heavy brand vs. a Sipsy additive-free pick. Hook: <em>"This is why you wake up feeling like trash."</em></li>
<li><strong>"Additive-free tequila, explained in 30 seconds"</strong> — Simple, fast, shareable. Sipsy's #1 differentiator.</li>
<li><strong>"Things your liquor store won't tell you"</strong> — 3 quick facts about additives, small-batch, and why cheap tequila hurts.</li>
<li><strong>"Why we don't carry [popular mass brand]"</strong> — Bold, identity-building. Makes Sipsy feel curated.</li>
<li><strong>"The rarest thing in our store right now"</strong> — Show allocated/limited bottles (Blantons, Stagg, Don Julio 1942). Creates FOMO.</li>
</ol>

<h2 style="font-size:16px;color:#555;border-bottom:2px solid #f0ede8;padding-bottom:8px;margin:28px 0 16px;">🎁 Gifting Content</h2>
<ol start="6" style="line-height:2.2;padding-left:20px;">
<li><strong>"Rating your go-to alcohol gifts"</strong> — React to common picks (Tito's, Jack, Casamigos) with honest takes + better Sipsy alternatives.</li>
<li><strong>"The $100 gift that looks like $300"</strong> — Feature the Veuve cooler gift box. Perfect gifting content.</li>
<li><strong>"What to buy your [dad / boss / friend who thinks they know wine]"</strong> — Series format, one per occasion/person type.</li>
<li><strong>"You're invited to a dinner party — what do you bring?"</strong> — Relatable setup → Sipsy answer.</li>
<li><strong>"Gift wrapping a Clase Azul"</strong> — Pure aesthetic/gifting content. No words needed.</li>
</ol>

<h2 style="font-size:16px;color:#555;border-bottom:2px solid #f0ede8;padding-bottom:8px;margin:28px 0 16px;">🏪 Store Experience</h2>
<ol start="11" style="line-height:2.2;padding-left:20px;">
<li><strong>"POV: You just walked into Sipsy"</strong> — Slow pan of the store. Let the vibe speak. Good music.</li>
<li><strong>"New arrivals just dropped"</strong> — Unbox/reveal new products as they come in. Easy repeatable format.</li>
<li><strong>"What Sipsy staff actually drinks off the clock"</strong> — Authenticity + trust-building.</li>
<li><strong>"A day at Sipsy"</strong> — 60-second behind-the-scenes. Store prep, deliveries, customers.</li>
<li><strong>"We're not a liquor store"</strong> — Brand manifesto video. What Sipsy IS: discovery, curation, experience.</li>
</ol>

<h2 style="font-size:16px;color:#555;border-bottom:2px solid #f0ede8;padding-bottom:8px;margin:28px 0 16px;">😄 Engagement &amp; Fun</h2>
<ol start="16" style="line-height:2.2;padding-left:20px;">
<li><strong>"This or That"</strong> — Hold up two bottles side by side. Ask viewers to pick. Wildly shareable.</li>
<li><strong>"Guess the price"</strong> — Show a bottle, ask followers to guess. Reveal. Great for comments.</li>
<li><strong>"Natural wine vs. regular wine — can you tell the difference?"</strong> — Blind taste test format.</li>
<li><strong>"How to build a bar cart under $200"</strong> — Practical, shareable, drives product discovery.</li>
<li><strong>"Sipsy customer vs. Total Wine customer"</strong> — Playful comparison. Lean into the brand identity confidently.</li>
</ol>

<div style="margin-top:40px;padding:16px 20px;background:#fdf6ee;border-radius:12px;font-size:13px;color:#b07a30;">
💡 <strong>Top picks for filming today:</strong> Ideas #1, #6, and #11 — strong hooks, easy to shoot, cover all three content pillars.
</div>

<p style="margin-top:32px;font-size:12px;color:#ccc;">Sent by Lyra · Sipsy AI assistant</p>
</body></html>
"""

text = """20 CONTENT IDEAS FOR SIPSY — Instagram & TikTok

DISCOVERY & EDUCATION
1. "What's actually in your tequila?" — Hook: "This is why you wake up feeling like trash."
2. "Additive-free tequila, explained in 30 seconds" — Sipsy's #1 differentiator.
3. "Things your liquor store won't tell you" — 3 quick facts.
4. "Why we don't carry [popular mass brand]" — Bold, identity-building.
5. "The rarest thing in our store right now" — Show allocated bottles. Creates FOMO.

GIFTING CONTENT
6. "Rating your go-to alcohol gifts" — React to Tito's, Jack, Casamigos + Sipsy alternatives.
7. "The $100 gift that looks like $300" — Veuve cooler gift box.
8. "What to buy your [dad / boss / friend who thinks they know wine]" — Series format.
9. "You're invited to a dinner party — what do you bring?"
10. "Gift wrapping a Clase Azul" — Pure aesthetic content.

STORE EXPERIENCE
11. "POV: You just walked into Sipsy" — Slow store pan, good music.
12. "New arrivals just dropped" — Repeatable unboxing format.
13. "What Sipsy staff actually drinks off the clock" — Authenticity.
14. "A day at Sipsy" — 60-second behind-the-scenes.
15. "We're not a liquor store" — Brand manifesto.

ENGAGEMENT & FUN
16. "This or That" — Two bottles, viewers pick. Wildly shareable.
17. "Guess the price" — Show a bottle, ask followers to guess.
18. "Natural wine vs. regular wine — can you tell the difference?"
19. "How to build a bar cart under $200"
20. "Sipsy customer vs. Total Wine customer"

Top picks for today: #1, #6, #11

Sent by Lyra · Sipsy AI assistant
"""

msg.attach(MIMEText(text, 'plain'))
msg.attach(MIMEText(html, 'html'))

with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
    server.login(sender, app_password)
    server.sendmail(sender, recipient, msg.as_string())
    print('Email sent!')
