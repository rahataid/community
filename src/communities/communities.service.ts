import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityTransactionDto } from './dto/community-transaction.dto';
import { CreateCommunityDto } from './dto/create-community.dto';
import { ProjectAddDto } from './dto/project-add.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommunityDto: CreateCommunityDto) {
    return this.prisma.communities.create({ data: createCommunityDto });
  }

  findAll() {
    return this.prisma.communities.findMany();
  }

  findOne(id: number) {
    return this.prisma.communities.findFirst({
      where: { id },
    });
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return this.prisma.communities.update({
      where: { id },
      data: updateCommunityDto,
    });
  }

  remove(id: number) {
    return this.prisma.communities.delete({ where: { id } });
  }

  findDonationsById(id: number) {
    return this.prisma.donationTxns.findMany({ where: { doneeId: id } });
  }

  findProjectsById(id: number) {
    return this.prisma.project.findMany({
      where: {
        communities: {
          some: {
            communityId: id,
          },
        },
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
}
