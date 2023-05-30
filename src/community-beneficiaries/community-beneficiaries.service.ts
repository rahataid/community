import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityBeneficiaryDto } from './dto/create-community-beneficiary.dto';
import { UpdateCommunityBeneficiaryDto } from './dto/update-community-beneficiary.dto';

// TODO: fix this
@Injectable()
export class CommunityBeneficiariesService {
  constructor(private readonly prisma: PrismaService) {}

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

    // return this.prisma.beneficiary.create({
    //   // data,
    // });
  }

  findAll(id: number) {
    return this.prisma.beneficiary.findMany({
      where: {
        // communityId: id,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.beneficiary.findUnique({ where: { id } });
  }

  update(
    id: number,
    updateCommunitiyBeneficiaryDto: UpdateCommunityBeneficiaryDto,
  ) {
    return this.prisma.beneficiary.update({
      where: { id },
      data: updateCommunitiyBeneficiaryDto,
    });
  }

  remove(id: number) {
    return this.prisma.beneficiary.delete({ where: { id } });
  }

  createCommunityTypes(data) {}
}
