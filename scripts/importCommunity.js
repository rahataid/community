const SHEET_NAME = 'Communities';
const SHEET_ID = '12dYbZgtxFXGPzWQFPG9Qe7NJpKUoMdbZh7O1dIO5NQM';

const { GoogleSpreadsheet } = require('google-spreadsheet');
const googleCreds = require('../config/google.json');
const axios = require('axios');

const lib = {
  async getKoboFormsData() {
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth(googleCreds);
    console.log('Loading Data');
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[SHEET_NAME];
    let rows = await sheet.getRows();

    const communityType = Array.from(
      new Set(
        rows
          .map((el) => {
            const trimmedType = el.type.trim();
            if (trimmedType === '') {
              return null;
            }
            return trimmedType.split(',').map((value) => value.trim());
          })
          .flat(),
      ),
    );
    console.log(JSON.stringify(this.sanitizeRows(rows), null, 2));

    process.exit(0);
  },

  sanitizeRows(rows) {
    return rows.map((row) => this.sanitizeRow(row));
  },

  sanitizeRow(row) {
    return {
      type: row.type,
      name: row?.name?.replace(/\r?\n/g, '').trim(),
      description: row?.description?.replace(/\r?\n/g, '').trim() || null,
      logo: row.logo || null,
      budget: row.budget || null,
      longitude: row.longitude || null,
      latitude: row.latitude || null,
      reports: {
        demographics: {
          male: row.Male || null,
          female: row.Female || null,
          banked: row.Banked || null,
          unbanked: row.Unbanked || null,
          phoned: row.Phoned || null,
          phoneless: row.Phoneless || null,
        },
      },
      // Add other properties you want to include in the JSON output
    };
  },
};

lib.getKoboFormsData();
