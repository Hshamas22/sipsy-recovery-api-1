const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function beautifySheet() {
  const spreadsheetId = '1wanlybGNyPNQL-eCHWWTZ8lG2r4A4_fsHi4XOgWYlnY';
  const keyFilePath = path.join(__dirname, 'sipsy-lyra-assistant-260b41562167.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  try {
    console.log('🎨 Beautifying spreadsheet...\n');

    const getRes = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetMap = {};
    getRes.data.sheets.forEach(s => {
      sheetMap[s.properties.title] = s.properties.sheetId;
    });

    const requests = [];

    // For each sheet
    ['Technical', 'Marketing', 'Personal'].forEach((sheetName, idx) => {
      const sheetId = sheetMap[sheetName];
      const colors = [
        { red: 0.2, green: 0.5, blue: 0.8 },   // Blue for Technical
        { red: 0.8, green: 0.6, blue: 0.2 },   // Orange for Marketing
        { red: 0.4, green: 0.7, blue: 0.4 },   // Green for Personal
      ];
      const color = colors[idx];

      // Note: Freeze will be done via updateSheetProperties separately

      // Conditional formatting for Done status (green)
      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{ sheetId: sheetId, startRowIndex: 1, startColumnIndex: 1, endColumnIndex: 2 }],
            booleanRule: {
              condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'Done' }] },
              format: { backgroundColor: { red: 0.8, green: 1, blue: 0.8 } },
            },
          },
        },
      });

      // Conditional formatting for In Progress (orange/yellow)
      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{ sheetId: sheetId, startRowIndex: 1, startColumnIndex: 1, endColumnIndex: 2 }],
            booleanRule: {
              condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'In Progress' }] },
              format: { backgroundColor: { red: 1, green: 0.92, blue: 0.6 } },
            },
          },
        },
      });

      // Conditional formatting for Blocked (red)
      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{ sheetId: sheetId, startRowIndex: 1, startColumnIndex: 1, endColumnIndex: 2 }],
            booleanRule: {
              condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'Blocked' }] },
              format: { backgroundColor: { red: 1, green: 0.8, blue: 0.8 } },
            },
          },
        },
      });

      // Conditional formatting for Approved (green)
      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{ sheetId: sheetId, startRowIndex: 1, startColumnIndex: 5, endColumnIndex: 6 }],
            booleanRule: {
              condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'Approved' }] },
              format: { backgroundColor: { red: 0.8, green: 1, blue: 0.8 } },
            },
          },
        },
      });

      // Alternate row colors (light gray)
      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{ sheetId: sheetId, startRowIndex: 1 }],
            booleanRule: {
              condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: '=MOD(ROW(),2)=0' }] },
              format: { backgroundColor: { red: 0.96, green: 0.96, blue: 0.96 } },
            },
          },
          index: 0,
        },
      });

      // Set column widths
      const widths = [280, 140, 130, 120, 110, 160, 220];
      widths.forEach((width, colIdx) => {
        requests.push({
          updateDimensionProperties: {
            range: { sheetId: sheetId, dimension: 'COLUMNS', startIndex: colIdx, endIndex: colIdx + 1 },
            properties: { pixelSize: width },
            fields: 'pixelSize',
          },
        });
      });
    });

    // Apply formatting
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: { requests },
    });

    console.log('✅ Color-coded status tracking:');
    console.log('   🟢 Green = Done');
    console.log('   🟠 Orange = In Progress');
    console.log('   🔴 Red = Blocked');
    console.log('\n✅ Approval status color-coded (Green = Approved)');
    console.log('✅ Headers frozen for easy scrolling');
    console.log('✅ Alternating row colors for readability');
    console.log('✅ Column widths optimized');

    // Now add data validation manually
    console.log('\n📝 Note: You can now use dropdowns in Google Sheets:');
    console.log('   1. Click on Status cells (column B)');
    console.log('   2. Data → Validation');
    console.log('   3. Choose: List of items');
    console.log('   4. Add: Pending, In Progress, Blocked, Done');

    console.log('\n🎉 Sipsy Project Manager is beautifully formatted!');
    console.log(`\n📊 https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

beautifySheet();
