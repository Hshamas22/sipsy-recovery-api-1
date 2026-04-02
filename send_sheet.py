import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

sender = 'lyrasipsy@gmail.com'
recipient = 'hala@sipsy.com'
app_password = 'cokjrurvnmyqbqle'

msg = MIMEMultipart()
msg['Subject'] = '📊 Sipsy Project Tracker — Import to Google Sheets'
msg['From'] = 'Lyra (Sipsy AI) <lyrasipsy@gmail.com>'
msg['To'] = recipient

body = """Hi Hala,

Here's your Sipsy project tracker as a CSV file. Import it into Google Sheets in 3 steps:

1. Open Google Sheets → sheets.new
2. Go to File → Import → Upload → select this file
3. Choose "Replace spreadsheet" → Import

All 17 tasks are in there organized by category, priority, and status.

Once it's imported, I'd suggest:
• Freeze the top row (View → Freeze → 1 row)
• Add a filter (Data → Create a filter) so you can sort by Priority or Status

Let me know if you need anything else!

— Lyra ✨
"""

msg.attach(MIMEText(body, 'plain'))

with open('/home/hshamas/.openclaw/workspace/sipsy_projects.csv', 'rb') as f:
    part = MIMEBase('application', 'octet-stream')
    part.set_payload(f.read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename="Sipsy_Projects.csv"')
    msg.attach(part)

with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
    server.login(sender, app_password)
    server.sendmail(sender, recipient, msg.as_string())
    print('Email sent!')
