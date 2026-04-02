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
    console.log('🎨 Adding colors, formatting, and dropdowns...\n');

    // Get spreadsheet to find sheet IDs
    const getRes = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetMap = {};
    getRes.data.sheets.forEach(s => {
      sheetMap[s.properties.title] = s.properties.sheetId;
    });

    const requests = [];

    // Format each sheet
    ['Technical', 'Marketing', 'Personal'].forEach((sheetName, idx) => {
      const sheetId = sheetMap[sheetName];
      const colors = [
        { r: 0.2, g: 0.5, b: 0.8 },  // Blue for Technical
        { r: 0.8, g: 0.6, b: 0.2 },  // Orange for Marketing
        { r: 0.4, g: 0.7, b: 0.4 },  // Green for Personal
      ];
      const color = colors[idx];

      // Format header row
      requests.push({
        updateCells: {
          range: {
            sheetId: sheetId,
            rowIndex: 0,
            columnIndex: 0,
            endColumnIndex: 7,
            endRowIndex: 1,
          },
          rows: [
            {
              values: [
                { userEnteredFormat: { textFormat: { bold: true, fontSize: 12, foregroundColor: { red: 1, green: 1, blue: 1 } }, backgroundColor: color, horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' } },
                { userEnteredFormat: { textFormat: { bold: true, fontSize: 12, foregroundColor: { red: 1, green: 1, blue: 1 } }, backgroundColor: color, horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' } },
                { userEnteredFormat: { textFormat: { bold: true, fontSize: 12, foregroundColor: { red: 1, green: 1, blue: 1 } }, backgroundColor: color, horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' } },
                { userEnteredFormat: { textFormat: { bold: true, fontSize: 12, foregroundColor: { red: 1, green: 1, blue: 1 } }, backgroundColor: color, horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' } },
                { userEnteredFormat: { textFormat: { bold: true, fontSize: 12, foregroundColor: { red: 1, green: 1, blue: 1 } }, backgroundColor: color, horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' } },
                { userEnteredFormat: { textFormat: { bold: true, fontSize: 12, foregroundColor: { red: 1, green: 1, blue: 1 } }, backgroundColor: color, horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' } },
                { userEnteredFormat: { textFormat: { bold: true, fontSize: 12, foregroundColor: { red: 1, green: 1, blue: 1 } }, backgroundColor: color, horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' } },
              ],
            },
          ],
          fields: 'userEnteredFormat',
        },
      });

      // Add alternating row colors (light gray)
      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{ sheetId: sheetId, startRowIndex: 1 }],
            booleanRule: {
              condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: '=MOD(ROW(),2)=0' }] },
              format: { backgroundColor: { red: 0.95, green: 0.95, blue: 0.95 } },
            },
          },
          index: 0,
        },
      });

      // Data validation for Status column (B)
      requests.push({
        setDataValidation: {
          range: { sheetId: sheetId, startRowIndex: 1, endRowIndex: 500, startColumnIndex: 1, endColumnIndex: 2 },
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

      // Data validation for Approval Status column (F)
      requests.push({
        setDataValidation: {
          range: { sheetId: sheetId, startRowIndex: 1, endRowIndex: 500, startColumnIndex: 5, endColumnIndex: 6 },
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

      // Conditional formatting for Status column (green for Done, orange for In Progress, red for Blocked)
      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{ sheetId: sheetId, startRowIndex: 1, endRowIndex: 500, startColumnIndex: 1, endColumnIndex: 2 }],
            booleanRule: {
              condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'Done' }] },
              format: { backgroundColor: { red: 0.7, green: 0.95, blue: 0.7 }, textFormat: { bold: true } },
            },
          },
          index: 0,
        },
      });

      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{ sheetId: sheetId, startRowIndex: 1, endRowIndex: 500, startColumnIndex: 1, endColumnIndex: 2 }],
            booleanRule: {
              condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'In Progress' }] },
              format: { backgroundColor: { red: 1, green: 0.9, blue: 0.5 } },
            },
          },
          index: 0,
        },
      });

      requests.push({
        addConditionalFormatRule: {
          rule: {
            ranges: [{ sheetId: sheetId, startRowIndex: 1, endRowIndex: 500, startColumnIndex: 1, endColumnIndex: 2 }],
            booleanRule: {
              condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'Blocked' }] },
              format: { backgroundColor: { red: 1, green: 0.7, blue: 0.7 }, textFormat: { bold: true } },
            },
          },
          index: 0,
        },
      });
    });

    // Freeze header row for all sheets
    ['Technical', 'Marketing', 'Personal'].forEach(sheetName => {
      const sheetId = sheetMap[sheetName];
      requests.push({
        updateSheetProperties: {
          fields: 'gridProperties',
          properties: {
            sheetId: sheetId,
            gridProperties: { frozenRowCount: 1 },
          },
        },
      });
    });

    // Set column widths
    ['Technical', 'Marketing', 'Personal'].forEach(sheetName => {
      const sheetId = sheetMap[sheetName];
      const widths = [250, 120, 120, 120, 100, 150, 200]; // Task, Status, Owner, Due Date, Progress, Approval, Notes
      
      widths.forEach((width, idx) => {
        requests.push({
          updateDimensionProperties: {
            range: { sheetId: sheetId, dimension: 'COLUMNS', startIndex: idx, endIndex: idx + 1 },
            properties: { pixelSize: width },
            fields: 'pixelSize',
          },
        });
      });
    });

    // Apply all formatting requests
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: { requests },
    });

    console.log('✅ Headers formatted with colors');
    console.log('✅ Alternating row colors added');
    console.log('✅ Dropdowns added for Status (Pending/In Progress/Blocked/Done)');
    console.log('✅ Dropdowns added for Approval Status');
    console.log('✅ Conditional formatting added (green=Done, orange=In Progress, red=Blocked)');
    console.log('✅ Column widths optimized');
    console.log('✅ Header row frozen for easy scrolling');
    console.log('\n🎉 Spreadsheet is now fully formatted!');
    console.log(`\n📊 ${spreadsheetId}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

formatSpreadsheet();
