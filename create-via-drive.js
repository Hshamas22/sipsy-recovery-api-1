const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function create() {
  const keyFilePath = path.join(__dirname, 'xenon-machine-489717-c4-0dbd43ae93ea.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  try {
    console.log('📊 Creating Google Sheet via Drive API...');
    
    // Use Drive API to create the spreadsheet file
    const fileRes = await drive.files.create({
      resource: {
        name: 'Sipsy Project Manager - Lyra',
        mimeType: 'application/vnd.google-apps.spreadsheet',
        description: 'Project manager for Sipsy - Technical, Marketing, Personal',
      },
      fields: 'id, webViewLink',
      supportsAllDrives: true,
    });

    const spreadsheetId = fileRes.data.id;
    console.log(`✅ Sheet created: ${spreadsheetId}`);

    // Now use Sheets API to add sheets and data
    console.log('📝 Adding sheets and headers...');

    const headers = ['Task', 'Status', 'Owner', 'Due Date', 'Progress', 'Approval Status', 'Notes'];

    // Get the spreadsheet first
    const getRes = await sheets.spreadsheets.get({ spreadsheetId });
    const defaultSheetId = getRes.data.sheets[0].properties.sheetId;

    // Rename the first sheet to "Technical"
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            updateSheetProperties: {
              fields: 'title',
              properties: {
                sheetId: defaultSheetId,
                title: 'Technical',
              },
            },
          },
        ],
      },
    });

    // Add Marketing and Personal sheets
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: { title: 'Marketing' },
            },
          },
          {
            addSheet: {
              properties: { title: 'Personal' },
            },
          },
        ],
      },
    });

    // Add headers to all sheets
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      resource: {
        data: [
          { range: 'Technical!A1', values: [headers] },
          { range: 'Marketing!A1', values: [headers] },
          { range: 'Personal!A1', values: [headers] },
        ],
        valueInputOption: 'USER_ENTERED',
      },
    });

    console.log('✅ Sheets and headers added');

    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    console.log('\n🎉 Project Manager Created!');
    console.log(`📊 Link: ${url}`);

    // Save the ID
    fs.writeFileSync(path.join(__dirname, 'project-manager-id.txt'), spreadsheetId);
    console.log('📝 ID saved to project-manager-id.txt');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response?.data) {
      console.error('Details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

create();
