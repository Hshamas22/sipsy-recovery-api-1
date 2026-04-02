const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function createSpreadsheet() {
  const keyFilePath = path.join(__dirname, 'xenon-machine-489717-c4-1ebe10b45fd3.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  try {
    console.log('📊 Creating spreadsheet via Drive API only...');
    
    const res = await drive.files.create({
      resource: {
        name: 'Sipsy Project Manager - Lyra',
        mimeType: 'application/vnd.google-apps.spreadsheet',
        description: 'Project tracker for Sipsy: Technical, Marketing, Personal',
      },
      fields: 'id, webViewLink',
    });

    const spreadsheetId = res.data.id;
    const url = res.data.webViewLink;

    console.log('✅ Spreadsheet created!');
    console.log(`\n🎉 SUCCESS!`);
    console.log(`\n📊 Sipsy Project Manager`);
    console.log(`Link: ${url}`);
    console.log(`ID: ${spreadsheetId}`);

    // Save ID
    fs.writeFileSync(path.join(__dirname, 'project-manager-id.txt'), spreadsheetId);
    fs.writeFileSync(path.join(__dirname, 'project-manager-url.txt'), url);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response?.data) {
      console.error('Details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

createSpreadsheet();
