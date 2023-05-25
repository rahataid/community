import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommunityDto: CreateCommunityDto) {
    return this.prisma.community.create({ data: createCommunityDto });
  }

  findAll() {
    return this.prisma.community.findMany();
  }

  findOne(id: number) {
    return this.prisma.community.findFirst({ where: { id } });
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return this.prisma.community.update({
      where: { id },
      data: updateCommunityDto,
    });
  }

  remove(id: number) {
    return this.prisma.community.delete({ where: { id } });
  }

  findDonationsById(id: number) {
    return this.prisma.donationTransaction.findMany({ where: { doneeId: id } });
  }

  findProjectsById(id: number) {
    return this.prisma.community.findMany({
      where: { id },
      include: { projects: true },
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
