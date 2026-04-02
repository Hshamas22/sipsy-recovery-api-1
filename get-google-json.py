import imaplib
import email
from email.header import decode_header

EMAIL = "lyrasipsy@gmail.com"
APP_PASSWORD = "cokj rurv nmyq bqle"

try:
    print("📧 Connecting to Gmail...")
    mail = imaplib.IMAP4_SSL("imap.gmail.com")
    mail.login(EMAIL, APP_PASSWORD)
    
    mail.select("INBOX")
    
    # Search for "Google json" subject
    status, msg_ids = mail.search(None, 'SUBJECT "Google json"')
    msg_list = msg_ids[0].split()
    
    print(f"Found {len(msg_list)} email(s) with subject 'Google json'\n")
    
    for msg_id in msg_list:
        status, msg_data = mail.fetch(msg_id, "(RFC822)")
        msg = email.message_from_bytes(msg_data[0][1])
        
        subject = decode_header(msg.get("Subject"))[0][0]
        if isinstance(subject, bytes):
            subject = subject.decode()
        
        sender = msg.get("From")
        date = msg.get("Date")
        
        print(f"From: {sender}")
        print(f"Subject: {subject}")
        print(f"Date: {date}\n")
        
        if msg.is_multipart():
            for part in msg.walk():
                filename = part.get_filename()
                if filename:
                    print(f"📎 Attachment: {filename}")
                    
                    content = part.get_payload(decode=True)
                    save_path = f"/home/hshamas/.openclaw/workspace/{filename}"
                    
                    with open(save_path, 'wb') as f:
                        f.write(content)
                    
                    print(f"   ✅ Saved to {filename}")
                    
                    # Show first line
                    print(f"   Content preview: {content[:100].decode() if content else 'empty'}\n")
    
    mail.close()
    mail.logout()

except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
