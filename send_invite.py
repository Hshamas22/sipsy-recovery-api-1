import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import uuid

sender = 'lyrasipsy@gmail.com'
attendees = ['hala@sipsy.com', 'Cam@skyduster.com']
app_password = 'cokjrurvnmyqbqle'

uid = str(uuid.uuid4())

# Noon PDT March 9 2026 = 19:00 UTC, end 19:30 UTC
ics = f"""BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lyra//Sipsy//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:{uid}
DTSTART:20260309T190000Z
DTEND:20260309T193000Z
SUMMARY:Sky Duster and Sipsy
DESCRIPTION:Please join the meeting using Google Meet.\\n\\nTo join: Hala will share the Google Meet link shortly before the meeting.\\n\\nLooking forward to connecting!
LOCATION:Google Meet (link to be shared by Hala)
ORGANIZER;CN=Hala:mailto:hala@sipsy.com
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=Hala:mailto:hala@sipsy.com
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=Cam:mailto:Cam@skyduster.com
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Sky Duster and Sipsy meeting starts in 15 minutes
END:VALARM
END:VEVENT
END:VCALENDAR"""

# Send to each attendee
for recipient in attendees:
    msg = MIMEMultipart('mixed')
    msg['Subject'] = 'Invitation: Sky Duster and Sipsy — Today at 12:00 PM PST'
    msg['From'] = 'Hala (via Lyra) <lyrasipsy@gmail.com>'
    msg['To'] = recipient

    body_html = """
<html><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#2d2d2d;">
<div style="background:#f7f4f0;border-radius:16px;padding:28px;">
  <h2 style="margin:0 0 6px;font-size:20px;">📅 Sky Duster and Sipsy</h2>
  <p style="color:#888;font-size:14px;margin:0 0 24px;">You're invited to a meeting</p>

  <table style="width:100%;font-size:14px;border-collapse:collapse;">
    <tr><td style="color:#888;padding:6px 0;width:80px;">📆 Date</td><td><strong>Monday, March 9, 2026</strong></td></tr>
    <tr><td style="color:#888;padding:6px 0;">🕐 Time</td><td><strong>12:00 PM – 12:30 PM PST</strong></td></tr>
    <tr><td style="color:#888;padding:6px 0;">📹 Video</td><td>Google Meet — link will be shared by Hala</td></tr>
  </table>

  <p style="margin-top:24px;font-size:13px;color:#aaa;">A calendar invite (.ics) is attached. Open it to add this meeting to your calendar.</p>
</div>
<p style="margin-top:20px;font-size:11px;color:#ccc;text-align:center;">Sent on behalf of Hala · Sipsy</p>
</body></html>
"""
    msg.attach(MIMEText(body_html, 'html'))

    # Attach ICS
    ics_part = MIMEBase('text', 'calendar', method='REQUEST', name='invite.ics')
    ics_part.set_payload(ics.encode('utf-8'))
    ics_part.add_header('Content-Disposition', 'attachment; filename="Sky_Duster_Sipsy.ics"')
    msg.attach(ics_part)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender, app_password)
        server.sendmail(sender, recipient, msg.as_string())
        print(f'Invite sent to {recipient}')
