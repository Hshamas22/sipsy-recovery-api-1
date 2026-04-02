const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function formatSpreadsheet() {
  const spreadsheetId = '1wanlybGNyPNQL-eCHWWTZ8lG2r4A4_fsHi4XOgWYlnY';
  const keyFilePath = path.join(__dirname, 'sipsy-lyra-assistant-260b41562167.json');
  
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  try {
    console.log('🎨 Formatting with colors, dropdowns, and conditional formatting...\n');

    const getRes = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetMap = {};
    getRes.data.sheets.forEach(s => {
      sheetMap[s.properties.title] = s.properties.sheetId;
    });

    const requests = [];

    // Format headers and add dropdowns for each sheet
    ['Technical', 'Marketing', 'Personal'].forEach((sheetName, idx) => {
      const sheetId = sheetMap[sheetName];
      const colors = [
        { red: 0.2, green: 0.5, blue: 0.8 },  // Blue for Technical
        { red: 0.8, green: 0.6, blue: 0.2 },  // Orange for Marketing
        { red: 0.4, green: 0.7, blue: 0.4 },  // Green for Personal
      ];
      const color = colors[idx];

      // Freeze header row
      requests.push({
        updateSheetProperties: {
          fields: 'gridProperties',
          properties: {
            sheetId: sheetId,
            gridProperties: { frozenRowCount: 1, frozenColumnCount: 1 },
          },
        },
      });

      // Data validation for Status column (column B = index 1)
      requests.push({
        setDataValidation: {
          range: {
            sheetId: sheetId,
            startRowIndex: 1,
            endRowIndex: 500,
            startColumnIndex: 1,
            endColumnIndex: 2,
          },
          rule: {
            type: 'LIST',
            listRule: {
              allowInvalidData: false,
              suggestions: [
                { userEnteredValue: 'Pending' },
                { userEnteredValue: 'In Progress' },
                { userEnteredValue: 'Blocked' },
                { userEnteredValue: 'Done' },
              ],
            },
          },
        },
      });

      // Data validation for Approval Status column (column F = index 5)
      requests.push({
        setDataValidation: {
          range: {
            sheetId: sheetId,
            startRowIndex: 1,
            endRowIndex: 500,
            startColumnIndex: 5,
            endColumnIndex: 6,
          },
          rule: {
            type: 'LIST',
            listRule: {
              allowInvalidData: false,
              suggestions: [
                { userEnteredValue: 'Pending' },
                { userEnteredValue: 'Awaiting approval' },
                { userEnteredValue: 'Approved' },
                { userEnteredValue: 'Rejected' },
              ],
            },
          },
        },
      });

      // Conditional format: Done = green
      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{
              sheetId: sheetId,
              startRowIndex: 1,
              startColumnIndex: 1,
              endColumnIndex: 2,
            }],
            booleanRule: {
              condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'Done' }] },
              format: {
                backgroundColor: { red: 0.8, green: 1, blue: 0.8 },
                textFormat: { bold: true, foregroundColor: { red: 0, green: 0.5, blue: 0 } },
              },
            },
          },
        },
      });

      // Conditional format: In Progress = orange
      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{
              sheetId: sheetId,
              startRowIndex: 1,
              startColumnIndex: 1,
              endColumnIndex: 2,
            }],
            booleanRule: {
              condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'In Progress' }] },
              format: {
                backgroundColor: { red: 1, green: 0.9, blue: 0.6 },
                textFormat: { bold: true, foregroundColor: { red: 0.8, green: 0.4, blue: 0 } },
              },
            },
          },
        },
      });

      // Conditional format: Blocked = red
      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{
              sheetId: sheetId,
              startRowIndex: 1,
              startColumnIndex: 1,
              endColumnIndex: 2,
            }],
            booleanRule: {
              condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'Blocked' }] },
              format: {
                backgroundColor: { red: 1, green: 0.8, blue: 0.8 },
                textFormat: { bold: true, foregroundColor: { red: 0.8, green: 0, blue: 0 } },
              },
            },
          },
        },
      });

      // Conditional format: Approved = light green
      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{
              sheetId: sheetId,
              startRowIndex: 1,
              startColumnIndex: 5,
              endColumnIndex: 6,
            }],
            booleanRule: {
              condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'Approved' }] },
              format: {
                backgroundColor: { red: 0.8, green: 1, blue: 0.8 },
                textFormat: { bold: true, foregroundColor: { red: 0, green: 0.6, blue: 0 } },
              },
            },
          },
        },
      });
    });

    // Update column widths
    ['Technical', 'Marketing', 'Personal'].forEach(sheetName => {
      const sheetId = sheetMap[sheetName];
      const widths = [
        { index: 0, width: 280 },  // Task
        { index: 1, width: 140 },  // Status
        { index: 2, width: 130 },  // Owner
        { index: 3, width: 120 },  // Due Date
        { index: 4, width: 110 },  // Progress
        { index: 5, width: 160 },  // Approval Status
        { index: 6, width: 220 },  // Notes
      ];

      widths.forEach(w => {
        requests.push({
          updateDimensionProperties: {
            range: {
              sheetId: sheetId,
              dimension: 'COLUMNS',
              startIndex: w.index,
              endIndex: w.index + 1,
            },
            properties: { pixelSize: w.width },
            fields: 'pixelSize',
          },
        });
      });
    });

    // Apply all requests
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: { requests },
    });

    console.log('✅ Headers frozen for easy scrolling');
    console.log('✅ Status dropdowns (Pending → Done)');
    console.log('✅ Approval Status dropdowns (Pending → Rejected)');
    console.log('✅ Color coding:');
    console.log('   🟢 Green = Done');
    console.log('   🟠 Orange = In Progress');
    console.log('   🔴 Red = Blocked');
    console.log('   🟢 Green = Approved');
    console.log('✅ Column widths optimized');
    console.log('\n🎉 Project Manager fully formatted and ready!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response?.data) {
      console.error(JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

formatSpreadsheet();
