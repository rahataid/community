import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const org1 = await prisma.communities.create({
    data: {
      title: 'Rahat Jaleshwor',
      description: 'Rahat Jaleshwor is a community in Nepal',
      location: 'Jaleshwor, Nepal',
      establishedDate: '165668986656',
    },
  });

  console.log('Community created:', org1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
