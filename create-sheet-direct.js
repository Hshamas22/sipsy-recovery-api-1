const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Use the service account but we'll try a different approach
// Actually, let's use OAuth with the credentials

const keyFilePath = path.join(__dirname, 'xenon-machine-489717-c4-0dbd43ae93ea.json');

async function createSheet() {
  try {
    const { GoogleAuth } = require('google-auth-library');
    
    // Try with domain-wide delegation scopes
    const auth = new GoogleAuth({
      keyFile: keyFilePath,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive'
      ],
    });

    const authClient = await auth.getClient();
    
    const sheets = google.sheets({
      version: 'v4',
      auth: authClient,
    });

    const drive = google.drive({
      version: 'v3',
      auth: authClient,
    });

    // Create spreadsheet
    const response = await sheets.spreadsheets.create({
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

    const spreadsheetId = response.data.spreadsheetId;
    console.log(`✅ Created spreadsheet: ${spreadsheetId}`);

    // Add headers
    const headers = ['Task', 'Status', 'Owner', 'Due Date', 'Progress', 'Approval Status', 'Notes'];
    
    const updateRes = await sheets.spreadsheets.values.batchUpdate({
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

    console.log('✅ Added headers');

    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    console.log('\n🎉 Project Manager Created!');
    console.log(`📊 Link: ${url}`);

    // Save ID
    fs.writeFileSync(path.join(__dirname, 'project-manager-id.txt'), spreadsheetId);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

createSheet();
