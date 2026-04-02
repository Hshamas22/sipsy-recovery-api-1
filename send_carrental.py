import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

sender = 'lyrasipsy@gmail.com'
recipient = 'hala@sipsy.com'
app_password = 'cokjrurvnmyqbqle'

msg = MIMEMultipart('alternative')
msg['Subject'] = '🚗 Tampa Car Rental — March 13-16 (6-7 Passenger)'
msg['From'] = 'Lyra (Sipsy AI) <lyrasipsy@gmail.com>'
msg['To'] = recipient

html = """
<html><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:620px;margin:0 auto;padding:24px;color:#2d2d2d;">
<h1 style="font-size:22px;margin-bottom:4px;">🚗 Tampa Car Rental Options</h1>
<p style="color:#888;font-size:14px;margin-bottom:8px;">Tampa International Airport (TPA) &nbsp;·&nbsp; 6-7 Passenger Vehicle</p>
<p style="color:#888;font-size:14px;margin-bottom:32px;">📅 Pickup: <strong>March 13, 2026 @ 6:00 AM</strong> &nbsp;→&nbsp; Dropoff: <strong>March 16, 2026 @ 6:00 PM</strong></p>

<h2 style="font-size:15px;color:#555;border-bottom:2px solid #f0ede8;padding-bottom:8px;margin-bottom:16px;">🔍 Comparison Sites — Check These First</h2>

<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
  <tr style="background:#fafaf8;">
    <td style="padding:12px 14px;border-radius:10px 10px 0 0;border:1px solid #eee;">
      <strong>Kayak</strong> <span style="color:#888;font-size:12px;">— filtered for 7 seats, all companies</span><br>
      <a href="https://www.kayak.com/cars/Tampa,FL,US-c:TPA/2026-03-13/06:00/2026-03-16/18:00?seats=7" style="color:#e8855a;font-size:13px;word-break:break-all;">kayak.com → TPA 7-seat search</a>
    </td>
  </tr>
  <tr>
    <td style="padding:12px 14px;border:1px solid #eee;border-top:none;">
      <strong>Rentalcars.com</strong> <span style="color:#888;font-size:12px;">— often lowest total price</span><br>
      <a href="https://www.rentalcars.com/SearchResults.do?country=US&city=Tampa&airportCode=TPA&puDay=13&puMonth=03&puYear=2026&puHour=06&puMinute=00&doDay=16&doMonth=03&doYear=2026&doHour=18&doMinute=00&driverAge=30&fromAirport=true" style="color:#e8855a;font-size:13px;word-break:break-all;">rentalcars.com → TPA search</a>
    </td>
  </tr>
  <tr style="background:#fafaf8;">
    <td style="padding:12px 14px;border:1px solid #eee;border-top:none;border-radius:0 0 10px 10px;">
      <strong>AutoSlash</strong> <span style="color:#888;font-size:12px;">— automatically applies discount codes, saves 20-40%</span><br>
      <a href="https://www.autoslash.com/quotes/new?airport=TPA&pickup_date=2026-03-13&pickup_time=06:00&return_date=2026-03-16&return_time=18:00&driver_age=25&num_drivers=1" style="color:#e8855a;font-size:13px;word-break:break-all;">autoslash.com → TPA search</a>
    </td>
  </tr>
</table>

<h2 style="font-size:15px;color:#555;border-bottom:2px solid #f0ede8;padding-bottom:8px;margin-bottom:16px;">🏢 Direct Airport Desk Bookings</h2>
<p style="font-size:13px;color:#888;margin-bottom:16px;">All companies below have counters inside Tampa International Airport.</p>

<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
  <tr style="background:#fafaf8;">
    <td style="padding:12px 14px;border-radius:10px 10px 0 0;border:1px solid #eee;">
      <strong>National Car Rental</strong> <span style="color:#4caf7d;font-size:12px;font-weight:600;">⭐ Recommended</span><br>
      <span style="color:#888;font-size:12px;">Highly rated airport experience, great 7-passenger options</span><br>
      <a href="https://www.nationalcar.com/en/car-rental/locations/us/fl/tampa-international-airport-4a2e.html" style="color:#e8855a;font-size:13px;">nationalcar.com → TPA</a>
    </td>
  </tr>
  <tr>
    <td style="padding:12px 14px;border:1px solid #eee;border-top:none;">
      <strong>Enterprise</strong><br>
      <span style="color:#888;font-size:12px;">Reliable, wide minivan/SUV selection</span><br>
      <a href="https://www.enterprise.com/en/car-rental/locations/us/fl/tampa-international-airport-4a2e.html" style="color:#e8855a;font-size:13px;">enterprise.com → TPA</a>
    </td>
  </tr>
  <tr style="background:#fafaf8;">
    <td style="padding:12px 14px;border:1px solid #eee;border-top:none;">
      <strong>Hertz</strong><br>
      <span style="color:#888;font-size:12px;">Good SUV inventory at TPA</span><br>
      <a href="https://www.hertz.com/rentacar/reservation/?olc=TPA" style="color:#e8855a;font-size:13px;">hertz.com → TPA</a>
    </td>
  </tr>
  <tr>
    <td style="padding:12px 14px;border:1px solid #eee;border-top:none;">
      <strong>Avis</strong><br>
      <a href="https://www.avis.com/en/locations/us/fl/tampa/TPA" style="color:#e8855a;font-size:13px;">avis.com → TPA</a>
    </td>
  </tr>
  <tr style="background:#fafaf8;">
    <td style="padding:12px 14px;border:1px solid #eee;border-top:none;border-radius:0 0 10px 10px;">
      <strong>Budget</strong><br>
      <a href="https://www.budget.com/en/locations/us/fl/tampa/TPA" style="color:#e8855a;font-size:13px;">budget.com → TPA</a>
    </td>
  </tr>
</table>

<div style="background:#fdf6ee;border-radius:12px;padding:16px 20px;font-size:13px;color:#b07a30;margin-bottom:32px;">
  <strong>💡 Quick Tips</strong><br><br>
  • Look for a <strong>minivan</strong> (Chrysler Pacifica / Dodge Grand Caravan) — usually the cheapest 7-seater<br>
  • <strong>AutoSlash</strong> is worth a look — it finds hidden coupon codes automatically<br>
  • Once you find the best price on a comparison site, book directly with the company (same price, easier changes/cancellations)
</div>

<p style="font-size:12px;color:#ccc;">Sent by Lyra · Sipsy AI assistant</p>
</body></html>
"""

text = """TAMPA CAR RENTAL — March 13-16, 2026
6-7 Passenger Vehicle · Tampa International Airport (TPA)
Pickup: March 13 @ 6:00 AM → Dropoff: March 16 @ 6:00 PM

--- COMPARISON SITES ---

KAYAK (7-seat filter):
https://www.kayak.com/cars/Tampa,FL,US-c:TPA/2026-03-13/06:00/2026-03-16/18:00?seats=7

RENTALCARS.COM (often lowest price):
https://www.rentalcars.com/SearchResults.do?country=US&city=Tampa&airportCode=TPA&puDay=13&puMonth=03&puYear=2026&puHour=06&puMinute=00&doDay=16&doMonth=03&doYear=2026&doHour=18&doMinute=00&driverAge=30&fromAirport=true

AUTOSLASH (applies discount codes automatically):
https://www.autoslash.com/quotes/new?airport=TPA&pickup_date=2026-03-13&pickup_time=06:00&return_date=2026-03-16&return_time=18:00&driver_age=25&num_drivers=1

--- AIRPORT DESK COMPANIES ---

National Car Rental (⭐ Recommended):
https://www.nationalcar.com/en/car-rental/locations/us/fl/tampa-international-airport-4a2e.html

Enterprise:
https://www.enterprise.com/en/car-rental/locations/us/fl/tampa-international-airport-4a2e.html

Hertz:
https://www.hertz.com/rentacar/reservation/?olc=TPA

Avis:
https://www.avis.com/en/locations/us/fl/tampa/TPA

Budget:
https://www.budget.com/en/locations/us/fl/tampa/TPA

--- TIPS ---
- Look for a minivan (Chrysler Pacifica / Dodge Grand Caravan) — cheapest 7-seater
- AutoSlash finds hidden coupon codes automatically — worth checking
- Book directly with the company once you find your price

Sent by Lyra · Sipsy AI assistant
"""

msg.attach(MIMEText(text, 'plain'))
msg.attach(MIMEText(html, 'html'))

with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
    server.login(sender, app_password)
    server.sendmail(sender, recipient, msg.as_string())
    print('Email sent!')
