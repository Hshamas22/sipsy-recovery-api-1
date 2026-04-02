import imaplib
import email
from email.header import decode_header

# Gmail IMAP credentials
EMAIL = "lyrasipsy@gmail.com"
APP_PASSWORD = "cokj rurv nmyq bqle"

try:
    print("📧 Connecting to Gmail...")
    mail = imaplib.IMAP4_SSL("imap.gmail.com")
    mail.login(EMAIL, APP_PASSWORD)
    print("✅ Connected")

    # Select inbox
    mail.select("INBOX")
    
    # Get recent emails (last 10)
    print("\n📮 Fetching recent emails...")
    status, messages = mail.search(None, "ALL")
    
    msg_ids = messages[0].split()
    
    # Get last 10 emails
    for msg_id in msg_ids[-10:]:
        status, msg_data = mail.fetch(msg_id, "(RFC822)")
        msg = email.message_from_bytes(msg_data[0][1])
        
        subject = decode_header(msg.get("Subject"))[0][0]
        if isinstance(subject, bytes):
            subject = subject.decode()
        
        sender = msg.get("From")
        date = msg.get("Date")
        
        print(f"\n📨 From: {sender}")
        print(f"   Subject: {subject}")
        print(f"   Date: {date}")
        
        # If it's an attachment or has service account key
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "application/json":
                    print(f"   📎 Attachment: {part.get_filename()}")
                elif part.get_content_disposition() == "attachment":
                    print(f"   📎 Attachment: {part.get_filename()}")
    
    mail.close()
    mail.logout()

except Exception as e:
    print(f"❌ Error: {e}")
