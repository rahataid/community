const SHEET_NAME = 'Communities';
const SHEET_ID = '12dYbZgtxFXGPzWQFPG9Qe7NJpKUoMdbZh7O1dIO5NQM';

const { GoogleSpreadsheet } = require('google-spreadsheet');
const googleCreds = require('../config/google.json');
const axios = require('axios');

const communityHost = axios.create({
  baseURL: 'http://localhost:5300',
});

const lib = {
  async getKoboFormsData() {
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth(googleCreds);
    console.log('Loading Data');
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[SHEET_NAME];
    let rows = await sheet.getRows();

    const tags = Array.from(
      new Set(
        rows
          .map((el) => {
            const trimmedType = el.tags.trim();
            if (trimmedType !== '' || trimmedType !== null) {
              return trimmedType.split(',').map((value) => value.trim());
            }
          })
          .flat(),
      ),
    );
    // .map((t) => ({ name: t }));

    const { data } = await communityHost.post('/communities/tags/bulk', {
      tags,
    });
    console.log('communitTags', data);

    const sanitizedData = this.sanitizeRows(rows);

    for (const sData of sanitizedData) {
      const { summaries, transactions, ...commData } = sData;
      // console.log('first', {
      //   summaries,
      //   commData,
      //   transactions,
      // });
    }

    process.exit(0);
  },

  sanitizeRows(rows) {
    return rows.map((row) => this.sanitizeRow(row));
  },

  sanitizeRow(row) {
    return {
      tags: row.tags,
      name: row?.name?.replace(/\r?\n/g, '').trim(),
      manager: row.manager || null,
      description: row?.description?.replace(/\r?\n/g, '').trim() || null,
      logo: row.logo || null,
      budget: row.budget || null,
      longitude: row.longitude || null,
      latitude: row.latitude || null,
      transactions: {
        description: row.tx_description,
        npr: row.tx_npr,
        usd: row.tx_usd,
      },
      summaries: {
        total_beneficiaries: row.total_beneficiaries,
        gender_male: row.gender_male || null,
        gender_female: row.gender_female || null,
        gender_other: row.gender_other || null,
        bank_yes: row.bank_yes || null,
        bank_no: row.bank_no || null,
        phone_yes: row.phone_yes || null,
        phone_no: row.phone_no || null,
        internet_yes: row.internet_yes || null,
        internet_no: row.internet_no || null,
      },
      // Add other properties you want to include in the JSON output
    };
  },
};

lib.getKoboFormsData();
