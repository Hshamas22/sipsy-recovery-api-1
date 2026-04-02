const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function emptyTrash() {
  const keyFilePath = path.join(__dirname, 'xenon-machine-489717-c4-0dbd43ae93ea.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  try {
    console.log('🗑️  Emptying trash...');
    await drive.files.emptyTrash({});
    console.log('✅ Trash emptied');

    // Now try creating
    console.log('\n📊 Creating sheet...');
    const res = await drive.files.create({
      resource: {
        name: 'Sipsy Project Manager - Lyra',
        mimeType: 'application/vnd.google-apps.spreadsheet',
      },
      fields: 'id',
    });

    console.log('✅ Sheet created:', res.data.id);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

emptyTrash();
