const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function test() {
  const keyFilePath = path.join(__dirname, 'xenon-machine-489717-c4-0dbd43ae93ea.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: [
      'https://www.googleapis.com/auth/drive',
    ],
  });

  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  try {
    console.log('📄 Creating Google Doc...');
    const docRes = await drive.files.create({
      resource: {
        name: 'Sipsy Project Manager - Test',
        mimeType: 'application/vnd.google-apps.document',
      },
    });
    console.log('✅ Google Doc created:', docRes.data.id);

    console.log('\n📊 Creating Google Sheets...');
    const sheetRes = await drive.files.create({
      resource: {
        name: 'Sipsy Project Manager - Sheets',
        mimeType: 'application/vnd.google-apps.spreadsheet',
      },
    });
    console.log('✅ Google Sheet created:', sheetRes.data.id);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
