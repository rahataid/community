import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityTransactionDto } from './dto/community-transaction.dto';
import { CreateCommunityDto } from './dto/create-community.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommunityDto: CreateCommunityDto) {
    const { tags, summary, ...communityData } = createCommunityDto;

    const communitytags = tags?.map((tagId) => ({
      id: tagId,
    }));

    return this.prisma.community.create({
      data: {
        ...communityData, // Explicit cast to the appropriate type
        tags: {
          connect: communitytags,
        },
        summary: {
          create: {
            ...summary,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.community.findMany();
  }

  findOne(id: number) {
    return this.prisma.community.findUnique({
      where: { id },
      include: {
        summary: true,
        tags: {
          select: {
            name: true,
          },
        },
        category: true,
      },
    });
  }

  update(id: number, updateCommunityDto: any) {
    //   return this.prisma.community.update({
    //     where: { id },
    //     data: updateCommunityDto,
    //   });
    return;
  }

  remove(id: number) {
    return this.prisma.community.delete({ where: { id } });
  }

  findDonationsById(id: number) {
    return this.prisma.transactions.findMany({ where: { doneeId: id } });
  }

  findCommunityProjects(id: number) {}

  addTransactions(
    doneeId: number,
    createCommunityTransactionDto: CreateCommunityTransactionDto,
  ) {}

  getTransactions(doneeId: number) {
    return this.prisma.transactions.findMany({
      where: { doneeId },
    });
  }

  createBulkTags(tags: string[]) {
    const tagsData: Prisma.TagsCreateManyInput[] = tags.map((tag) => {
      return { name: tag };
    });

    return this.prisma.tags.createMany({
      data: tagsData,
      skipDuplicates: true,
    });
  }

  listTags() {
    return this.prisma.tags.findMany({
      select: {
        name: true,
      },
    });
  }
}
