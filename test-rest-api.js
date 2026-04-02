const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function testRestAPI() {
  const keyFilePath = path.join(__dirname, 'sipsy-lyra-assistant-260b41562167.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });

  try {
    console.log('🔑 Getting access token...');
    const client = await auth.getClient();
    const { token } = await client.getAccessToken();
    console.log('✅ Got token\n');

    console.log('📊 Calling Sheets API directly...');
    
    const response = await axios.post(
      'https://sheets.googleapis.com/v4/spreadsheets',
      {
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
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Success!');
    console.log(`Spreadsheet ID: ${response.data.spreadsheetId}`);
    console.log(`URL: https://docs.google.com/spreadsheets/d/${response.data.spreadsheetId}/edit`);

  } catch (error) {
    console.error('❌ Error:', error.response?.status, error.response?.statusText);
    console.error('Details:', JSON.stringify(error.response?.data, null, 2));
    
    // Also try with different scopes
    if (error.response?.status === 403) {
      console.log('\n🤔 Got 403 - this might be a scope or domain restriction issue');
    }
  }
}

testRestAPI();
