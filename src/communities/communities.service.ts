import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { PrismaClient } from '@prisma/client';
import { ProjectAddDto } from './dto/project-add.dto';

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

  findProjectsById(id: number) {
    return this.communityProject.findMany({
      where: { communityId: id },
    });
  }

  addProject(communityId: number, projectAddDto: ProjectAddDto) {
    return this.communityProject.create({
      data: { communityId, ...projectAddDto },
    });
  }
}
