import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const rahatCommunity = await prisma.communities.upsert({
    where: { title: 'Rahat' },
    update: {},
    create: {
      title: 'Rahat',
      description: 'Relif  distribution Organization',
      location: 'Nepal',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
