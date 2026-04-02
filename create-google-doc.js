const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function createDoc() {
  const keyFilePath = path.join(__dirname, 'xenon-machine-489717-c4-1ebe10b45fd3.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  try {
    console.log('📄 Creating Google Doc...');
    
    const res = await drive.files.create({
      resource: {
        name: 'Sipsy Project Manager',
        mimeType: 'application/vnd.google-apps.document',
      },
      fields: 'id, webViewLink',
    });

    const docId = res.data.id;
    const url = res.data.webViewLink;

    console.log('✅ Google Doc created!');
    console.log(`Link: ${url}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createDoc();
