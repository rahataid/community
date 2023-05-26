import { DonorType, Gender, PrismaClient, TxnsStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
      name: 'Organization 1',
      email: 'org1@example.com',
      donorType: DonorType.organization,
      phoneNumber: '1234567890',
    },
  });

  const donor2 = await prisma.donor.create({
    data: {
      name: 'Individual 1',
      email: 'individual1@example.com',
      donorType: DonorType.individual,
      phoneNumber: '9876543210',
    },
  });

  console.log('Donors created:', donor1, donor2);

  // Create communities
  const community1 = await prisma.community.create({
    data: {
      title: 'Rahat Jaleshwor',
      description: 'Rahat Jaleshwor is a community in Nepal',
      location: 'Jaleshwor, Nepal',
      establishedDate: '165668986656',
    },
  });

  const community2 = await prisma.community.create({
    data: {
      title: 'Community 2',
      description: 'Description of Community 2',
      location: 'Location of Community 2',
      establishedDate: '165668986657',
    },
  });

  console.log('Communities created:', community1, community2);

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Project 1',
      description: 'Description of Project 1',
      manager: 'Project Manager 1',
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Project 2',
      description: 'Description of Project 2',
      manager: 'Project Manager 2',
    },
  });

  console.log('Projects created:', project1, project2);

  // Create community projects
  const communityProject1 = await prisma.communityProject.create({
    data: {
      communities: { connect: { id: community1.id } },
      projects: { connect: { id: project1.id } },
    },
  });

  const communityProject2 = await prisma.communityProject.create({
    data: {
      communities: { connect: { id: community2.id } },
      projects: { connect: { id: project2.id } },
    },
  });

  console.log(
    'Community projects created:',
    communityProject1,
    communityProject2,
  );

  // Create donation transactions
  const donation1 = await prisma.donationTransaction.create({
    data: {
      status: TxnsStatus.SUCCESS,
      txnDate: new Date(),
      donor: { connect: { id: donor1.id } },
      donee: { connect: { id: community1.id } },
      txnHash: 'transaction-hash-1',
      amount: 100,
    },
  });

  const donation2 = await prisma.donationTransaction.create({
    data: {
      status: TxnsStatus.PENDING,
      txnDate: new Date(),
      donor: { connect: { id: donor2.id } },
      donee: { connect: { id: community2.id } },
      txnHash: 'transaction-hash-2',
      amount: 200,
    },
  });

  console.log('Donation transactions created:', donation1, donation2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
