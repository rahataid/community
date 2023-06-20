import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
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

  findAll(query: any) {
    const where: any = {};

    if (query.category) {
      where.categoryId = Number(query.category);
    }

    if (query.country) {
      where.country = query.country;
    }

    if (query.name) {
      where.name = {
        contains: query.name,
        mode: 'insensitive',
      };
    }

    return paginate(this.prisma.community, {
      where,

      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(address: string) {
    if (!address) {
      throw new Error('Address not provided');
    }
    return this.prisma.community.findUnique({
      where: {
        address,
      },
      include: {
        summary: true,
        category: true,
        _count: true,
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

  async updateAsset(id: number, assetData: UpdateCommunityAssetDto) {
    const updateData: UpdateCommunityAssetDto = {};

    const community = await this.prisma.community.findUnique({
      where: {
        id,
      },
    });

    if (!community) {
      throw new Error('Community not found');
    }

    const commImage = community.images as Prisma.JsonObject;

    if (assetData.logo) {
      updateData.logo = assetData.logo;
    }

    if (assetData.cover) {
      updateData.cover = assetData.cover;
    }

    if (assetData.gallery) {
      updateData.gallery = assetData.gallery;
    }

    return this.prisma.community.update({
      where: { id },
      data: {
        images: {
          ...commImage,
          ...updateData,
        },
      },
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
