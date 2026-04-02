const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function debug() {
  const keyFilePath = path.join(__dirname, 'xenon-machine-489717-c4-0dbd43ae93ea.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });

  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  try {
    // First, check what files we can list
    console.log('🔍 Checking Drive access...');
    const files = await drive.files.list({
      pageSize: 5,
      fields: 'files(id, name)',
    });
    console.log('✅ Drive access works! Files found:', files.data.files?.length || 0);

    // Now try to create a folder first
    console.log('\n📁 Trying to create a test folder...');
    const folderRes = await drive.files.create({
      resource: {
        name: 'Lyra-Test-Folder',
        mimeType: 'application/vnd.google-apps.folder',
      },
    });
    console.log('✅ Folder created:', folderRes.data.id);

    // Now try to create a spreadsheet in that folder
    console.log('\n📊 Creating spreadsheet in folder...');
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    const spreadRes = await sheets.spreadsheets.create({
      resource: {
        properties: {
          title: 'Sipsy Project Manager - Lyra',
        },
        sheets: [
          { properties: { title: 'Technical' } },
          { properties: { title: 'Marketing' } },
          { properties: { title: 'Personal' } },
        ],
      },
      fields: 'spreadsheetId',
    });

    const spreadsheetId = spreadRes.data.spreadsheetId;
    console.log('✅ Spreadsheet created:', spreadsheetId);

    // Move it to the folder
    console.log('\n📍 Moving spreadsheet to folder...');
    await drive.files.update({
      fileId: spreadsheetId,
      resource: {
        parents: [folderRes.data.id],
      },
      fields: 'id, parents',
    });
    console.log('✅ Moved to folder');

    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    console.log('\n🎉 Success!');
    console.log(`📊 Link: ${url}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.errors) {
      console.error('Details:', error.errors);
    }
  }
}

debug();
