const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const keyFilePath = path.join(__dirname, 'xenon-machine-489717-c4-0dbd43ae93ea.json');
const creds = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));

async function createSheet() {
  try {
    const auth = new GoogleAuth({
      keyFile: keyFilePath,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
      ],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    console.log('✅ Got access token');

    const headers = {
      Authorization: `Bearer ${accessToken.token}`,
      'Content-Type': 'application/json',
    };

    // Create spreadsheet
    const createRes = await axios.post(
      'https://sheets.googleapis.com/v4/spreadsheets',
      {
        properties: {
          title: 'Sipsy Project Manager - Lyra',
          locale: 'en_US',
        },
        sheets: [
          {
            properties: {
              title: 'Technical',
            },
          },
          {
            properties: {
              title: 'Marketing',
            },
          },
          {
            properties: {
              title: 'Personal',
            },
          },
        ],
      },
      { headers }
    );

    const spreadsheetId = createRes.data.spreadsheetId;
    console.log(`✅ Created spreadsheet: ${spreadsheetId}`);

    // Add headers to each sheet
    const headers_row = ['Task', 'Status', 'Owner', 'Due Date', 'Progress', 'Approval Status', 'Notes'];

    const updateRes = await axios.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
      {
        data: [
          {
            range: 'Technical!A1',
            values: [headers_row],
          },
          {
            range: 'Marketing!A1',
            values: [headers_row],
          },
          {
            range: 'Personal!A1',
            values: [headers_row],
          },
        ],
        valueInputOption: 'USER_ENTERED',
      },
      { headers }
    );

    console.log('✅ Added headers to all sheets');

    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    console.log('\n🎉 Project Manager Created!');
    console.log(`📊 Link: ${url}`);
    console.log('\nTabs: Technical | Marketing | Personal');

    // Save ID
    fs.writeFileSync(path.join(__dirname, 'project-manager-id.txt'), spreadsheetId);
    console.log('📝 Spreadsheet ID saved to project-manager-id.txt');
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

createSheet();
