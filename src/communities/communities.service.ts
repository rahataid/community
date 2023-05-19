import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommunitiesService extends PrismaClient {
  create(createCommunityDto: CreateCommunityDto) {
    return this.communities.create({ data: createCommunityDto });
  }

  findAll() {
    return this.communities.findMany();
  }

  findOne(id: number) {
    return this.communities.findFirst({
      where: { id },
      include: {
        donation: true,
      },
    });
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return this.communities.update({ where: { id }, data: updateCommunityDto });
  }

  remove(id: number) {
    return this.communities.delete({ where: { id } });
  }

  findDonationsById(id: number) {
    return this.donationTxns.findMany({ where: { doneeId: id } });
  }
}
