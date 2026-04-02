const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function createSpreadsheet() {
  const keyFilePath = path.join(__dirname, 'sipsy-lyra-assistant-260b41562167.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  try {
    console.log('🚀 Creating spreadsheet with sipsy-lyra-assistant...');
    
    const spreadsheetRes = await sheets.spreadsheets.create({
      resource: {
        properties: {
          title: 'Sipsy Project Manager',
          locale: 'en_US',
        },
        sheets: [
          { properties: { title: 'Technical' } },
          { properties: { title: 'Marketing' } },
          { properties: { title: 'Personal' } },
        ],
      },
      fields: 'spreadsheetId',
    });

    const spreadsheetId = spreadsheetRes.data.spreadsheetId;
    console.log(`✅ Spreadsheet created: ${spreadsheetId}`);

    // Add headers
    const headers = ['Task', 'Status', 'Owner', 'Due Date', 'Progress', 'Approval Status', 'Notes'];
    
    console.log('📝 Adding headers...');
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

    console.log('✅ Headers added');

    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    
    console.log('\n🎉🎉🎉 SUCCESS!!!');
    console.log(`\n📊 Sipsy Project Manager`);
    console.log(`${url}`);
    console.log('\n📋 Tabs created:');
    console.log('  • Technical — Shopify fixes & improvements');
    console.log('  • Marketing — TikTok ideas & social content');
    console.log('  • Personal — Personal projects & tasks');

    // Save ID for future reference
    fs.writeFileSync(path.join(__dirname, 'project-manager-id.txt'), spreadsheetId);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response?.data) {
      console.error('Details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

createSpreadsheet();
