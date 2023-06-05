import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { CreateManager } from './dto/manager.dto';
import { UpdateCommunityAssetDto } from './dto/update-community.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommunityDto: CreateCommunityDto) {
    const { tags, summary, categoryId, ...communityData } = createCommunityDto;

    return this.prisma.community.create({
      data: {
        ...communityData, // Explicit cast to the appropriate type
        tags,
        category: {
          connect: {
            id: categoryId,
          },
        },

        summary: {
          create: {
            ...summary,
          },
        },
      },
    });
  }

  findAll(query?: string) {
    let queryCondition = {};
    if (query) {
      queryCondition = {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      };
    }
    return this.prisma.community.findMany({
      where: {
        ...queryCondition,
      },
      select: {
        category: true,
        country: true,
        name: true,
        id: true,
        totalDonations_usd: true,
        latitude: true,
        longitude: true,
        description: true,
        address: true,
      },

      orderBy: {
        updatedAt: 'asc',
      },
    });
  }

  findOne(id: number) {
    if (!id) {
      throw new Error('Id not provided');
    }
    return this.prisma.community.findUnique({
      where: {
        id,
      },
      include: {
        summary: true,

        category: true,
      },
    });
  }

  update(id: number, updateCommunityDto: any) {
    return this.prisma.community.update({
      where: { id },
      data: updateCommunityDto,
    });
  }

  remove(id: number) {
    return this.prisma.community.delete({ where: { id } });
  }

  updateAsset(id: number, assetData: UpdateCommunityAssetDto) {
    const updateData: UpdateCommunityAssetDto = {};

    return this.prisma.community.update({
      where: { id },
      data: updateData,
    });
  }

  async search(searchKey: string) {
    return this.prisma.community.findMany({
      where: {
        name: {
          contains: searchKey,
          mode: 'insensitive',
        },
      },
    });
  }

  async createBulkTags(tags: string[]) {
    const tagsData: Prisma.TagsCreateManyInput[] = tags.map((tag) => {
      return { name: tag };
    });

    await this.prisma.category.createMany({
      data: tagsData,
      skipDuplicates: true,
    });

    return this.prisma.tags.createMany({
      data: tagsData,
      skipDuplicates: true,
    });
  }

  async getAllTags() {
    const tags = await this.prisma.tags.findMany({});
    return tags.map((tag) => ({
      ...tag,
      id: Number(tag.id), // Convert id to number
    }));
  }

  async createCommunityManager(manager: CreateManager) {
    const { communityId, ...data } = manager;

    return this.prisma.communityManager.create({
      data: {
        ...data,
      },
    });
  }
}
