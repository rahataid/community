const SHEET_NAME = 'Communities';
const SHEET_ID = '12dYbZgtxFXGPzWQFPG9Qe7NJpKUoMdbZh7O1dIO5NQM';

const { GoogleSpreadsheet } = require('google-spreadsheet');
const googleCreds = require('../config/google.json');
const axios = require('axios');
const generateWallet = require('./generateWallet');

const communityHost = axios.create({
  // baseURL: 'https://community-api-stage.rahat.io',
  baseURL: 'http://localhost:5300',
});

function formatGoogleDriveURL(url) {
  if (!url || url === 'NA' || url === 'N/A') {
    return '';
  }
  const fileId = url.match(/\/d\/(.+?)\//)[1];
  const formattedURL = `https://drive.google.com/uc?export=view&id=${fileId}`;
  return formattedURL;
}

const lib = {
  async getKoboFormsData() {
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth(googleCreds);
    console.log('Loading Data');
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[SHEET_NAME];
    let rows = await sheet.getRows();

    console.log('Sanitizing Data');
    const sanitizedData = this.sanitizeRows(rows);

    for (const dataIndex in sanitizedData) {
      console.log('Posting Data', dataIndex);
      const rowData = rows[dataIndex];

      const { summaries, pilot, manager, ...commData } =
        sanitizedData[dataIndex];

      console.log('commData', commData);
      const { data: communityData } = await communityHost.post('/communities', {
        ...commData,
        summary: summaries,
      });
      console.log('data', communityData);

      const { data } = await communityHost.post('/communities/manager', {
        communities: [commData.address],
        name: manager,
      });
      console.log('reacted manager', data);

      console.log('Saved', dataIndex + 1 + ' of ' + sanitizedData.length);
    }

    process.exit(0);
  },

  sanitizeRows(rows) {
    return rows.map((row) => this.sanitizeRow(row));
  },

  sanitizeRow(row) {
    return {
      name: row?.name?.replace(/\r?\n/g, '').trim(),
      category: row?.category || 7,
      manager: row.manager || '',
      description: row?.description?.replace(/\r?\n/g, '').trim() || '',
      logo: row.logo ? formatGoogleDriveURL(row.logo) : '',
      totalDonations_usd: String(row.tx_usd) || '',
      longitude: String(row.longitude) || '',
      latitude: row.latitude || '',
      cover: row.cover ? formatGoogleDriveURL(row.cover) : '',
      country: row?.country || 'Nepal',
      pilot:
        row?.tx_description
          ?.toLowerCase()
          .replace(' ', '_')
          .replace('.0', '') || '',
      address: row?.address || null,
      photos: [],

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
