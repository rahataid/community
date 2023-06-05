import { Gender, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Create beneficiaries
  const beneficiary1 = await prisma.beneficiary.create({
    data: {
      gender: Gender.M,
      walletAddress: '0x1234567890',
      age: 25,
    },
  });

  const beneficiary2 = await prisma.beneficiary.create({
    data: {
      gender: Gender.F,
      walletAddress: '0x0987654321',
      age: 30,
    },
  });

  console.log('Beneficiaries created:', beneficiary1, beneficiary2);

  // Create donors
  const donor1 = await prisma.donor.create({
    data: {
      walletAddress: '0X537GNJUDfdhyT6IHG8gHY576DDFDD57KKxwet57',
    },
  });

  const donor2 = await prisma.donor.create({
    data: {
      walletAddress: '0X537GNJUDfdhyr78gHY576DDFDD57567',
    },
  });

  console.log('Donors created:', donor1, donor2);

  // Create categories
  const category1 = await prisma.category.create({
    data: {
      name: 'category 1',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'category 2',
    },
  });

  console.log('Categories created:', category1, category2);

  // Create tags
  const tag1 = await prisma.tags.create({
    data: {
      name: 'Tag 1',
    },
  });

  const tag2 = await prisma.tags.create({
    data: {
      name: 'Tag 2',
    },
  });

  console.log('Tags created:', tag1, tag2);

  // Create communities
  const community1 = await prisma.community.create({
    data: {
      name: 'Community 1',
      description: 'Description of Community 1',
      longitude: '27.1700',
      latitude: '86.9833',
      logo: '',
      cover: '',
      country: 'Nepal',
      walletAddress: '0x00y',
      categoryId: category2.id,
      totalDonations_usd: '1500',
    },
  });

  const community2 = await prisma.community.create({
    data: {
      name: 'Community 2',
      description: 'Description of Community 2',
      longitude: '0.0000',
      latitude: '0.0000',
      logo: '',
      cover: '',
      country: 'Nepal',
      walletAddress: '0x00',
      categoryId: category1.id,
      totalDonations_usd: '1500',
    },
  });

  console.log('Communities created:', community1, community2);

  const manager = await prisma.communityManager.create({
    data: {
      email: 'email@gmail.com',
      name: 'Community Manager',
      walletAddress: '0x00',
    },
  });

  await prisma.communityonCommunityManager.create({
    data: {
      communityId: community1.id,
      managerId: manager.id,
    },
  });

  // Create demographics
  const demographics1 = await prisma.demographics.create({
    data: {
      communityId: community1.id,
      total_beneficiaries: '100',
      gender_male: '50',
      gender_female: '40',
      gender_other: '10',
      bank_yes: '80',
      bank_no: '20',
      internet_yes: '90',
      internet_no: '10',
      extra: {
        key: 'value',
      },
    },
  });

  const demographics2 = await prisma.demographics.create({
    data: {
      communityId: community2.id,
      total_beneficiaries: '200',
      gender_male: '100',
      gender_female: '80',
      gender_other: '20',
      bank_yes: '160',
      bank_no: '40',
      internet_yes: '180',
      internet_no: '20',
      extra: {
        key: 'value',
      },
    },
  });

  console.log('Demographics created:', demographics1, demographics2);

  // Create transactions
  const transaction1 = await prisma.transactions.create({
    data: {
      timestamp: new Date(),
      donorId: donor1.id,
      doneeId: community1.id,
      txnHash: 'transaction-hash-1',
      amount: 100,
    },
  });

  const transaction2 = await prisma.transactions.create({
    data: {
      timestamp: new Date(),
      donorId: donor2.id,
      doneeId: community2.id,
      txnHash: 'transaction-hash-2',
      amount: 200,
    },
  });

  console.log('Transactions created:', transaction1, transaction2);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
