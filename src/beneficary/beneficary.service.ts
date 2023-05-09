import { Injectable } from '@nestjs/common';
import { CreateBeneficaryDto } from './dto/create-beneficary.dto';
import { UpdateBeneficaryDto } from './dto/update-beneficary.dto';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class BeneficaryService extends PrismaClient {
  create(createBeneficaryDto: CreateBeneficaryDto) {
    return this.beneficary.create({ data: createBeneficaryDto });
  }

  findAll() {
    return this.beneficary.findMany();
  }

  findOne(id: number) {
    return this.beneficary.findFirst({ where: { id } });
  }

  update(id: number, updateBeneficaryDto: UpdateBeneficaryDto) {
    return this.beneficary.update({ where: { id }, data: updateBeneficaryDto });
  }

  remove(id: number) {
    return this.beneficary.delete({ where: { id } });
  }
}
