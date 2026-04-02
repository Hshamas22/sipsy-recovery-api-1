const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function populateSpreadsheet() {
  const spreadsheetId = '1wanlybGNyPNQL-eCHWWTZ8lG2r4A4_fsHi4XOgWYlnY';
  const keyFilePath = path.join(__dirname, 'sipsy-lyra-assistant-260b41562167.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  try {
    console.log('📊 Setting up Sipsy Project Manager...\n');

    // Get current sheets
    const getRes = await sheets.spreadsheets.get({ spreadsheetId });
    const currentSheets = getRes.data.sheets;
    
    // Rename first sheet to "Technical" and add other sheets
    const requests = [];
    
    if (currentSheets[0]) {
      requests.push({
        updateSheetProperties: {
          fields: 'title',
          properties: {
            sheetId: currentSheets[0].properties.sheetId,
            title: 'Technical',
          },
        },
      });
    }

    // Check if Marketing and Personal sheets exist
    const sheetNames = currentSheets.map(s => s.properties.title);
    if (!sheetNames.includes('Marketing')) {
      requests.push({
        addSheet: { properties: { title: 'Marketing' } },
      });
    }
    if (!sheetNames.includes('Personal')) {
      requests.push({
        addSheet: { properties: { title: 'Personal' } },
      });
    }

    if (requests.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: { requests },
      });
      console.log('✅ Sheets created/renamed');
    }

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

    // Add sample data for Technical tab (from previous analysis)
    console.log('📋 Adding initial tasks...');
    
    const technicalTasks = [
      ['Review Shopify theme performance', 'Pending', 'Lyra', '', '', 'Awaiting approval', 'Check page load times'],
      ['Optimize product images', 'Pending', 'Lyra', '', '', 'Awaiting approval', 'Compress and optimize'],
      ['Set up abandoned cart email', 'Pending', 'Lyra', '', '', 'Awaiting approval', 'Recover lost sales'],
    ];

    const marketingTasks = [
      ['TikTok Video Series - 20 Ideas', 'In Progress', 'Lyra', '', '0%', 'Awaiting approval', 'See notes for ideas'],
    ];

    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      resource: {
        data: [
          { range: 'Technical!A2', values: technicalTasks },
          { range: 'Marketing!A2', values: marketingTasks },
        ],
        valueInputOption: 'USER_ENTERED',
      },
    });
    console.log('✅ Sample tasks added');

    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    
    console.log('\n🎉 Sipsy Project Manager is ready!');
    console.log(`\n📊 ${url}`);
    console.log('\n📋 Structure:');
    console.log('  • Technical — Shopify fixes & improvements');
    console.log('  • Marketing — TikTok ideas & social content');
    console.log('  • Personal — Personal projects & tasks');
    console.log('\n📌 Each task tracks:');
    console.log('  • Status (Pending/In Progress/Done)');
    console.log('  • Owner (who\'s working on it)');
    console.log('  • Due Date');
    console.log('  • Progress (% complete)');
    console.log('  • Approval Status (Awaiting approval/Approved)');
    console.log('  • Notes');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response?.data) {
      console.error('Details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

populateSpreadsheet();
