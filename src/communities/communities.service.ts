import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityTransactionDto } from './dto/community-transaction.dto';
import { CreateCommunityDto } from './dto/create-community.dto';
import { ProjectAddDto } from './dto/project-add.dto';

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
        projects: true,
        summary: true,
        tags: {
          select: {
            name: true,
          },
        },
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
    return this.prisma.donationTransaction.findMany({ where: { doneeId: id } });
  }

  findCommunityProjects(id: number) {
    return this.prisma.communityProject.findMany({
      where: {
        communityId: id,
      },
      include: {
        projects: true,
      },
    });
  }

  addProject(communityId: number, projectAddDto: ProjectAddDto) {
    return this.prisma.communityProject.create({
      data: { communityId, ...projectAddDto },
    });
  }

  addTransactions(
    communityId: number,
    createCommunityTransactionDto: CreateCommunityTransactionDto,
  ) {
    return this.prisma.communityTransasction.create({
      data: { communityId, ...createCommunityTransactionDto },
    });
  }

  getTransactions(communityId: number) {
    return this.prisma.communityTransasction.findMany({
      where: { communityId },
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
