const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const keyFilePath = path.join(__dirname, 'xenon-machine-489717-c4-0dbd43ae93ea.json');

async function createProjectManager() {
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
  });

  const drive = google.drive({ version: 'v3', auth });
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    console.log('🔑 Authenticating...');
    const client = await auth.getClient();
    console.log('✅ Authentication successful');

    // Create a new spreadsheet
    const spreadsheetRes = await sheets.spreadsheets.create({
      resource: {
        properties: {
          title: 'Sipsy Project Manager - Lyra',
          locale: 'en_US',
        },
        sheets: [
          {
            properties: {
              sheetId: 0,
              title: 'Technical',
            },
          },
        ],
      },
    });

    const spreadsheetId = spreadsheetRes.data.spreadsheetId;
    console.log(`✅ Created spreadsheet: ${spreadsheetId}`);
    console.log(`📊 URL: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`);

    // Add Marketing and Personal sheets
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: 'Marketing',
              },
            },
          },
          {
            addSheet: {
              properties: {
                title: 'Personal',
              },
            },
          },
        ],
      },
    });

    console.log('✅ Added Marketing and Personal sheets');

    // Set up headers for all three sheets
    const headers = ['Task', 'Status', 'Owner', 'Due Date', 'Progress', 'Approval Status', 'Notes'];

    const sheetsToSetup = ['Technical', 'Marketing', 'Personal'];

    for (const sheetName of sheetsToSetup) {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `'${sheetName}'!A1`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [headers],
        },
      });
    }

    console.log('✅ Added headers to all sheets');

    // Format header row (bold, background color)
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: sheetsToSetup.map((sheetName) => ({
          updateCells: {
            range: {
              sheetId: sheetsToSetup.indexOf(sheetName),
              rowIndex: 0,
              columnIndex: 0,
              endRowIndex: 1,
              endColumnIndex: headers.length,
            },
            rows: [
              {
                values: headers.map(() => ({
                  userEnteredFormat: {
                    textFormat: {
                      bold: true,
                      fontSize: 11,
                    },
                    backgroundColor: {
                      red: 0.2,
                      green: 0.2,
                      blue: 0.2,
                    },
                    textColor: {
                      red: 1,
                      green: 1,
                      blue: 1,
                    },
                  },
                })),
              },
            ],
            fields:
              'userEnteredFormat(textFormat,backgroundColor,textColor)',
          },
        })),
      },
    });

    console.log('✅ Formatted headers');

    // Share with lyrasipsy@gmail.com (might need manual sharing)
    try {
      await drive.permissions.create({
        fileId: spreadsheetId,
        resource: {
          role: 'editor',
          type: 'user',
          emailAddress: 'lyrasipsy@gmail.com',
        },
        fields: 'id',
      });
      console.log('✅ Shared with lyrasipsy@gmail.com');
    } catch (shareError) {
      console.log('⚠️  Could not auto-share - you may need to share manually');
    }

    console.log('\n🎉 Project Manager Created!');
    console.log(`Link: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`);
    console.log('\nTabs: Technical | Marketing | Personal');

    // Save the ID to a file for future reference
    fs.writeFileSync(
      path.join(__dirname, 'project-manager-id.txt'),
      spreadsheetId
    );

    console.log('\n📝 Spreadsheet ID saved to project-manager-id.txt');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createProjectManager();
