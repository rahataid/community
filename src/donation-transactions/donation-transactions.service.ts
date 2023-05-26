import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateDonationTransactionDto } from './dto/create-donation-transaction.dto';
import { UpdateDonationTransactionDto } from './dto/update-donation-transaction.dto';
@Injectable()
export class DonationTransactionsService extends PrismaClient {
  create(createDonationTransactionDto: CreateDonationTransactionDto) {
    return;
    // this.donationTransaction.create({ data: createDonationTransactionDto });
  }

  findAll() {
    return this.donationTransaction.findMany();
  }

  findOne(id: number) {
    return this.donationTransaction.findFirst({ where: { id } });
  }

  update(
    id: number,
    updateDonationTransactionDto: UpdateDonationTransactionDto,
  ) {
    return this.donationTransaction.update({
      where: { id },
      data: updateDonationTransactionDto,
    });
  }

  remove(id: number) {
    return;
  }
}
