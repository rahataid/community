import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Create categories
  const category1 = await prisma.category.createMany({
    data: [
      {
        name: 'Charitable Organization',
        id: 1,
      },
      {
        name: 'Chepang Community',
        id: 2,
      },
      {
        name: 'Daily Wage Earners',
        id: 3,
      },
      {
        name: 'Physically Challenged',
        id: 4,
      },
      {
        name: 'Senior Citizens',
        id: 5,
      },
      {
        name: 'Squattered Families',
        id: 6,
      },
      {
        name: 'Underprivileged Community',
        id: 7,
      },
    ],
  });

  console.log('Categories created:', category1);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
