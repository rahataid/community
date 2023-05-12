import { Injectable } from '@nestjs/common';
import { CreateCommunitiyBeneficaryDto } from './dto/create-communitiy-beneficary.dto';
import { UpdateCommunitiyBeneficaryDto } from './dto/update-communitiy-beneficary.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommunitiyBeneficariesService extends PrismaClient {
  create(createCommunitiyBeneficaryDto: CreateCommunitiyBeneficaryDto) {
    const { communityId, summaryType, summaryData } =
      createCommunitiyBeneficaryDto;
    const data = {
      community: {
        connect: { id: communityId },
      },
      summaryType,
      summaryData,
    };

    return this.communitiesBeneficary.create({
      data,
    });
  }

  findAll() {
    return this.communitiesBeneficary.findMany();
  }

  findOne(id: number) {
    return this.communitiesBeneficary.findUnique({ where: { id } });
  }

  update(
    id: number,
    updateCommunitiyBeneficaryDto: UpdateCommunitiyBeneficaryDto,
  ) {
    return this.communitiesBeneficary.update({
      where: { id },
      data: updateCommunitiyBeneficaryDto,
    });
  }

  remove(id: number) {
    return this.communitiesBeneficary.delete({ where: { id } });
  }
}
