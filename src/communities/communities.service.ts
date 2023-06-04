import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityAssetDto } from './dto/update-community.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommunityDto: CreateCommunityDto) {
    const { tags, summary, categoryId, ...communityData } = createCommunityDto;

    const communitytags = tags?.map((tagId) => ({
      id: tagId,
    }));

    return this.prisma.community.create({
      data: {
        ...communityData, // Explicit cast to the appropriate type
        tags: {
          connect: communitytags,
        },
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

  findAll() {
    return this.prisma.community.findMany({
      select: {
        category: true,
        country: true,
        logo: true,
        name: true,
        id: true,
        photos: true,
        cover: true,
        totalDonations_usd: true,
        walletAddress: true,
        latitude: true,
        longitude: true,
        description: true,
      },
      orderBy: {
        updatedAt: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.community.findUnique({
      where: {
        id,
      },
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

    if (assetData.cover) {
      updateData.cover = assetData.cover;
    }
    if (assetData.logo) {
      updateData.logo = assetData.logo;
    }

    if (assetData.photos) {
      updateData.photos = assetData.photos;
    }

    return this.prisma.community.update({
      where: { id },
      data: updateData,
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

  getAllTags() {
    return this.prisma.tags.findMany({});
  }
}
