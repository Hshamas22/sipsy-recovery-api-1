import imaplib
import email
from email.header import decode_header
import os

EMAIL = "lyrasipsy@gmail.com"
APP_PASSWORD = "cokj rurv nmyq bqle"

try:
    print("📧 Connecting to Gmail...")
    mail = imaplib.IMAP4_SSL("imap.gmail.com")
    mail.login(EMAIL, APP_PASSWORD)
    
    mail.select("INBOX")
    
    # Get the most recent email
    status, messages = mail.search(None, "ALL")
    msg_ids = messages[0].split()
    
    if msg_ids:
        latest_msg_id = msg_ids[-1]
        print(f"📨 Fetching latest email (ID: {latest_msg_id})...")
        
        status, msg_data = mail.fetch(latest_msg_id, "(RFC822)")
        msg = email.message_from_bytes(msg_data[0][1])
        
        subject = decode_header(msg.get("Subject"))[0][0]
        if isinstance(subject, bytes):
            subject = subject.decode()
        
        print(f"Subject: {subject}")
        print(f"From: {msg.get('From')}")
        
        # Check for attachments
        if msg.is_multipart():
            print(f"\n📎 Attachments:")
            for part in msg.walk():
                filename = part.get_filename()
                if filename:
                    print(f"  - {filename}")
                    
                    # Save JSON files
                    if filename.endswith('.json'):
                        content = part.get_payload(decode=True)
                        save_path = f"/home/hshamas/.openclaw/workspace/{filename}"
                        with open(save_path, 'wb') as f:
                            f.write(content)
                        print(f"    ✅ Saved to {filename}")
        else:
            print("No attachments")
        
        # Also show body
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain":
                    print(f"\n📝 Body:\n{part.get_payload(decode=True).decode()}")
                    break
        else:
            print(f"\n📝 Body:\n{msg.get_payload(decode=True).decode() if msg.get_payload() else 'No body'}")
    
    mail.close()
    mail.logout()

except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
