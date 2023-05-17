import { Injectable } from '@nestjs/common';
import { CreateCommunityBeneficiaryDto } from './dto/create-community-beneficiary.dto';
import { UpdateCommunityBeneficiaryDto } from './dto/update-community-beneficiary.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommunityBeneficiariesService extends PrismaClient {
  create(createCommunitiyBeneficiaryDto: CreateCommunityBeneficiaryDto) {
    const { communityId, summaryType, summaryData } =
      createCommunitiyBeneficiaryDto;
    const data = {
      community: {
        connect: { id: communityId },
      },
      summaryType,
      summaryData,
    };

    return this.communitiesBeneficiary.create({
      data,
    });
  }

  findAll(id: number) {
    return this.communitiesBeneficiary.findMany({ where: { communityId: id } });
  }

  findOne(id: number) {
    return this.communitiesBeneficiary.findUnique({ where: { id } });
  }

  update(
    id: number,
    updateCommunitiyBeneficiaryDto: UpdateCommunityBeneficiaryDto,
  ) {
    return this.communitiesBeneficiary.update({
      where: { id },
      data: updateCommunitiyBeneficiaryDto,
    });
  }

  remove(id: number) {
    return this.communitiesBeneficiary.delete({ where: { id } });
  }
}
