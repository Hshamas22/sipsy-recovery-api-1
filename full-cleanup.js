const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function fullCleanup() {
  const keyFilePath = path.join(__dirname, 'xenon-machine-489717-c4-0dbd43ae93ea.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  try {
    console.log('🔍 Listing all files (including trash)...');
    
    // List ALL files including trash
    const res = await drive.files.list({
      pageSize: 1000,
      fields: 'files(id, name, mimeType, trashed)',
      spaces: 'drive',
    });

    const files = res.data.files || [];
    console.log(`Found ${files.length} files total`);

    if (files.length > 0) {
      console.log('\nFiles:');
      files.forEach(f => console.log(`  - ${f.name} (${f.mimeType}) ${f.trashed ? '[TRASH]' : ''}`));
    }

    // Permanently delete files
    let deleted = 0;
    for (const file of files) {
      try {
        if (file.trashed) {
          await drive.files.delete({ fileId: file.id, supportsAllDrives: true });
          console.log(`🗑️  Permanently deleted: ${file.name}`);
        } else {
          await drive.files.delete({ fileId: file.id, supportsAllDrives: true });
          console.log(`🗑️  Deleted: ${file.name}`);
        }
        deleted++;
      } catch (e) {
        console.log(`⚠️  Error deleting ${file.name}: ${e.message}`);
      }
    }

    console.log(`\n✅ Deleted ${deleted} files`);

    // Check quota
    console.log('\n📊 Checking storage...');
    const aboutRes = await drive.about.get({ fields: 'storageQuota' });
    const quota = aboutRes.data.storageQuota;
    console.log(`Storage: ${Math.round(quota.usedBytes / 1024 / 1024)}MB / ${Math.round(quota.limit / 1024 / 1024 / 1024)}GB`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fullCleanup();
