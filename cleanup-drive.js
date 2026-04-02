const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function cleanup() {
  const keyFilePath = path.join(__dirname, 'xenon-machine-489717-c4-0dbd43ae93ea.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  try {
    console.log('🗑️  Cleaning up Drive...');
    
    // List all files
    const res = await drive.files.list({
      pageSize: 100,
      fields: 'files(id, name, mimeType, createdTime)',
    });

    const files = res.data.files || [];
    console.log(`Found ${files.length} files`);

    if (files.length === 0) {
      console.log('✅ Drive is empty');
      return;
    }

    // Delete all files
    let deleted = 0;
    for (const file of files) {
      try {
        await drive.files.delete({ fileId: file.id });
        console.log(`🗑️  Deleted: ${file.name}`);
        deleted++;
      } catch (e) {
        console.log(`⚠️  Could not delete ${file.name}: ${e.message}`);
      }
    }

    console.log(`\n✅ Deleted ${deleted} files`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

cleanup();
