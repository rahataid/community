import { Injectable } from '@nestjs/common';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BeneficiaryService extends PrismaClient {
  create(createBeneficiaryDto: CreateBeneficiaryDto) {
    return this.beneficiary.create({ data: createBeneficiaryDto });
  }

  findAll() {
    return this.beneficiary.findMany();
  }

  findOne(id: number) {
    return this.beneficiary.findFirst({ where: { id } });
  }

  update(id: number, updateBeneficiaryDto: UpdateBeneficiaryDto) {
    return this.beneficiary.update({
      where: { id },
      data: updateBeneficiaryDto,
    });
  }

  remove(id: number) {
    return this.beneficiary.delete({ where: { id } });
  }
}
