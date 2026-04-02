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
    
    # Get all emails
    status, messages = mail.search(None, "ALL")
    msg_ids = messages[0].split()
    
    print(f"Searching {len(msg_ids)} emails for JSON attachments...\n")
    
    for msg_id in reversed(msg_ids[-20:]):  # Check last 20
        status, msg_data = mail.fetch(msg_id, "(RFC822)")
        msg = email.message_from_bytes(msg_data[0][1])
        
        subject = decode_header(msg.get("Subject"))[0][0]
        if isinstance(subject, bytes):
            subject = subject.decode()
        
        sender = msg.get("From")
        date = msg.get("Date")
        
        if msg.is_multipart():
            for part in msg.walk():
                filename = part.get_filename()
                if filename and filename.endswith('.json'):
                    print(f"✅ Found JSON!")
                    print(f"   From: {sender}")
                    print(f"   Subject: {subject}")
                    print(f"   Date: {date}")
                    print(f"   File: {filename}")
                    
                    # Save it
                    content = part.get_payload(decode=True)
                    save_path = f"/home/hshamas/.openclaw/workspace/{filename}"
                    with open(save_path, 'wb') as f:
                        f.write(content)
                    print(f"   📝 Saved to {filename}\n")
    
    mail.close()
    mail.logout()
    print("✅ Done")

except Exception as e:
    print(f"❌ Error: {e}")
