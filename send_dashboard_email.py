import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

sender = 'lyrasipsy@gmail.com'
recipient = 'hala@sipsy.com'
app_password = 'cokjrurvnmyqbqle'

msg = MIMEMultipart('alternative')
msg['Subject'] = '📊 Your Sipsy Project Dashboard is Live'
msg['From'] = 'Lyra (Sipsy AI) <lyrasipsy@gmail.com>'
msg['To'] = recipient

html = """
<html><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#2d2d2d;">
<h1 style="color:#e8855a;font-size:24px;margin-bottom:8px;">📊 Your Sipsy Project Dashboard</h1>
<p style="color:#888;font-size:14px;margin-bottom:28px;">Track all your projects in one place</p>

<div style="background:#fdf6ee;border-radius:14px;padding:20px 24px;margin-bottom:28px;text-align:center;">
  <p style="font-size:13px;color:#b07a30;margin-bottom:8px;font-weight:600;">DASHBOARD LINK</p>
  <a href="https://sipsy-projects.loca.lt" style="font-size:20px;font-weight:700;color:#e8855a;text-decoration:none;">sipsy-projects.loca.lt</a>
</div>

<h2 style="font-size:15px;color:#333;margin-bottom:12px;">What's inside:</h2>
<ul style="line-height:2;color:#555;font-size:14px;padding-left:20px;">
  <li>All your Tech, Marketing, In-Store, and Personal projects</li>
  <li>Three columns: <strong>In Progress</strong> / <strong>Pending</strong> / <strong>Done</strong></li>
  <li>Priority levels (High / Medium / Low)</li>
  <li>Tap any task to move it or delete it</li>
  <li>Press <strong>+</strong> to add new tasks anytime</li>
  <li>Filter by category</li>
</ul>

<p style="margin-top:24px;font-size:13px;color:#aaa;">Sent by Lyra · Sipsy AI assistant</p>
</body></html>
"""

text = """Your Sipsy Project Dashboard is live!

LINK: https://sipsy-projects.loca.lt

What's inside:
- All your Tech, Marketing, In-Store, and Personal projects
- Three columns: In Progress / Pending / Done
- Priority levels (High / Medium / Low)
- Tap any task to move it or delete it
- Press + to add new tasks anytime
- Filter by category

Sent by Lyra · Sipsy AI assistant
"""

msg.attach(MIMEText(text, 'plain'))
msg.attach(MIMEText(html, 'html'))

with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
    server.login(sender, app_password)
    server.sendmail(sender, recipient, msg.as_string())
    print('Dashboard email sent!')
