import { Injectable } from '@nestjs/common';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DonorService extends PrismaClient {
  create(createDonorDto: CreateDonorDto) {
    return this.donor.create({ data: createDonorDto });
  }

  findAll() {
    return this.donor.findMany();
  }

  findOne(id: number) {
    return this.donor.findFirst({ where: { id } });
  }

  update(id: number, updateDonorDto: UpdateDonorDto) {
    return this.donor.update({
      where: { id },
      data: updateDonorDto,
    });
  }

  remove(id: number) {
    return this.donor.delete({ where: { id } });
  }
}
