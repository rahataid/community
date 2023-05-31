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

    // const { data } = await communityHost.post('/communities/tags/bulk', {
    //   tags,
    // });
    // const allTags = await communityHost.get('/communities/tags');
    // console.log('allTags', allTags);

    const sanitizedData = this.sanitizeRows(rows);

    for (const sData of sanitizedData) {
      const { summaries, transactions, tags: tagsString, ...commData } = sData;
      // const tags = tagsString.split(',').map((tagString) => {
      //   const foundTag = allTags.find((tag) => tag.name === tagString.trim());
      //   return foundTag ? foundTag.id : null;
      // });

      const { data } = await communityHost.post('/communities', {
        ...commData,
        tags: [1, 2],
        summary: summaries,
        // tags: tags.map((t) => t.id),
      });
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
      manager: row.manager || '',
      description: row?.description?.replace(/\r?\n/g, '').trim() || '',
      logo: row.logo || '',
      budget: String(row.budget) || '',
      longitude: String(row.longitude) || '',
      latitude: row.latitude || '',
      transactions: {
        description: row.tx_description,
        npr: row.tx_npr,
        usd: row.tx_usd,
      },
      summaries: {
        total_beneficiaries: row.total_beneficiaries,
        gender_male: row.gender_male || '',
        gender_female: row.gender_female || '',
        gender_other: row.gender_other || '',
        bank_yes: row.bank_yes || '',
        bank_no: row.bank_no || '',
        // phone_yes: row.phone_yes || null,
        // phone_no: row.phone_no || null,
        internet_yes: row.internet_yes || '',
        internet_no: row.internet_no || '',
        extra: {},
      },
      // Add other properties you want to include in the JSON output
    };
  },
};

lib.getKoboFormsData();
