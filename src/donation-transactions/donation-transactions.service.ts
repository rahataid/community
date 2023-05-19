import { Injectable } from '@nestjs/common';
import { CreateDonationTransactionDto } from './dto/create-donation-transaction.dto';
import { UpdateDonationTransactionDto } from './dto/update-donation-transaction.dto';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class DonationTransactionsService extends PrismaClient {
  create(createDonationTransactionDto: CreateDonationTransactionDto) {
    return;
    // this.donationTxns.create({ data: createDonationTransactionDto });
  }

  findAll() {
    return this.donationTxns.findMany();
  }

  findOne(id: number) {
    return this.donationTxns.findFirst({ where: { id } });
  }

  update(
    id: number,
    updateDonationTransactionDto: UpdateDonationTransactionDto,
  ) {
    return this.donationTxns.update({
      where: { id },
      data: updateDonationTransactionDto,
    });
  }

  remove(id: number) {
    return;
  }
}
