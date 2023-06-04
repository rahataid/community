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

    console.log('Extracting Tags');

    const tags = Array.from(
      new Set(
        rows
          .map((el) => {
            const trimmedType = el.tags;
            if (trimmedType && trimmedType !== '') {
              return trimmedType.split(',').map((value) => value.trim());
            }
            return [];
          })
          .flat()
          .filter((tag) => tag !== undefined || tag !== '' || tag !== null),
      ),
    );

    console.log('Posting Tags');
    const { data } = await communityHost.post('/communities/tags/bulk', {
      tags,
    });
    console.log('data', data);
    const { data: allTags } = await communityHost.get('/communities/tags');
    console.log('allTags', allTags);

    console.log('Sanitizing Data');
    const sanitizedData = this.sanitizeRows(rows);

    for (const dataIndex in sanitizedData) {
      console.log('Posting Data', dataIndex);
      const rowData = rows[dataIndex];

      const {
        summaries,
        transactions,
        tags: tagsString,
        walletAddress_real,
        walletAddress_generated,
        pilot,
        ...commData
      } = sanitizedData[dataIndex];

      if (!rowData.walletAddress_generated || !rowData.walletAddress_real) {
        console.log('Generating Wallet for', pilot, commData?.name);
        const generatedWallet = await generateWallet(pilot);

        rowData.walletAddress_real = walletAddress_real || null;
        rowData.walletAddress_generated =
          walletAddress_generated || generatedWallet?.address;

        commData.walletAddress =
          rowData?.walletAddress_real || rowData?.walletAddress_generated;

        await rowData.save();
      } else {
        commData.walletAddress = walletAddress_real || walletAddress_generated;
      }

      const tags = tagsString.split(',').map((tagString) => {
        const foundTag = allTags.find((tag) => tag.name === tagString.trim());
        return foundTag ? foundTag.id : null;
      });

      console.log('commData', commData, tags);
      const { data } = await communityHost.post('/communities', {
        ...commData,
        summary: summaries,
        categoryId: tags[0],
        tags,
      });
      console.log('data', data);

      console.log('Saved', dataIndex + 1 + ' of ' + sanitizedData.length);
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
      walletAddress_real: row?.walletAddress_real || null,
      walletAddress_generated: row?.walletAddress_generated || null,
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
